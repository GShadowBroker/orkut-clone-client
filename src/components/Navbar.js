import React, { useState } from 'react'
import { Container, Button, SearchInputContainer, SearchInputIcon, Input, ProfileImage } from '../styles/layout'
import { Nav, MobileNav, FooterNav, UpperNav, MainNav, Logo, NavMenu, NavInputContainer } from '../styles/nav'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { TiArrowSortedDown, TiThMenu } from 'react-icons/ti'
import { IoMdHome } from 'react-icons/io'
import { BsSearch, BsPeopleCircle, BsPeopleFill } from 'react-icons/bs'

const Navbar = ({ loggedUser, logout, toggleConfig }) => {
    return (
        <Nav>
            <MobileNavbar loggedUser={loggedUser} />
            <UpperNavbar logout={ logout } loggedUser={ loggedUser } toggleConfig={ toggleConfig } />
            <MainNavbar loggedUser={ loggedUser } />
            <FooterNavbar loggedUser={loggedUser} />
        </Nav>
    )
}

const UpperNavbar = ({ loggedUser, logout, toggleConfig }) => {

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
                    <li className="left-menu" onClick={ toggleConfig }>configurações</li>
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
    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = e => {
        e.preventDefault()
        if (!searchTerm) return
        setSearchTerm('')
        const encodedString = encodeURI(searchTerm)
        history.push(`/perfil/${loggedUser.id}/pesquisar?q=${encodedString}`)
    }

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
                <NavInputContainer onSubmit={ handleSearch }>
                    <SearchInputContainer noborderleft>
                        <SearchInputIcon noborderright>
                            <BsSearch style={ searchIconStyle } />
                        </SearchInputIcon>
                        <Input placeholder="buscar" value={ searchTerm } onChange={ ({ target }) => setSearchTerm(target.value) } />
                    </SearchInputContainer>
                    <Button type="submit"><strong>buscar</strong></Button>
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
    const handleDrawer = () => {
        const drawer = document.querySelector('#menu-drawer')
        const body = document.querySelector('body')
        const content = document.querySelector('#main-content')
        const wrapper = document.querySelector('#menu-content-wrapper')

        if (drawer.style.width === '') {
            content.style.transform = 'translate(280px)'

            body.style.overflow = 'hidden'
            wrapper.style.overflow = 'hidden'

            drawer.style.width = '280px'
        } else {
            content.style.transform = ''

            body.style.overflow = ''
            wrapper.style.overflow = ''

            drawer.style.width = ''
        }
    }

    return (
        <MobileNav>
            <TiThMenu style={ iconStyle } onClick={ handleDrawer } />
            <Logo><strong>orkut</strong></Logo>
            <ProfileImage url={ loggedUser.profile_picture } size={ 40 } />
        </MobileNav>
    )
}

const FooterNavbar = ({ loggedUser }) => {
    return (
        <FooterNav>
            <Link to="/">
                <IoMdHome style={ iconStyle } />
            </Link>
            <Link to={`/perfil/${loggedUser.id}/pesquisar`}>
                <BsSearch style={ iconStyle } />
            </Link>
            <Link to={`/perfil/${loggedUser.id}`}>
                <BsPeopleCircle style={ iconStyle } />  
            </Link>
            <Link to={`/perfil/${loggedUser.id}/comunidades`}>
                <BsPeopleFill style={ iconStyle } />
            </Link>
        </FooterNav>
    )
}

export default Navbar