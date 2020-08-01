import React from 'react'
import { Main } from '../styles/profile'
import { useQuery, useMutation } from '@apollo/client'
import { 
    SEND_FRIEND_REQUEST, 
    FIND_USER, UNFRIEND,
    GET_SUGGESTIONS
} from '../services/queries'

import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileRight from '../components/profile/ProfileRight'
import CommunitiesMain from '../components/profile/CommunitiesMain'
import Notification from '../components/utils/Notification'
import HomeRightSkeleton from '../components/skeletons/HomeRightSkeleton'

const Communities = ({ loggedUser, crumbs }) => {
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

    if (errorSuggestions) return <Notification />

    return (
        <Main>
            <ProfileLeft
                user={ loggedUser } 
                loggedUser={ loggedUser } 
                handleSendRequest={ handleSendRequest }
                handleUnfriend={ handleUnfriend }
            />

            <CommunitiesMain
                user={ loggedUser }
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

export default Communities