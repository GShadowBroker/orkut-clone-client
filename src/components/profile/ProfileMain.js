import React, { useState } from 'react'
import {
    Card,
    FakeLink,
    Button,
    Subtitle,
    Image
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    ProfileSection,
    LastImages
} from '../../styles/profile'
import { TiPlusOutline, TiMinusOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { SEND_FRIEND_REQUEST, FIND_USER, UNFRIEND, GET_ALL_USERS } from '../../services/queries'
import Testimonials from './Testimonials'

const ProfileMain = ({ user }) => {
    const [viewFullProfile, setViewFullProfile] = useState(false)
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId: "1" } }, { query: GET_ALL_USERS }] // CHANGE ID FROM "1" TO LOGGED IN USER ID
    })
    const [unfriend] = useMutation(UNFRIEND, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId: "1" } }, { query: GET_ALL_USERS }] // CHANGE ID FROM "1" TO LOGGED IN USER ID
    })

    const handleUnfriend = (friend) => {
        console.log('Tchau tchau,', friend.name)
        unfriend({
            variables: {
                userId: "1",
                friendId: friend.id
            }
        })
    }

    const handleSendRequest = (requestee) => {
        console.log('Adding', requestee.name)
        sendFriendRequest({
            variables: {
                requesterId: "1",
                requesteeId: requestee.id
            }
        })
    }

    return (
        <MainColumn>
            <Card>
                <ProfileInfo>
                    <InlineHeader>
                        <div>
                            <Subtitle>{ user.name }</Subtitle>
                        </div>
                        <div>
                            {
                                user.Friends.find(u => u.id === "1")
                                ? <Button onClick={ () => handleUnfriend(user) }><TiMinusOutline className="icenter" style={{ color: '#bebebe' }} /> desfazer amizade</Button>
                                : (user.Requesters.find(u => u.id === "1"))
                                    ? <Button disabled>solicitação enviada</Button>
                                    : <Button onClick={ () => handleSendRequest(user) }><TiPlusOutline className="icenter" style={{ color: '#bebebe' }} /> adicionar como amigo</Button>
                            }
                            <FakeLink>ignorar</FakeLink>
                            <FakeLink>reportar</FakeLink>
                        </div>
                    </InlineHeader>
                    <ProfileSection border>
                        <div>
                            <p><strong>localização: </strong>{ user.city }, { user.country }</p>
                        </div>
                        {
                            viewFullProfile ? (
                                <div>
                                    <p><strong>sexo: </strong>{ user.gender }</p>
                                    <p><strong>idade: </strong>{ user.born }</p>
                                    <p><strong>aniversário: </strong>{ user.born }</p>
                                    <p><strong>e-mail: </strong>{ user.email }</p>
                                    <p><strong>interesses em: </strong>{ user.interests }</p>
                                </div>
                            ) : null
                        }
                        <FakeLink onClick={ () => setViewFullProfile(!viewFullProfile) }>
                                { viewFullProfile
                                    ? 'esconder perfil completo'
                                    : 'visualizar perfil completo'
                                }
                        </FakeLink>
                    </ProfileSection>
                    <ProfileSection border>
                        <div>
                            <InlineHeader>
                                <Subtitle>Sobre { user.name }</Subtitle>
                            </InlineHeader>
                            
                            <p>{ user.about ? user.about : 'Sem informações.' }</p>
                        </div>
                    </ProfileSection>
                    <ProfileSection border>
                        <div>
                            <InlineHeader>
                                <Subtitle>Últimas Fotos</Subtitle>
                            </InlineHeader>
                            <LastImages>
                                {
                                    user.Photos.slice(0, 5).map(p => (
                                        <Link key={ p.id } to={`/perfil/${user.id}/fotos/${p.id}`} >
                                            <Image url={ p.url } size="100" />
                                        </Link>
                                    ))
                                }
                            </LastImages>
                        </div>
                    </ProfileSection>
                    <ProfileSection>
                        <div>
                            <InlineHeader>
                                <Subtitle>Vídeos Recentes</Subtitle>
                            </InlineHeader>
                        </div>
                    </ProfileSection>
                </ProfileInfo>
            </Card>
            <Testimonials user={ user } />
        </MainColumn>
    )
}

export default ProfileMain