import React from 'react'

import {
    Card
 } from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo
} from '../../styles/profile'

import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

const AlbumGrid = styled.div`
    padding: 0 .8rem;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

const FoldersMain = () => {
    return (
        <MainColumn stretched>
            <Card>
                <ProfileInfo style={{marginBottom: '.5rem'}}>
                    <h2><Skeleton width={ 200 } /></h2>
                    <Skeleton width={ 200 } />
                    <div style={{margin: '1rem 0'}}>
                        <Skeleton width={ 200 } height={25} />
                    </div>
                </ProfileInfo>

                <AlbumGrid style={{minHeight: 400}}>
                </AlbumGrid>
            </Card>
        </MainColumn>
    )
}

export default FoldersMain