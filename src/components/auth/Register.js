import React from 'react'
import { Wrapper, Container } from '../../styles/layout'
import {
    LoginFooter,
    FakeLinkLogin,
    RegisterContainer,
} from '../../styles/auth'
import { Logo } from '../../styles/nav'

import { Link } from 'react-router-dom'

import RegisterForm from './RegisterForm'

const Register = ({ setAccountCreated }) => {
    return (
        <Wrapper>
            <Container>
                    <Logo style={{ padding: '.5rem 0' }}>
                        <Link to="/login" style={{ color: '#E95B95' }}>
                            <strong>orkut</strong>
                        </Link>
                    </Logo>
                <RegisterContainer>
                    <h1>bem-vindo(a) ao orkut nostalgia!</h1>
                    <p>Só precisamos confirmar algumas coisas antes de você começar a usar o orkut:</p>
                    
                    <RegisterForm setAccountCreated={setAccountCreated} />

                </RegisterContainer>
                <LoginFooter>
                    <ul>
                        <li>&copy;{ new Date().getFullYear() } Orkut Nostalgia</li>
                        <li><FakeLinkLogin>Sobre o Orkut</FakeLinkLogin></li>
                        <li><FakeLinkLogin>Centro de Seguraça</FakeLinkLogin></li>
                        <li><FakeLinkLogin>Privacidade</FakeLinkLogin></li>
                        <li><FakeLinkLogin>Termos</FakeLinkLogin></li>
                        <li><FakeLinkLogin>Contato</FakeLinkLogin></li>
                    </ul>
                </LoginFooter>
            </Container>
        </Wrapper>
    )
}

export default Register