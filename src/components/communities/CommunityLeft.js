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
import { Link, useLocation, useHistory } from 'react-router-dom'
import trunc from '../../utils/truncate'

const CommunityLeft = ({
    community,
    members,
    memberCount,
    topics,
    topicCount,
    user,
    setNewTopicFormOpen,
    handleJoinCommunity,
    handleLeaveCommunity,
    loadingJoin,
    loadingLeave
}) => {
    const location = useLocation()
    const history = useHistory()

    const handleCreateTopic = () => {
        if (location.pathname === `/comunidades/${community.id}`) {
            setNewTopicFormOpen(true)
            return
        }
        history.push(`/comunidades/${community.id}`)
    }

    const isMember = user.Subscriptions.find(c => c.id === community.id) ? true : false
    return (
        <LeftColumn>
            {
                <ProfileImage url={ community.picture } />
            }
            <ProfileMenu>
                <Card>
                    <ProfileMenu>
                        <Subtitle style={{ paddingBottom: 5, border: 'none' }}>
                            { trunc(community.title, 50) }
                        </Subtitle>
                        <p><strong>{ memberCount } membros</strong></p>
                        <ul style={{ marginTop: '.5rem' }}>
                            <Link to={ `/comunidades/${community.id}` }>
                                <li className={ location.pathname === `/comunidades/${community.id}` ? 'active' : '' }>
                                    <span>comunidade</span>
                                </li>
                            </Link>
                            <Link to={ `/comunidades/${community.id}/forum` }>
                                <li className={ location.pathname.startsWith(`/comunidades/${community.id}/forum`) ? 'active' : '' }>
                                    <span>fórum</span><Badge>{ topicCount ? topicCount : null }</Badge>
                                </li>
                            </Link>
                            <Link to={ `/comunidades/${community.id}/enquetes` }>
                                <li className={ location.pathname.startsWith(`/comunidades/${community.id}/enquetes`) ? 'active' : '' }>
                                    <span>enquetes</span><Badge></Badge>
                                </li>
                            </Link>
                            <Link to={ `/comunidades/${community.id}/membros` }>
                                <li className={ location.pathname === `/comunidades/${community.id}/membros` ? 'active' : '' }>
                                    <span>membros</span><Badge>{ memberCount ? memberCount : null }</Badge>
                                </li>
                            </Link>
                        </ul>
                        <h3>Ações</h3>

                        { isMember
                            ? (<ul>
                                <li onClick={ handleLeaveCommunity }><FakeLink><strong>{ loadingLeave ? 'Saindo...' : 'Deixar comunidade'}</strong></FakeLink></li>
                                <li onClick={ handleCreateTopic }><FakeLink>Criar tópico</FakeLink></li>
                                <li><FakeLink>Denunciar abuso</FakeLink></li>
                            </ul>)
                            : (<ul>
                                <li><FakeLink onClick={ handleJoinCommunity }><strong>{ loadingJoin ? 'Entrando...' : 'Participar da comunidade' }</strong></FakeLink></li>
                                <li><FakeLink>Denunciar abuso</FakeLink></li>
                            </ul>)
                        }
                    </ProfileMenu>
                </Card>
            </ProfileMenu>
        </LeftColumn>
    )
}

export default CommunityLeft