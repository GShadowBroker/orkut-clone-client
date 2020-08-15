import React from 'react'
import LoginForm from './LoginForm'

import { Wrapper, Container } from '../../styles/layout'
import { Logo } from '../../styles/nav'
import { 
    LoginMain, 
    LoginContainer, 
    LoginHeroMobile, 
    LoginTitle, 
    LoginSubtitles, 
    LoginFooter, 
    Stressed, 
    FakeLinkLogin 
} from '../../styles/auth'

import Notification from '../utils/Notification'

const LoginMobile = ({ setToken, findUser, accountCreated }) => {
    return (
        <Wrapper>
            <Container>
                <div style={{marginTop: '.6rem'}}>
                    { accountCreated
                        && <Notification 
                            title="Sucesso!" 
                            message="Sua conta foi criada com sucesso." 
                            severity="low" 
                            margin="0 0 .6rem 0"
                        />}
                    <div>
                        <LoginHeroMobile>
                            <div style={{fontSize: '2em'}}>
                                <Logo>orkut</Logo>
                            </div>
                            <div>
                                <p><Stressed>Conecte-se</Stressed> com amigos e familiares usando scraps e mensagens instantâneas</p>
                                <p><Stressed>Conheça</Stressed> pessoas novas através de amigos de amigos e comunidades</p>
                                <p><Stressed>Compartilhe</Stressed> seus vídeos, fotos e paixões em um só lugar</p>
                            </div>
                        </LoginHeroMobile>
                        <LoginForm setToken={ setToken } findUser={ findUser } mobile={ true } />
                    </div>
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
                </div>
            </Container>
        </Wrapper>
    )
}

export default LoginMobile