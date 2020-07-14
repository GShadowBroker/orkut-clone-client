import React, { useEffect } from 'react'
import { Form, InputGroup, Input, Label, ActionGroup, Button } from '../styles/layout'
import { useField } from '../hooks'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../services/queries'

const Login = ({ setToken }) => {
    const email = useField('email')
    const password = useField('password')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            error.graphQLErrors.length
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login
            window.localStorage.setItem('token', JSON.stringify(token))
            setToken(token)
        }
    }, [result.data]) // eslint-disable-line

    const handleLogin = e => {
        e.preventDefault()
        console.table({
            email: email.value,
            password: password.value
        })
        login({
            variables: {
                email: email.value,
                password: password.value
            }
        })
    }

    return (
        <div>
            <Form onSubmit={ handleLogin }>
                <InputGroup>
                    <Label>e-mail</Label>
                    <Input { ...email.form } />
                </InputGroup>
                <InputGroup>
                    <Label>senha</Label>
                    <Input { ...password.form } />
                </InputGroup>
                <ActionGroup>
                    <Button type="submit">entrar</Button>
                </ActionGroup>
            </Form>
        </div>
    )
}

export default Login