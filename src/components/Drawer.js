import React from 'react'
import {
    DrawerMenu,
    ProfileImage,
    Subtitle,
    FlexBoxCenter,
    Badge,
    FakeLink
} from '../styles/layout'
import { ProfileMenu } from '../styles/profile'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { BsStar } from 'react-icons/bs'

const DrawerContainer = styled.div`
    position: relative;
    padding: .6rem;
    width: 100%;
    height: 100%;
`

const DrawerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Drawer = ({ loggedUser, logout }) => {
    const location = useLocation()
    const user = loggedUser
    return (
        <DrawerMenu id="menu-drawer">
            <DrawerContainer>
                <DrawerHeader>
                    <ProfileImage url={loggedUser.profile_picture} size={ 100 } />
                    <Subtitle>{ loggedUser.name }</Subtitle>
                </DrawerHeader>

                <ProfileMenu>
                    <ul>
                        <li className="vibes">
                            <FakeLink>{user.id === loggedUser.id ? '0 vibes' : 'vibes? 0'}</FakeLink>
                            <Badge><BsStar style={{ fontSize: '1.2em', marginRight: '.2rem' }} />0</Badge>
                        </li>
                        <Link to={ `/perfil/${user.id}/atualizacoes` }>
                            <li className={ location.pathname === `/perfil/${user.id}/atualizacoes` ? 'active' : '' }>
                                <span>
                                    {user.id === loggedUser.id ? 'minhas atualizações' : 'atualizações'}
                                </span>
                                <Badge>{ user.Posts.length > 0 && user.Posts.length }</Badge>
                            </li>
                        </Link>
                        <Link to={ `/perfil/${user.id}` }>
                            <li className={ location.pathname === `/perfil/${user.id}` ? 'active' : '' }>
                                <span>perfil</span>
                            </li>
                        </Link>
                        <Link to={ `/perfil/${user.id}/scraps` }>
                            <li className={ location.pathname === `/perfil/${user.id}/scraps` ? 'active' : '' }>
                                <span>scraps</span><Badge>{ user.Scraps.length > 0 && user.Scraps.length }</Badge>
                            </li>
                        </Link>
                        <Link to={ `/perfil/${user.id}/albuns` }>
                            <li className={ location.pathname.startsWith(`/perfil/${user.id}/albuns`) ? 'active' : '' }>
                                <span>fotos</span><Badge>{ user.Photos.length > 0 && user.Photos.length }</Badge>
                            </li>
                        </Link>
                        <Link to={ `/perfil/${user.id}/videos` }>
                            <li className={ location.pathname === `/perfil/${user.id}/videos` ? 'active' : '' }>
                                <span>videos</span><Badge>{ user.Videos.length > 0 && user.Videos.length }</Badge>
                            </li>
                        </Link>
                        <Link to={ `/perfil/${user.id}/depoimentos` }>
                            <li className={ location.pathname === `/perfil/${user.id}/depoimentos` ? 'active' : '' }>
                                <span>depoimentos</span><Badge>{ user.Testimonials.length > 0 && user.Testimonials.length }</Badge>
                            </li>
                        </Link>
                    </ul>
                </ProfileMenu>
            </DrawerContainer>
        </DrawerMenu>
    )
}

export default Drawer