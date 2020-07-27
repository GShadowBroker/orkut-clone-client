import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import Notification from '../utils/Notification'

import { TiArrowSortedDown } from 'react-icons/ti'
import HomeMainSkeleton from '../skeletons/HomeMainSkeleton'

import {
    Card,
    Button,
    Subtitle2,
    Image,
    FormUpdate,
    TextArea,
    InputGroupUpdate,
    ActionGroupUpdate,
    InputWarning,
    Select,
    Message,
    MessageContent,
    MessageHeader,
    MessageBody,
    MessageProfile,
    MessageActions,
    FortuneLogo,
    Time,
    ShowMore,
    FakeLink
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    OrkutStyles
} from '../../styles/profile'
import { FaThList } from 'react-icons/fa'
import { AiFillLayout } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import todaysFortune from '../../utils/todaysFortune'

import { useQuery } from '@apollo/client'
import { FETCH_FEED } from '../../services/queries'

const CommunitiesMain = ({ user, handleRespondFriendRequest, sendUpdate, limit, setLimit }) => {
    return (
        <></>
        // <MainColumn>
        //     <Card>
        //         <ProfileInfo style={{ marginTop: '.6rem' }}>
        //             <FormUpdate onSubmit={ handleSubmit }>
        //                 <InputGroupUpdate>
        //                     <TextArea
        //                         value={ post }
        //                         onChange={ ({ target }) => setPost(target.value) }
        //                         placeholder="Diga algo a seus amigos ou poste uma foto, vídeo ou outro link aqui."
        //                         maxLength="1000"
        //                         required
        //                     />
        //                 </InputGroupUpdate>
        //                 <ActionGroupUpdate>
        //                     <Button type="submit"><strong>post</strong></Button>
        //                     <Button onClick={ cancelPost }>cancel</Button>
        //                 </ActionGroupUpdate>
        //             </FormUpdate>
        //             { post.length >= 1000
        //                 && (<InputWarning>
        //                         limite de caracteres atingido (1000)
        //                     </InputWarning>)}
        //         </ProfileInfo>
        //         <ProfileInfo>
        //             <InlineHeader>
        //                 <div style={{
        //                     display: 'flex',
        //                     maxHeight: 30,
        //                     alignItems: 'center',
        //                     margin: '1rem 0'
        //                 }}>
        //                     <Subtitle2 style={{ marginRight: '.3rem' }}>Atualizações de:</Subtitle2>
        //                     <Select  onChange={ handleShowChange } value={ show }>
        //                         <option value="all">todos</option>
        //                         <option value="friends">amigos</option>
        //                     </Select>
        //                 </div>
        //                 <OrkutStyles>
        //                     Estilo Orkut:
        //                     <Button><AiFillLayout /></Button>
        //                     <Button><FaThList /></Button>
        //                 </OrkutStyles>
        //             </InlineHeader>
        //         </ProfileInfo>
        //         <ProfileInfo borderbottom>
        //             <Message>
        //                 <FortuneLogo />
        //                 <MessageContent>
        //                     <MessageHeader>
        //                         <Subtitle2>
        //                             <strong>
        //                                 Sua sorte do dia ({
        //                                     new Date().toLocaleString('pt-BR', { month: 'long', day: 'numeric' })
        //                                 })
        //                             </strong>
        //                         </Subtitle2>
        //                     </MessageHeader>
        //                     <MessageBody>
        //                         <p>{ fortune }</p>
        //                     </MessageBody>
        //                 </MessageContent>
        //             </Message>
        //         </ProfileInfo>
                
        //         { user.Requesters.map(u => (
        //             <ProfileInfo key={ u.id } style={{ margin: '.5rem 0' }} borderbottom>
        //                 <Message>
        //                     <Link to={`/perfil/${u.id}`}>
        //                         <Image size="50" url={ u.profile_picture } />
        //                     </Link>
        //                     <MessageContent>
        //                         <MessageHeader>
        //                             <Subtitle2 style={{ marginTop: 0 }}><strong>Novo pedido de amizade</strong></Subtitle2>
        //                         </MessageHeader>
        //                         <MessageBody>
        //                             <Link to={`/perfil/${u.id}`}>{ u.name } </Link>quer ser seu amigo no orkut.
        //                         </MessageBody>
        //                         <MessageActions below>
        //                             <Button
        //                                 onClick={ () => handleRespondFriendRequest(u, true) }
        //                             ><strong>aceitar</strong></Button>
        //                             <Button
        //                                 onClick={ () => handleRespondFriendRequest(u, false) }
        //                             >rejeitar</Button>
        //                         </MessageActions>
        //                     </MessageContent>
        //                 </Message>
        //             </ProfileInfo>
        //         ))}
        //         { feed.map(f => (
        //             <ProfileInfo key={ f.id } style={{ padding: '1rem .8rem' }} borderbottom>
        //                 <Message>
        //                     <Link to={`/perfil/${f.User.id}`}>
        //                         <Image size="50" url={ f.User.profile_picture } />
        //                     </Link>
        //                     <MessageContent>
        //                         <MessageHeader>
        //                             <Link to={`/perfil/${f.User.id}`}>{ f.User.name }</Link>
        //                             <Time>
        //                                 { new Date(f.createdAt).toLocaleString('pt-BR', timeOptions) } ({ moment(f.createdAt).fromNow() })
        //                             </Time>
        //                         </MessageHeader>
        //                         <MessageBody>
        //                             <div dangerouslySetInnerHTML={{ __html: f.body }} />
        //                             {
        //                                 f.object
        //                                 ? (
        //                                     <MessageProfile>
        //                                         <Link to={ JSON.parse(f.object).url }>
        //                                             <Image size="50" url={ JSON.parse(f.object).picture } />
        //                                         </Link>
        //                                         <Link to={ JSON.parse(f.object).url }>{ JSON.parse(f.object).name }</Link>
        //                                     </MessageProfile>)
        //                                 : null
        //                             }
        //                             { f.picture ? <Image size="100" url={ f.picture } /> : null }
        //                         </MessageBody>
        //                     </MessageContent>
        //                 </Message>
        //             </ProfileInfo>
        //         ))}
        //         { hasMoreFeed
        //             && (<ShowMore>
        //                     <FakeLink
        //                         id="#view-more"
        //                         onClick={ () => {
        //                             fetchMore({
        //                                 variables: {
        //                                     limit: limit + 10
        //                                 }
        //                             })
        //                             setLimit(limit + 10)
        //                         } }
        //                     ><TiArrowSortedDown className="icenter" /> ver mais</FakeLink>
        //                 </ShowMore>)}
        //     </Card>
        // </MainColumn>
    )
}

export default CommunitiesMain