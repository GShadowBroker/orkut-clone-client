import React from 'react'
import { Main } from '../../styles/profile'

import ProfileLeftSkeleton from './ProfileLeftSkeleton'
import ProfileMainSkeleton from './ProfileMainSkeleton'
import ProfileRightSkeleton from './ProfileRightSkeleton'

const ProfileSkeleton = () => {
    return (
        <Main>
            <ProfileLeftSkeleton />
            <ProfileMainSkeleton />
            <ProfileRightSkeleton />
        </Main>
    )
}

export default ProfileSkeleton