import React from 'react'
import {
    RightColumn,
} from '../../styles/profile'
import {
    Card,
    Subtitle2,
    Image
} from '../../styles/layout'
import {
    ProfileFriends,
    FriendsList
} from '../../styles/profile'
import { Link } from 'react-router-dom'
import trunc from '../../utils/truncate'

const CommunityRight = ({ community, user, members, memberCount }) => {

    return (
        <RightColumn>
            <Card style={{ marginBottom: '.6em' }}>
                <ProfileFriends>
                    <div style={{paddingBottom: '1rem'}}>
                        <Subtitle2>Membros ({ memberCount })</Subtitle2>
                    </div> 
                    <FriendsList style={{paddingBottom: '1rem'}}>
                        {
                            members.map(m => (
                                <Link to={ `/perfil/${m.id}` } key={ m.id }>
                                    <div>
                                        <Image size="70" url={ m.profile_picture } />
                                        <span>{ trunc(m.name, 25) }</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </FriendsList>
                </ProfileFriends>
            </Card>

            <Card>
                <ProfileFriends>
                    <div style={{paddingBottom: '1rem'}}>
                        <Subtitle2>Comunidades relacionadas </Subtitle2>
                    </div>  
                    <FriendsList style={{paddingBottom: '1rem'}}>

                        {/* MOSTRAR COMUNIDADES RELACIONADAS */}

                    </FriendsList>
                </ProfileFriends>
            </Card>
        </RightColumn>
    )
}

export default CommunityRight