import React from 'react'
import { Main } from '../styles/profile'
import { useParams } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { SEND_FRIEND_REQUEST, FIND_USER, UNFRIEND, GET_ALL_USERS } from '../services/queries'

import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileMain from '../components/profile/ProfileMain'
import ProfileRight from '../components/profile/ProfileRight'

import Notification from '../components/utils/Notification'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'

const Profile = ({ loggedUser }) => {
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
        </Main>
    )
}

export default Profile