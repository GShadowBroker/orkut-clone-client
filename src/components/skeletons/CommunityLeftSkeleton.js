import React from 'react'
import {
    Card,
    Badge,
    FakeLink,
    Subtitle
} from '../../styles/layout'
import {
    LeftColumn,
    ProfileImage,
    ProfileMenu
} from '../../styles/profile'

import Skeleton from 'react-loading-skeleton'

const ProfileLeftSkeleton = () => {
    return (
        <LeftColumn>
            <ProfileImage><Skeleton height={ 200 } /></ProfileImage>
            <ProfileMenu>
                <Card>
                    <ProfileMenu>
                        <Subtitle><Skeleton /></Subtitle>
                        <ul>
                            <li className="vibes">
                                <FakeLink><Skeleton width={ 80 } /></FakeLink>
                                <Badge><Skeleton width={ 20 } /></Badge>
                            </li>
                            <FakeLink>
                                <li>
                                    <span>
                                        <Skeleton width={ 80 } />
                                    </span>
                                    <Badge><Skeleton width={ 20 } /></Badge>
                                </li>
                            </FakeLink>
                            <FakeLink>
                                <li>
                                    <span><Skeleton width={ 80 } /></span>
                                </li>
                            </FakeLink>
                            <FakeLink>
                                <li>
                                    <span><Skeleton width={ 80 } /></span><Badge><Skeleton width={ 20 } /></Badge>
                                </li>
                            </FakeLink>
                        </ul>
                        <h3><Skeleton /></h3>
                        <ul>
                            <li><Skeleton width={ 100 } /></li>
                            <li><FakeLink><Skeleton width={ 100 } /></FakeLink></li>
                            <li><FakeLink><Skeleton width={ 100 } /></FakeLink></li>
                        </ul>
                    </ProfileMenu>
                </Card>
            </ProfileMenu>
        </LeftColumn>
    )
}

export default ProfileLeftSkeleton