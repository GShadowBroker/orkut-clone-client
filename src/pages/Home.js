import React, { useState, useEffect } from 'react'
import { Main } from '../styles/profile'
import { useQuery, useMutation } from '@apollo/client'
import { 
    SEND_FRIEND_REQUEST, 
    FIND_USER, UNFRIEND,
    RESPOND_FRIEND_REQUEST,
    SEND_UPDATE,
    GET_SUGGESTIONS,
    FETCH_FEED
} from '../services/queries'

import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileRight from '../components/profile/ProfileRight'
import HomeMain from '../components/profile/HomeMain'
import Notification from '../components/utils/Notification'
import HomeRightSkeleton from '../components/skeletons/HomeRightSkeleton'

const Home = ({ loggedUser }) => {
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        document.title = `orkut - perfil de ${loggedUser.name}`
    }, [loggedUser])

    const {
        error: errorSuggestions,
        loading: loadingSuggestions,
        data: dataSuggestions,
        refetch: refetchSuggestions
    } = useQuery(GET_SUGGESTIONS, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        }
    })

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
    const [sendUpdate] = useMutation(SEND_UPDATE, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: FETCH_FEED, variables: { limit, offset: 0 } }]
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

    if (errorSuggestions) return <Notification />

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
                sendUpdate={ sendUpdate }
                limit={ limit }
                setLimit={ setLimit }
            />

            {
                loadingSuggestions
                ? <HomeRightSkeleton />
                : (<ProfileRight
                    user={ loggedUser }
                    loggedUser={ loggedUser }
                    handleSendRequest={ handleSendRequest }
                    refetchSuggestions={ refetchSuggestions }
                    suggestions={ dataSuggestions && dataSuggestions.getFriendSuggestions }
                />)
            }
        </Main>
    )
}

export default Home