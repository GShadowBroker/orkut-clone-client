import React, { useState, useEffect } from 'react'
import './styles/App.css'
import { Wrapper, Container } from './styles/layout'

import { Switch, Route } from 'react-router-dom'

import Login from './components/auth/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Scraps from './pages/Scraps'
import Photos from './pages/Photos'
import Photo from './components/Photo'
import Communities from './pages/Communities'
import Error404 from './pages/404Error'
import Notification from './components/utils/Notification'

import { useApolloClient, useLazyQuery } from '@apollo/client'
import { FIND_USER } from './services/queries'

import ResponsiveLayout from './components/ResponsiveLayout'

const App = () => {
    const [ token, setToken ] = useState(null)
    const [ findUser, { error, loading, data } ] = useLazyQuery(FIND_USER)

    const client = useApolloClient()
    const logout = () => {
        setToken(null)
        window.localStorage.removeItem('token')
        client.resetStore()
    }

    useEffect(() => {
        if (token) {
            findUser({
                variables: {
                    userId: token.id
                }
            })
        } else {
            const savedToken = JSON.parse(window.localStorage.getItem('token'))
            if (savedToken) {
                setToken(savedToken)
            }
        }
    }, [token, findUser])

    if (!(token && data)) return (
        <Login setToken={ setToken } findUser={ findUser } />
    )

    if (error) return (
        <Container>
            <Notification />
        </Container>
    )

    if (loading) return (
        <div style={{ textAlign: 'center' }}>Loading...</div>
    )

    const routes = [
        { path: "/", name: "Home", Component: Home },
        { path: "/perfil/:userId", name: "Perfil", Component: Profile },
        { path: "/perfil/:userId/scraps", name: "Scraps", Component: Scraps },
        { path: "/perfil/:userId/fotos", name: "Fotos", Component: Photos },
        { path: "/perfil/:userId/fotos/:photoId", name: "Foto", Component: Photo },
        { path: "/comunidades", name: "Comunidades", Component: Communities },
    ]
  
    return (
        <Wrapper>
            <Navbar loggedUser={ data.findUser } logout={ logout } />
            <Container main>
                <Switch>
                    {
                        routes.map(({ path, Component }, key) => (
                            <Route exact path={ path } key={ key } component={props => {
                                const crumbs = routes
                                    .filter(({ path }) => props.match.path.includes(path))
                                    .map(({ path, ...rest }) => ({
                                        path: Object.keys(props.match.params).length
                                            ? Object.keys(props.match.params).reduce(
                                                (path, param) => path.replace(
                                                    `:${param}`, props.match.params[param]
                                                ), path)
                                            : path,
                                        ...rest
                                    }));

                                return (
                                    <ResponsiveLayout
                                        breakpoint={ 676 }
                                        renderDesktop={ () => (
                                            <Component {...props} loggedUser={ data.findUser } crumbs={ crumbs } />
                                        ) }
                                        renderMobile={ () => (
                                            <h1>Mobile view!</h1>
                                        ) }
                                    />
                                )
                            }} />
                        ))
                    }
                    <Route path="*">
                        <Error404 />
                    </Route>
                </Switch>
            </Container>
            <Footer />
        </Wrapper>
    );
}

export default App;
