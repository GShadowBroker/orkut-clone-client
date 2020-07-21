import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { 
    Form, 
    LoginInputGroup, 
    Input, Label, 
    Button,
    LoginInputNote,
    InputNote,
    Subtitle
} from '../../styles/layout'
import { 
    LoginFormContainer, 
    RegisterBoxContainer, 
    LoginRegisterContainer, 
    FakeLinkLogin
} from '../../styles/auth'

import { useMutation } from '@apollo/client'
import { LOGIN } from '../../services/queries'

const Login = ({ setToken }) => {
    const history = useHistory()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ remember, setRemember ] = useState(false)

    const [ login, { loading, data } ] = useMutation(LOGIN, {
        onError: (error) => {
            error.graphQLErrors.length
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        }
    })

    useEffect(() => {
        if (data) {
            const token = data.login
            window.localStorage.setItem('token', JSON.stringify(token))
            history.push('/')
            setToken(token)
        }
    }, [data]) // eslint-disable-line

    useEffect(() => {
        const credentials = JSON.parse(window.localStorage.getItem('autocomplete'))
        if (credentials) {
            setEmail(credentials.email)
            setPassword(credentials.password)
        }
    }, [])

    const handleLogin = e => {
        e.preventDefault()

        if (remember) {
            window.localStorage.setItem('autocomplete', JSON.stringify({
                email,
                password
            }))
        } else {
            window.localStorage.removeItem('autocomplete')
        }

        login({
            variables: {
                email,
                password
            }
        })
    }

    return (
        <LoginRegisterContainer>
            <LoginFormContainer>
                <Form onSubmit={ handleLogin }>
                    <Subtitle style={{ padding: '0 .5rem' }}>Entrar</Subtitle>
                    <LoginInputGroup>
                        <Label htmlFor="email">e-mail: </Label>
                        <Input 
                            id="email"
                            name="email" 
                            value={ email }
                            type="text"
                            onChange={ ({ target }) => setEmail(target.value) }    
                        />
                        <InputNote nopad>ex: pat@exemplo.com</InputNote>
                    </LoginInputGroup>
                    <LoginInputGroup style={{ paddingTop: '0' }}>
                        <Label htmlFor="password">senha: </Label>
                        <Input 
                            id="password"
                            name="password" 
                            value={ password }
                            type="password"
                            onChange={ ({ target }) => setPassword(target.value) }    
                        />
                    </LoginInputGroup>
                    <LoginInputGroup>
                        <Input 
                            id="rememberme" 
                            name="rememberme" 
                            type="checkbox" 
                            checked={ remember } 
                            onChange={ () => setRemember(!remember) } 
                        />
                        <Label htmlFor="rememberme">Me lembre neste computador.</Label>
                        <LoginInputNote>Não use em computadores públicos [?]</LoginInputNote>
                    </LoginInputGroup>
                    <LoginInputGroup>
                        <Button type="submit" disabled={ loading }>{ loading ? 'entrando...' : 'entrar'}</Button>
                    </LoginInputGroup>
                    <LoginInputNote style={{ textAlign: 'center', padding: '.8rem 0' }}>
                        <FakeLinkLogin>Não consegue acessar sua conta?</FakeLinkLogin>
                    </LoginInputNote>
                </Form>
            </LoginFormContainer>
            <RegisterBoxContainer>
                <span>Ainda não é membro?</span>
                <FakeLinkLogin><strong>ENTRAR JÁ!</strong></FakeLinkLogin>
            </RegisterBoxContainer>
        </LoginRegisterContainer>
    )
}

export default Login