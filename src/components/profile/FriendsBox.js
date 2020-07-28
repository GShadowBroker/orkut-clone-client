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

const FriendsBox = ({ user }) => {
    return (
        <Card style={{ marginBottom: '.6em' }}>
            <ProfileFriends>
                <div style={{paddingBottom: '1rem'}}>
                    <Subtitle2>Amigos ({ user.Friends.length })</Subtitle2>
                    <SearchInputContainer noborderright>
                        <Input placeholder="buscar amigos" />
                        <SearchInputIcon noborderleft>
                            <BsSearch />
                        </SearchInputIcon>
                    </SearchInputContainer>
                </div> 
                <FriendsList style={{paddingBottom: '1rem'}}>
                    {
                        user.Friends.map(f => (
                            <Link to={ `/perfil/${f.id}` } key={ f.id }>
                                <div>
                                    <Image size="70" url={ f.profile_picture } />
                                    <span>{ trunc(f.name, 25) }</span>
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