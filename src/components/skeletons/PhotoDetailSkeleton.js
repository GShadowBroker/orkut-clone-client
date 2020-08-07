import React from 'react'
import {
    Card
} from '../../styles/layout'
import {
    MainColumn, 
    ProfileInfo,
    PhotoContainer
} from '../../styles/profile'
import Skeleton from 'react-loading-skeleton'

const PhotoDetail = () => {
    return (
        <MainColumn stretched>
            <Card>
                <ProfileInfo>
                    <h2><Skeleton width={200} /></h2>
                    
                    <Skeleton width={300} />

                    <p><Skeleton width={150} /></p>
                </ProfileInfo>
                <PhotoContainer style={{justifyContent: 'center'}}>
                    <Skeleton width={400} height={500} />
                </PhotoContainer>
            </Card>
        </MainColumn>
    )
}

export default PhotoDetail