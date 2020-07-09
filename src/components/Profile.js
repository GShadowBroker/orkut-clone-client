import React from 'react'
import { Card, Badge, FakeLink } from '../styles/layout'
import {
    Main,
    LeftColumn,
    MainColumn,
    RightColumn,
    ProfileImage,
    ProfileMenu,
    ProfileInfo,
    InlineHeader
} from '../styles/profile'
import { Link, useLocation } from 'react-router-dom'

const Profile = ({ user }) => {
    const location = useLocation()
    return (
        <Main>
            <LeftColumn>
                <ProfileImage url={ user.profile_picture }></ProfileImage>
                <ProfileMenu>
                    <Card>
                        <ProfileMenu>
                            <h2>{ user.name }</h2>
                            <ul>
                                <li>
                                    <FakeLink>2 vibes</FakeLink><Badge></Badge>
                                </li>
                                <Link to={ `/perfil/${user.id}/atualizacoes` }>
                                    <li className={ location.pathname === `/perfil/${user.id}/atualizacoes` ? 'active' : '' }>
                                        <span>atualizações</span><Badge>2</Badge>
                                    </li>
                                </Link>
                                <Link to={ `/perfil/${user.id}` }>
                                    <li className={ location.pathname === `/perfil/${user.id}` ? 'active' : '' }>
                                        <span>perfil</span>
                                    </li>
                                </Link>
                                <Link to={ `/perfil/${user.id}/scraps` }>
                                    <li className={ location.pathname === `/perfil/${user.id}/scraps` ? 'active' : '' }>
                                        <span>scraps</span><Badge>108</Badge>
                                    </li>
                                </Link>
                                <Link to={ `/perfil/${user.id}/fotos` }>
                                    <li className={ location.pathname === `/perfil/${user.id}/fotos` ? 'active' : '' }>
                                        <span>fotos</span><Badge>19</Badge>
                                    </li>
                                </Link>
                                <Link to={ `/perfil/${user.id}/videos` }>
                                    <li className={ location.pathname === `/perfil/${user.id}/videos` ? 'active' : '' }>
                                        <span>videos</span><Badge>0</Badge>
                                    </li>
                                </Link>
                                <Link to={ `/perfil/${user.id}/depoimentos` }>
                                    <li className={ location.pathname === `/perfil/${user.id}/depoimentos` ? 'active' : '' }>
                                        <span>depoimentos</span><Badge>10</Badge>
                                    </li>
                                </Link>
                            </ul>
                            <h3>Actions</h3>
                            <ul>
                                <li><FakeLink><strong>Adicionar como amigo</strong></FakeLink></li>
                                <li><FakeLink>Ignorar usuário</FakeLink></li>
                                <li><FakeLink>Reportar abuso</FakeLink></li>
                            </ul>
                        </ProfileMenu>
                    </Card>
                </ProfileMenu>
            </LeftColumn>
            <MainColumn>
                <Card>
                    <ProfileInfo>
                        <InlineHeader>
                            <div>
                                <h3>{ user.name }</h3>
                            </div>
                            <div>
                                <button>adicionar como amigo</button>
                                <FakeLink style={{ color: '#6999c5' }}>ignorar</FakeLink>
                                <FakeLink style={{ color: '#6999c5' }}>reportar</FakeLink>
                            </div>
                        </InlineHeader>
                        
                    </ProfileInfo>
                </Card>
            </MainColumn>
            <RightColumn></RightColumn>
        </Main>
    )
}

export default Profile