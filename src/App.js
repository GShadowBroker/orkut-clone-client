import React, { useState, useEffect } from 'react'
import './styles/App.css'
import { Wrapper, Container } from './styles/layout'

import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Scraps from './pages/Scraps'
import Communities from './pages/Communities'

import { useApolloClient, useLazyQuery } from '@apollo/client'
import { FIND_USER } from './services/queries'

const App = () => {
    const [ token, setToken ] = useState(null)
    const [ findUser, { error, loading, data } ] = useLazyQuery(FIND_USER) // data needs to be cleaned up after logout
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

    if (!data || !data.findUser) return (
        <Wrapper>
            <Container>
                <h1>Login</h1>
                <Login setToken={ setToken } findUser={ findUser } />
            </Container>
            <Footer />
        </Wrapper>
    )

    if (error) return (
        <div style={{ textAlign: 'center' }}>Error fetching user</div>
    )

    if (loading) return (
        <div style={{ textAlign: 'center' }}>Loading...</div>
    )

    const routes = [
        { path: "/", name: "Home", Component: Home },
        { path: "/perfil/:userId", name: "Perfil", Component: Profile },
        { path: "/perfil/:userId/scraps", name: "Scraps", Component: Scraps },
        { path: "/comunidades", name: "Comunidades", Component: Communities }
    ]
  
    return (
        <Wrapper>
            <Navbar user={ data.findUser } logout={ logout } />
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
                                    <Component {...props} user={ data.findUser } crumbs={ crumbs } />
                                )
                            }} />
                        ))
                    }
                    <Route path="*">
                        <h1>404 - Página não encontrada!</h1>
                    </Route>
                </Switch>
            </Container>
            <Footer />
        </Wrapper>
    );
}

export default App;
