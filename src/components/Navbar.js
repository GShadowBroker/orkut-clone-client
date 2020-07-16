import React from 'react'
import { Container, Button, Input } from '../styles/layout'
import { Nav, MobileNav, UpperNav, MainNav, Logo, NavMenu, NavInputContainer } from '../styles/nav'
import { Link, useLocation } from 'react-router-dom'
import { TiArrowSortedDown, TiThMenu } from 'react-icons/ti'

const Navbar = ({ loggedUser, logout }) => {
    return (
        <Nav>
            <MobileNavbar />
            <UpperNavbar logout={ logout } loggedUser={ loggedUser } />
            <MainNavbar loggedUser={ loggedUser } />
        </Nav>
    )
}

const UpperNavbar = ({ loggedUser, logout }) => {

    return (
        <UpperNav>
            <Container nav>
                <ul>
                    <li>+Você</li>
                    <li>Pesquisa</li>
                    <li>Maps</li>
                    <li>Play</li>
                    <li>YouTube</li>
                    <li>Notícias</li>
                    <li>Gmail</li>
                    <li>Drive</li>
                    <li>Mais <TiArrowSortedDown className="icenter" /></li>
                </ul>
                <ul>
                    <li className="email-menu">{ loggedUser.email }</li>
                    <li className="left-menu">configurações</li>
                    <li className="left-menu" onClick={ () => logout() } >sair</li>
                </ul>
            </Container>
        </UpperNav>
    )
}

const MainNavbar = ({ loggedUser }) => {
    const location = useLocation()
    return (
        <MainNav>
            <Container nav>
                <Logo>
                    <h1>orkut</h1>
                </Logo>
                <NavMenu>
                    <Link to="/" className={ location.pathname === '/' ? 'active' : '' }>Home</Link>
                    <Link to={ `/perfil/${loggedUser.id}` } className={ location.pathname === `/perfil/${loggedUser.id}` ? 'active' : '' }>Perfil</Link>
                    <Link to={ `/perfil/${loggedUser.id}/scraps` } className={ location.pathname === `/perfil/${loggedUser.id}/scraps` ? 'active' : '' }>Scraps</Link>
                    <Link to="/comunidades" className={ location.pathname === '/comunidades' ? 'active' : '' }>Comunidades</Link>
                    <Link to="/">Aplicativos <TiArrowSortedDown className="icenter" /></Link>
                    <Link to="/">Temas <TiArrowSortedDown className="icenter" /></Link>
                </NavMenu>
                <NavInputContainer>
                    <Input placeholder="buscar" />
                    <Button><strong>buscar</strong></Button>
                </NavInputContainer>
            </Container>
        </MainNav>
    )
}

const MobileNavbar = () => {
    const iconStyle = {
        fontSize: '2em',
        cursor: 'pointer'
    }
    return (
        <MobileNav>
            <Logo><strong>orkut</strong></Logo>
            <TiThMenu style={ iconStyle } />
            
        </MobileNav>
    )
}

export default Navbar