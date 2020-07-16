import React from 'react'
import {
    Card,
    Badge,
    FakeLink,
    Subtitle
} from '../../styles/layout'
import {
    LeftColumn,
    ProfileImage,
    ProfileMenu
} from '../../styles/profile'
import { Link, useLocation } from 'react-router-dom'

import { BsStar } from 'react-icons/bs'

const ProfileLeft = ({ user, loggedUser, handleSendRequest, handleUnfriend }) => {
    const location = useLocation()
    return (
        <LeftColumn>
            <ProfileImage url={ user.profile_picture }></ProfileImage>
            <ProfileMenu>
                <Card>
                    <ProfileMenu>
                        <Subtitle>{ user.name }</Subtitle>
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
                                    <Badge>{ user.Updates.length > 0 && user.Updates.length }</Badge>
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
                            <Link to={ `/perfil/${user.id}/fotos` }>
                                <li className={ location.pathname === `/perfil/${user.id}/fotos` ? 'active' : '' }>
                                    <span>fotos</span><Badge>{ user.Photos.length > 0 && user.Photos.length }</Badge>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}/videos` }>
                                <li className={ location.pathname === `/perfil/${user.id}/videos` ? 'active' : '' }>
                                    <span>videos</span><Badge></Badge>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}/depoimentos` }>
                                <li className={ location.pathname === `/perfil/${user.id}/depoimentos` ? 'active' : '' }>
                                    <span>depoimentos</span><Badge>{ user.Testimonials.length > 0 && user.Testimonials.length }</Badge>
                                </li>
                            </Link>
                        </ul>
                        <h3>Actions</h3>
                        <ul>
                            {
                                user.Friends.find(u => u.id === loggedUser.id)
                                    ? <li onClick={ () => handleUnfriend(user) }><FakeLink><strong>desfazer amizade</strong></FakeLink></li>
                                    : (user.Requesters.find(u => u.id === loggedUser.id))
                                        ? <li className="disabled">solicitação enviada</li>
                                        : <li onClick={ () => handleSendRequest(user) }><FakeLink><strong>Adicionar como amigo</strong></FakeLink></li>
                            }
                            <li><FakeLink>Ignorar usuário</FakeLink></li>
                            <li><FakeLink>Reportar abuso</FakeLink></li>
                        </ul>
                    </ProfileMenu>
                </Card>
            </ProfileMenu>
        </LeftColumn>
    )
}

export default ProfileLeft