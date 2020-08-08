import React from 'react'
import {
    RightColumn,
} from '../../styles/profile'
import FriendsBox from './FriendsBox'
import CommunitiesBox from './CommunitiesBox'
import FriendSuggestions from './FriendSuggestions'

const ProfileRight = ({ user, suggestions, handleSendRequest, refetchSuggestions, mobile }) => {

    if (mobile) return (
        <div style={{marginTop: '.6rem'}}>
            { suggestions && (
                <FriendSuggestions 
                    suggestions={ suggestions } 
                    handleSendRequest={ handleSendRequest }
                    refetchSuggestions={ refetchSuggestions }
                    user={ user }
                />)}
            <FriendsBox user={ user } />
            <CommunitiesBox user={ user } />
        </div>
    )

    return (
        <RightColumn>
            { suggestions && (
                <FriendSuggestions 
                    suggestions={ suggestions } 
                    handleSendRequest={ handleSendRequest }
                    refetchSuggestions={ refetchSuggestions }
                    user={ user }
                />)}
            <FriendsBox user={ user } />
            <CommunitiesBox user={ user } />
        </RightColumn>
    )
}

export default ProfileRight