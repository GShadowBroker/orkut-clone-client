import React, { useEffect, useState } from 'react'
import './styles/App.css'
import { Wrapper, Container } from './styles/layout'

import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Profile from './components/Profile'
import Scraps from './components/Scraps'
import Communities from './components/Communities'
import Breadcrumbs from './components/Breadcrumbs'

import { useQuery } from '@apollo/client'
import { FIND_USER } from './services/queries'

const App = () => {
    const routes = [
        { path: "/", name: "Home", showBreadcrumbs: false, Component: Home },
        { path: "/perfil/:userId", name: "Perfil", showBreadcrumbs: false, Component: Profile },
        { path: "/perfil/:userId/scraps", name: "Scraps", showBreadcrumbs: true, Component: Scraps },
        { path: "/comunidades", name: "Comunidades", showBreadcrumbs: true, Component: Communities }
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
                                crumbs.map(({ name, path }) => console.log({ name, path }));

                                return (
                                    <div>
                                        { showBreadcrumbs ? <Breadcrumbs crumbs={ crumbs } /> : null }
                                        <Component {...props} user={ data.findUser } />
                                    </div>
                                )
                            }} />
                        ))
                    }
                </Switch>
            </Container>
            <Footer />
        </Wrapper>
    );
}

export default App;
