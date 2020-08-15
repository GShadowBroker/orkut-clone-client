import React from 'react'
import {
    Card,
    FakeLink,
    Subtitle,
    FlexBoxCenter
} from '../../styles/layout'
import {
    ProfileInfo
} from '../../styles/profile'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import ProfileMainSkeleton from './ProfileMainSkeleton'
import CommunityMainSkeleton from './CommunityMainSkeleton'

const FloatRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    position: absolute;
    top: 0;
    right: 0;
`

const ProfileSkeleton = () => {
    return (
        <div>
            <Card>
                <ProfileInfo>
                    <FlexBoxCenter style={{flexDirection: 'column', marginTop: '.6rem', position: 'relative'}}>
                        <Skeleton circle={true} width={200} height={200} />
                        <Subtitle><Skeleton width={100} /></Subtitle>
                        <Skeleton width={150} height={25} />
                        <FloatRightContainer>
                            <FakeLink><Skeleton width={60} /></FakeLink>
                            <FakeLink><Skeleton width={60} /></FakeLink>
                        </FloatRightContainer>
                    </FlexBoxCenter>
                </ProfileInfo>
            </Card>
            <CommunityMainSkeleton />
        </div>
    )
}

export default ProfileSkeleton