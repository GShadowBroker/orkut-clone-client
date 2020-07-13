import React from 'react'
import {
    RightColumn,
} from '../../styles/profile'
import FriendsBox from './FriendsBox'
import CommunitiesBox from './CommunitiesBox'

const ProfileRight = ({ user }) => {
    return (
        <RightColumn>
            <FriendsBox user={ user } />
            <CommunitiesBox user={ user } />
        </RightColumn>
    )
}

export default ProfileRight