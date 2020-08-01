import React from 'react'
import { Main } from '../styles/profile'
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { SEND_FRIEND_REQUEST, FIND_USER, UNFRIEND, GET_ALL_USERS } from '../services/queries'

import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileMain from '../components/profile/ProfileMain'
import ProfileRight from '../components/profile/ProfileRight'
import CommunitiesMain from '../components/profile/CommunitiesMain'
import PhotosMain from '../components/profile/PhotosMain'
import PhotoDetail from '../components/profile/PhotoDetail'

import Notification from '../components/utils/Notification'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'

const ProfileRoute = ({ loggedUser, crumbs }) => {
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
        refetchQueries: [{ query: FIND_USER, variables: { userId: loggedUser.id } }, { query: GET_ALL_USERS }]
    })
    const [unfriend] = useMutation(UNFRIEND, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FIND_USER, variables: { userId: loggedUser.id } }, { query: GET_ALL_USERS }]
    })

    const handleUnfriend = (friend) => {
        console.log('Tchau tchau,', friend.name)
        unfriend({
            variables: {
                friendId: friend.id
            }
        })
    }

    const handleSendRequest = (requestee) => {
        console.log('Adding', requestee.name)
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

    const user = data ? data.findUser : null;

    return (
        <Main>
            <ProfileLeft
                user={ user } 
                loggedUser={ loggedUser } 
                handleSendRequest={ handleSendRequest }
                handleUnfriend={ handleUnfriend }
            />
            
            <Switch>
                <Route exact path={`${match.path}/atualizacoes`}>
                    <h1>Updates</h1>
                </Route>

                <Route exact path={`${match.path}/scraps`}>
                    <h1>Scraps</h1>
                </Route>

                <Route exact path={`${match.path}/fotos/:photoId`}>
                    <PhotoDetail crumbs={crumbs} loggedUser={loggedUser} />
                </Route>

                <Route exact path={`${match.path}/fotos`}>
                    <PhotosMain crumbs={crumbs} loggedUser={loggedUser} />
                </Route>

                <Route exact path={`${match.path}/videos`}>
                    <h1>Videos</h1>
                </Route>

                <Route exact path={`${match.path}/depoimentos`}>
                    <h1>Testimonials</h1>
                </Route>

                <Route exact path={`${match.path}/comunidades`}>
                    <CommunitiesMain
                        user={ loggedUser }
                    />
                    <ProfileRight
                        user={ user } 
                        loggedUser={ loggedUser }
                    />
                </Route>

                <Route exact path={`${match.path}`}>
                    <ProfileMain
                        user={ user } 
                        loggedUser={ loggedUser } 
                        handleSendRequest={ handleSendRequest }
                        handleUnfriend={ handleUnfriend } 
                    />
                    <ProfileRight
                        user={ user } 
                        loggedUser={ loggedUser }
                    />
                </Route>
            </Switch>
        </Main>
    )
}

export default ProfileRoute