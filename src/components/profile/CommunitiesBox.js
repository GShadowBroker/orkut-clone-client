import React from 'react'
import {
    Card,
    Input,
    Subtitle2,
    Image,
    SearchInputContainer,
    SearchInputIcon
} from '../../styles/layout'
import {
    ProfileFriends,
    FriendsList
} from '../../styles/profile'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import trunc from '../../utils/truncate'

const CommunitiesBox = ({ user }) => {
    return (
        <Card>
            <ProfileFriends>
                <div style={{paddingBottom: '1rem'}}>
                    <Subtitle2>Comunidades ({ user.Subscriptions.length })</Subtitle2>
                    <SearchInputContainer noborderright>
                        <Input placeholder="buscar comunidades" />
                        <SearchInputIcon noborderleft>
                            <BsSearch />
                        </SearchInputIcon>
                    </SearchInputContainer>
                </div>  
                <FriendsList style={{paddingBottom: '1rem'}}>
                    {
                        user.Subscriptions.map(c => (
                            <Link to={ `/comunidades/${c.id}` } key={ c.id }>
                                <div>
                                    <Image size="70" url={ c.picture } />
                                    <span>{ trunc(c.title, 30) }</span>
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