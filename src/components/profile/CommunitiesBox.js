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

const CommunitiesBox = ({ user }) => {
    return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileFriends>
                <div>
                    <Subtitle2>Comunidades ({ user.Subscriptions.length })</Subtitle2>
                    <Input placeholder="buscar comunidades" />
                </div> 
                <FriendsList>
                    {
                        user.Subscriptions.map(c => (
                            <Link to={ `/comunidades/${c.id}` } key={ c.id }>
                                <div>
                                    <Image size="70" url={ c.picture } />
                                    <span>{ c.title }</span>
                                </div>
                            </Link>
                        ))
                    }
                </FriendsList>
            </ProfileFriends>
        </Card>
    )
}

export default CommunitiesBox