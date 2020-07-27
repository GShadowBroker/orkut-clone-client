import React from 'react'
import {
    RightColumn,
    ProfileFriends,
    FriendsList
} from '../../styles/profile'
import {
    Card,
    Input,
    Subtitle2,
    FakeLink,
    SearchInputContainer,
    SearchInputIcon
} from '../../styles/layout'
import { BsSearch } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'

const HomeRightSkeleton = () => {
    return (
        <RightColumn>
            <Card>
                <ProfileFriends>
                    <div style={{paddingBottom: '1rem'}}>
                        <Subtitle2><Skeleton /></Subtitle2>
                        <SearchInputContainer noborderright>
                            <Input />
                            <SearchInputIcon noborderleft>
                                <BsSearch />
                            </SearchInputIcon>
                        </SearchInputContainer>
                    </div>
                    <FriendsList style={{paddingBottom: '1rem'}}>
                        {
                            Array.from(Array(9).keys()).map((f, i) => (
                                <FakeLink key={ i }>
                                    <div>
                                        <Skeleton height={ 70 } width={ 70 } />
                                        <span><Skeleton width={ 70 } /></span>
                                    </div>
                                </FakeLink>
                            ))
                        }
                    </FriendsList>
                </ProfileFriends>
            </Card>
            
            
            <Card style={{ marginTop: '.6em' }}>
                <ProfileFriends>
                    <div style={{paddingBottom: '1rem'}}>
                        <Subtitle2><Skeleton /></Subtitle2>
                        <SearchInputContainer noborderright>
                            <Input />
                            <SearchInputIcon noborderleft>
                                <BsSearch />
                            </SearchInputIcon>
                        </SearchInputContainer>
                    </div>
                    <FriendsList style={{paddingBottom: '1rem'}}>
                        {
                            Array.from(Array(9).keys()).map((f, i) => (
                                <FakeLink key={ i }>
                                    <div>
                                        <Skeleton height={ 70 } width={ 70 } />
                                        <span><Skeleton width={ 70 } /></span>
                                    </div>
                                </FakeLink>
                            ))
                        }
                    </FriendsList>
                </ProfileFriends>
            </Card>
        </RightColumn>
    )
}

export default HomeRightSkeleton