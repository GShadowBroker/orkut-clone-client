import React from 'react'
import {
    Card,
    Subtitle2,
    FakeLink
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader
} from '../../styles/profile'

import CommunityItemSkeleton from './CommunityItemSkeleton'
import Skeleton from 'react-loading-skeleton'

const ProfileCommunitiesMainSkeleton = () => {
    return (
        <MainColumn>
            <Card>
                <InlineHeader style={{marginTop: '.6rem'}}>
                    <FakeLink style={{marginLeft: '.8rem'}}>
                        <Skeleton width={ 150 } height={25} />
                    </FakeLink>
                </InlineHeader>
                <ProfileInfo>
                    <Subtitle2><Skeleton width={ 200 } /></Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}>
                        {
                            Array.from(Array(3).keys()).map((c, index) =>
                                <CommunityItemSkeleton key={index} />
                            )
                        }
                    </div>
                </ProfileInfo>

                <ProfileInfo>
                    <Subtitle2><Skeleton width={ 200 } /></Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}>
                        {
                            Array.from(Array(3).keys()).map((c, index) =>
                                <CommunityItemSkeleton key={index} />
                            )
                        }
                    </div>
                </ProfileInfo>

                <ProfileInfo>
                    <Subtitle2><Skeleton width={ 200 } /></Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}>
                        {
                            Array.from(Array(3).keys()).map((c, index) =>
                                <CommunityItemSkeleton key={index} />
                            )
                        }
                    </div>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default ProfileCommunitiesMainSkeleton