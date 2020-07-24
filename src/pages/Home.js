import React, { useState } from 'react'
import { Main } from '../styles/profile'
import { useParams } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { 
    SEND_FRIEND_REQUEST, 
    FIND_USER, UNFRIEND, 
    GET_ALL_USERS,
    RESPOND_FRIEND_REQUEST,
    GET_FEED
} from '../services/queries'

import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileRight from '../components/profile/ProfileRight'

import Notification from '../components/utils/Notification'

import {
    Card,
    FakeLink,
    Button,
    Subtitle,
    Subtitle2,
    Image,
    FormUpdate,
    TextArea,
    InputGroupUpdate,
    ActionGroupUpdate,
    Select,
    Message,
    MessageContent,
    MessageHeader,
    MessageBody,
    MessageActions,
    FortuneLogo
} from '../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    ProfileSection,
    LastImages,
    OrkutStyles
} from '../styles/profile'
import { TiPlusOutline, TiMinusOutline } from 'react-icons/ti'
import { FaThList } from 'react-icons/fa'
import { AiFillLayout } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import Testimonials from '../components/profile/Testimonials'
import { findAllByDisplayValue } from '@testing-library/react'

import todaysFortune from '../utils/todaysFortune'

const Home = ({ loggedUser }) => {

    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId: loggedUser.id } }]
    })
    const [unfriend] = useMutation(UNFRIEND, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId: loggedUser.id } }]
    })
    const [respondFriendRequest] = useMutation(RESPOND_FRIEND_REQUEST, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId: loggedUser.id } }]
    })

    const handleUnfriend = (friend) => {
        unfriend({
            variables: {
                userId: loggedUser.id,
                friendId: friend.id
            }
        })
    }

    const handleSendRequest = (requestee) => {
        sendFriendRequest({
            variables: {
                requesteeId: requestee.id
            }
        })
    }

    const handleRespondFriendRequest = (requester, accept) => {
        respondFriendRequest({
            variables: {
                requesterId: requester.id,
                accept
            }
        })
    }

    return (
        <Main>
            <ProfileLeft
                user={ loggedUser } 
                loggedUser={ loggedUser } 
                handleSendRequest={ handleSendRequest }
                handleUnfriend={ handleUnfriend }
            />

            <HomeMain
                user={ loggedUser } 
                handleRespondFriendRequest={ handleRespondFriendRequest }
            />

            <ProfileRight
                user={ loggedUser } 
                loggedUser={ loggedUser }
            />
        </Main>
    )
}

const HomeMain = ({ user, handleRespondFriendRequest }) => {

    const { error, loading, data } = useQuery(GET_FEED, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        }
    })

    if (error) return <Notification />

    if (loading) return <h1>LOADING...</h1>

    const feed = data && data.getFeed

    const timeOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }

    return (
        <MainColumn>
            <Notification
                title="Importante" 
                message="Este site é apenas um clone do orkut.com original e não tem qualquer vínculo com o Google." 
                severity="low"
                margin={ '0 0 .6rem 0' }
            />
            <Card>
                <ProfileInfo style={{ marginTop: '.6rem' }}>
                    <FormUpdate>
                        <InputGroupUpdate>
                            <TextArea
                                placeholder="Diga algo a seus amigos ou poste uma foto, vídeo ou outro link aqui."
                            />
                        </InputGroupUpdate>
                        <ActionGroupUpdate>
                            <Button><strong>post</strong></Button>
                            <Button>cancel</Button>
                        </ActionGroupUpdate>
                    </FormUpdate>
                </ProfileInfo>
                <ProfileInfo>
                    <InlineHeader>
                        <div style={{
                            display: 'flex',
                            maxHeight: 30,
                            alignItems: 'center',
                            margin: '1rem 0'
                        }}>
                            <Subtitle2 style={{ marginRight: '.3rem' }}>Atualizações de:</Subtitle2>
                            <Select>
                                <option value="all">todo mundo</option>
                                <option value="me">só amigos</option>
                            </Select>
                        </div>
                        <OrkutStyles>
                            Estilo Orkut:
                            <Button><AiFillLayout /></Button>
                            <Button><FaThList /></Button>
                        </OrkutStyles>
                    </InlineHeader>
                </ProfileInfo>
                <ProfileInfo borderbottom>
                    <Message>
                        <FortuneLogo />
                        <MessageContent>
                            <MessageHeader>
                                <Subtitle2><strong>Sua sorte do dia ({ new Date().toLocaleString('pt-BR', timeOptions) })</strong></Subtitle2>
                            </MessageHeader>
                            <MessageBody>
                                <p>{ todaysFortune[Math.floor(Math.random() * todaysFortune.length)] }</p>
                            </MessageBody>
                        </MessageContent>
                    </Message>
                </ProfileInfo>
                
                { user.Requesters.map(u => (
                    <ProfileInfo key={ u.id } style={{ margin: '.5rem 0' }} borderbottom>
                        <Message>
                            <Link to={`/perfil/${u.id}`}>
                                <Image size="50" url={ u.profile_picture } />
                            </Link>
                            <MessageContent>
                                <MessageHeader>
                                    <Subtitle2 style={{ marginTop: 0 }}><strong>Novo pedido de amizade</strong></Subtitle2>
                                </MessageHeader>
                                <MessageBody>
                                    <Link to={`/perfil/${u.id}`}>{ u.name } </Link>quer ser seu amigo no orkut.
                                </MessageBody>
                                <MessageActions below>
                                    <Button
                                        onClick={ () => handleRespondFriendRequest(u, true) }
                                    ><strong>aceitar</strong></Button>
                                    <Button
                                        onClick={ () => handleRespondFriendRequest(u, false) }
                                    >rejeitar</Button>
                                </MessageActions>
                            </MessageContent>
                        </Message>
                    </ProfileInfo>
                ))}
                { feed.map(f => (
                    <ProfileInfo key={ f.id } style={{ padding: '1rem .8rem' }} borderbottom>
                        <Message>
                            <Link to={`/perfil/${f.User.id}`}>
                                <Image size="50" url={ f.User.profile_picture } />
                            </Link>
                            <MessageContent>
                                <MessageHeader>
                                    <Subtitle2 style={{ marginTop: 0 }}><strong>{ f.body }</strong></Subtitle2>
                                </MessageHeader>
                                <MessageBody>
                                    <Link to={`/perfil/${f.User.id}`}>{ f.User.name } </Link>{ f.body }
                                </MessageBody>
                            </MessageContent>
                        </Message>
                    </ProfileInfo>
                ))}
            </Card>
        </MainColumn>
    )
}

export default Home