import React from 'react'
import {  } from '../styles/layout'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_USERS, SEND_FRIEND_REQUEST, RESPOND_FRIEND_REQUEST, UNFRIEND } from '../services/queries'

const Home = ({ loggedUser }) => {
    const { loading, error, data } = useQuery(GET_ALL_USERS)
    const [ sendFriendRequest ] = useMutation(SEND_FRIEND_REQUEST, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [{ query: GET_ALL_USERS }]
    })
    const [ respondFriendRequest ] = useMutation(RESPOND_FRIEND_REQUEST, {
        onError: (error) => {
        error.graphQLErrors
            ? alert(error.graphQLErrors[0].message)
            : alert('Server timeout')
        },
        refetchQueries: [{ query: GET_ALL_USERS }]
    })
    const [ unfriend ] = useMutation(UNFRIEND, {
        onError: (error) => {
        error.graphQLErrors
            ? alert(error.graphQLErrors[0].message)
            : alert('Server timeout')
        },
        refetchQueries: [{ query: GET_ALL_USERS }]
    })

    if (error) return (
        <div>
            <h2>There was an ERROR</h2>
            <p>Please refresh page or try again later</p>
        </div>
    )

    if (loading) return (
        <h2>loading...</h2>
    )

    const handleSendRequest = (requestee) => {
        console.log('Adding', requestee.name)
        sendFriendRequest({
        variables: {
            requesterId: loggedUser.id,
            requesteeId: requestee.id
        }
        })
    }

    const handleRespondRequest = (requestee, accept = false) => {
        respondFriendRequest({
        variables: {
            requesterId: loggedUser.id,
            requesteeId: requestee.id,
            accept: accept
        }
        })
    }

    const handleUnfriend = (friend) => {
        console.log('Tchau tchau,', friend.name)
        unfriend({
        variables: {
            userId: loggedUser.id,
            friendId: friend.id
        }
        })
    }

    return (
        <div>
            {
                data.allUsers.map(user =>(
                <div key={ user.id } style={{ marginTop: 15 }}>
                    <div style={{ display: 'flex' }}>
                    <img src={ user.profile_picture } alt={ user.name } width="50" height="50" />
                    <h2>{ user.name }</h2>
                    </div>
                    {
                        user.Friends.find(u => u.id === loggedUser.id)
                        ? <button onClick={ () => handleUnfriend(user) }>unfriend</button>
                        : (user.Requesters.find(u => u.id === loggedUser.id) ? <span>Request sent</span> : <button onClick={ () => handleSendRequest(user) }>add as friend</button>)
                    }
                    <p><strong>email: </strong>{ user.email }</p>
                    <p><strong>location: </strong>{ user.city }, { user.country }</p>
                    <a href="/">view full profile</a>
                    <h3>Friends:</h3>
                    <ul>
                    { user.Friends.length === 0 ? <li>No friends :'(</li> : user.Friends.map(friend => (
                        <li key={friend.id}>{ friend.name }</li>
                    )) }
                    </ul>
                    <h3>Friend requests:</h3>
                    <ul>
                    { user.Requesters.length === 0 ? <li>No friend requests</li> : user.Requesters.map(friend => (
                        <li key={friend.id}>
                        { friend.name }
                        <button onClick={ () => handleRespondRequest(user, true) }>accept</button>
                        <button onClick={ () => handleRespondRequest(user, false) }>reject</button>
                        </li>
                    )) }
                    </ul>
                    <h3>Friend requests:</h3>
                    <h3>Comunidades:</h3>
                    <ul>
                        {
                            user.Subscriptions.map(c => (
                                <li key={ c.id }>
                                    <img src={ c.picture } alt={ c.title } width="40" height="40" />
                                    <span>{ c.title }</span>
                                </li>
                            ))
                        }
                    </ul>
                    <hr />
                </div>
                ))
            }
        </div>
    )
}

export default Home