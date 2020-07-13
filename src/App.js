import React from 'react'
import './styles/App.css'
import { Wrapper, Container } from './styles/layout'

import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Scraps from './pages/Scraps'
import Communities from './pages/Communities'

import { useQuery } from '@apollo/client'
import { FIND_USER } from './services/queries'

const App = () => {
    const routes = [
        { path: "/", name: "Home", Component: Home },
        { path: "/perfil/:userId", name: "Perfil", Component: Profile },
        { path: "/perfil/:userId/scraps", name: "Scraps", Component: Scraps },
        { path: "/comunidades", name: "Comunidades", Component: Communities }
    ]

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId: "1" }
    })

    if (error) return (
        <div style={{ textAlign: 'center' }}>Error fetching user</div>
    )

    if (loading) return (
        <div style={{ textAlign: 'center' }}>Loading...</div>
    )
  
    return (
        <Wrapper>
            <Navbar user={ data.findUser } />
            <Container main>
                <Switch>
                    {
                        routes.map(({ path, Component, showBreadcrumbs }, key) => (
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
                                    <div>
                                        <Component {...props} user={ data.findUser } crumbs={ crumbs } />
                                    </div>
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
