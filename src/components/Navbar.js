import React from 'react'
import { Container, Button, SearchInputContainer, SearchInputIcon, Input, ProfileImage } from '../styles/layout'
import { Nav, MobileNav, FooterNav, UpperNav, MainNav, Logo, NavMenu, NavInputContainer } from '../styles/nav'
import { Link, useLocation } from 'react-router-dom'
import { TiArrowSortedDown, TiThMenu } from 'react-icons/ti'
import { IoMdHome } from 'react-icons/io'
import { BsSearch, BsPeopleCircle, BsPeopleFill } from 'react-icons/bs'

const Navbar = ({ loggedUser, logout }) => {
    return (
        <Nav>
            <MobileNavbar loggedUser={loggedUser} />
            <UpperNavbar logout={ logout } loggedUser={ loggedUser } />
            <MainNavbar loggedUser={ loggedUser } />
            <FooterNavbar loggedUser={loggedUser} />
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

const searchIconStyle = {
    // background: '#ffff',
    // fontSize: '1.9em',
    // padding: '5px 0',
    // border: '1px solid #bebebe',
    // borderRight: 'none',
    // color: 'grey'
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
                    <Link to={`/perfil/${loggedUser.id}/comunidades`} className={ location.pathname === `/perfil/${loggedUser.id}/comunidades` ? 'active' : '' }>Comunidades</Link>
                    <Link to="/">Aplicativos <TiArrowSortedDown className="icenter" /></Link>
                    <Link to="/">Temas <TiArrowSortedDown className="icenter" /></Link>
                </NavMenu>
                <NavInputContainer>
                    <SearchInputContainer noborderleft>
                        <SearchInputIcon noborderright>
                            <BsSearch style={ searchIconStyle } />
                        </SearchInputIcon>
                        <Input placeholder="buscar" />
                    </SearchInputContainer>
                    <Button><strong>buscar</strong></Button>
                </NavInputContainer>
            </Container>
        </MainNav>
    )
}

const iconStyle = {
    fontSize: '2em',
    cursor: 'pointer'
}

const MobileNavbar = ({ loggedUser }) => {
    return (
        <MobileNav>
            <TiThMenu style={ iconStyle } />
            <Logo><strong>orkut</strong></Logo>
            <ProfileImage url={ loggedUser.profile_picture } size={ 40 } />
        </MobileNav>
    )
}

const FooterNavbar = ({ loggedUser }) => {
    return (
        <FooterNav>
            <IoMdHome style={ iconStyle } />
            <BsSearch style={ iconStyle } />
            <BsPeopleCircle style={ iconStyle } />
            <BsPeopleFill style={ iconStyle } />
        </FooterNav>
    )
}

export default Navbar