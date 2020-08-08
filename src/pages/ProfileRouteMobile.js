import React from 'react'
import { Main } from '../styles/profile'
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { SEND_FRIEND_REQUEST, FIND_USER, UNFRIEND } from '../services/queries'

import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileMain from '../components/profile/ProfileMain'
import ProfileRight from '../components/profile/ProfileRight'
import CommunitiesMain from '../components/profile/CommunitiesMain'
import ProfilePhotos from './ProfilePhotos'
import ProfileVideosMain from '../components/profile/ProfileVideosMain'
import ScrapsMain from '../components/profile/ScrapsMain'

import Notification from '../components/utils/Notification'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'

const ProfileRouteMobile = ({ loggedUser }) => {
    const match = useRouteMatch()
    const { userId } = useParams()
    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })

    // friend requests
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId } }]
    })
    const [unfriend] = useMutation(UNFRIEND, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId } }]
    })

    const handleUnfriend = (friend) => {
        const answer = window.confirm(`Deseja desfazer amizade com ${friend.name}?`)
        if (!answer) return
        unfriend({
            variables: {
                friendId: friend.id
            }
        })
    }

    const handleSendRequest = (requestee) => {
        const answer = window.confirm(`Deseja enviar uma solicitação de amizade para ${requestee.name}?`)
        if (!answer) return
        sendFriendRequest({
            variables: {
                requesteeId: requestee.id
            }
        })
    }

    if (loading) return <ProfileSkeleton />

    if (error) return (
        <Notification />
    )

    const user = data && data.findUser

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/atualizacoes`}>
                    <h1>Updates</h1>
                </Route>

                <Route path={`${match.path}/scraps`}>
                    <ScrapsMain loggedUser={ loggedUser } />
                </Route>

                <Route path={`${match.path}/albuns`}>
                    <ProfilePhotos loggedUser={ loggedUser } />
                </Route>

                <Route path={`${match.path}/videos`}>
                    <ProfileVideosMain loggedUser={ loggedUser } user={ user } />
                </Route>

                <Route path={`${match.path}/depoimentos`}>
                    <h1>Testimonials</h1>
                </Route>

                <Route path={`${match.path}/comunidades`}>
                    <CommunitiesMain
                        user={ loggedUser }
                    />
                    <ProfileRight
                        user={ user } 
                        loggedUser={ loggedUser }
                        mobile={ true }
                    />
                </Route>

                <Route path={`${match.path}`}>
                    <ProfileMain
                        user={ user } 
                        loggedUser={ loggedUser } 
                        handleSendRequest={ handleSendRequest }
                        handleUnfriend={ handleUnfriend }
                        mobile={ true }
                    />
                    <ProfileRight
                        user={ user } 
                        loggedUser={ loggedUser }
                        mobile={ true }
                    />
                </Route>
            </Switch>
        </div>
    )
}

export default ProfileRouteMobile