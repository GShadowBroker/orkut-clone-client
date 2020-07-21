import React from 'react'
import {
    Card,
    FakeLink,
    Subtitle
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    ProfileSection,
    LastImages
} from '../../styles/profile'

import Skeleton from 'react-loading-skeleton'

const ProfileMainSkeleton = () => {

    return (
        <MainColumn>
            <Card>
                <ProfileInfo>
                    <div>
                        <Subtitle><Skeleton width={ 250 } /></Subtitle>
                    </div>
                    <ProfileSection border>
                        <div>
                            <p><Skeleton width={ 200 } /></p>
                        </div>
                        <FakeLink>
                            <Skeleton width={ 200 } />
                        </FakeLink>
                    </ProfileSection>
                    <ProfileSection border>
                        <div>
                            <InlineHeader>
                                <Subtitle><Skeleton width={ 80 } /></Subtitle>
                            </InlineHeader>
                            
                            <p><Skeleton count={ 3 } /></p>
                        </div>
                    </ProfileSection>
                    <ProfileSection border>
                        <div>
                            <InlineHeader>
                                <Subtitle><Skeleton width={ 150 } /></Subtitle>
                            </InlineHeader>
                            <LastImages>
                                <FakeLink>
                                    <Skeleton height={ 85 } />
                                </FakeLink>
                                <FakeLink>
                                    <Skeleton height={ 85 } />
                                </FakeLink>
                                <FakeLink>
                                    <Skeleton height={ 85 } />
                                </FakeLink>
                                <FakeLink>
                                    <Skeleton height={ 85 } />
                                </FakeLink>
                                <FakeLink>
                                    <Skeleton height={ 85 } />
                                </FakeLink>
                            </LastImages>
                        </div>
                    </ProfileSection>
                    <ProfileSection>
                        <div>
                            <InlineHeader>
                                <Subtitle><Skeleton width={ 150 } /></Subtitle>
                            </InlineHeader>
                        </div>
                    </ProfileSection>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default ProfileMainSkeleton