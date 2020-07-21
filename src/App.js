import React, { useState, useEffect } from 'react'
import './styles/App.css'
import { Container } from './styles/layout'

import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'
import Login from './components/auth/Login'
import Notification from './components/utils/Notification'

import { useApolloClient, useLazyQuery } from '@apollo/client'
import { FIND_USER } from './services/queries'

import LoginLoading from './components/utils/LoginLoading'

const App = () => {
    const location = useLocation()
    const [ token, setToken ] = useState(null)
    const [ redirectRoute, setRedirectRoute ] = useState("/")
    const [ findUser, { error, loading, data } ] = useLazyQuery(FIND_USER, {
        pollInterval: 120000
    })

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

    useEffect(() => {
        if (location.pathname !== '/login') {
            setRedirectRoute(location.pathname)
        }
    }, [])

    if (loading) return <LoginLoading />

    if (error) return (
        <Container>
            <Notification />
        </Container>
    )

    return (
        <div>
            <Switch>
                <Route exact path="/login">
                    { !(token && data)
                        ? <Login setToken={ setToken } findUser={ findUser } loading={ loading } />
                        : <Redirect to={ redirectRoute } />
                    }
                </Route>
                <Route path="*">
                    { token && data
                        ? <PrivateRoutes data={ data } logout={ logout } />
                        : <Redirect to="/login" />
                    }
                </Route>
            </Switch>
        </div>
    )
}

export default App;
