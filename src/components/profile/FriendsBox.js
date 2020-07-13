import React from 'react'
import {
    Card,
    Input,
    Subtitle2,
    Image
} from '../../styles/layout'
import {
    ProfileFriends,
    FriendsList
} from '../../styles/profile'
import { Link } from 'react-router-dom'

const FriendsBox = ({ user }) => {
    return (
        <Card>
            <ProfileFriends>
                <div>
                    <Subtitle2>Amigos ({ user.Friends.length })</Subtitle2>
                    <Input placeholder="buscar amigos" />
                </div> 
                <FriendsList>
                    {
                        user.Friends.map(f => (
                            <Link to={ `/perfil/${f.id}` } key={ f.id }>
                                <div>
                                    <Image size="70" url={ f.profile_picture } />
                                    <span>{ f.name }</span>
                                </div>
                            </Link>
                        ))
                    }
                </FriendsList>
            </ProfileFriends>
        </Card>
    )
}

export default FriendsBox