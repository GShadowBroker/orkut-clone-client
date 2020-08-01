import React, { useState } from 'react'

import { Link, useParams, useRouteMatch } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { FIND_USER, GET_USER_PHOTOS } from '../../services/queries'

import { Card, Image, FakeLink, ShowMore } from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    PhotoList
} from '../../styles/profile'
import { TiArrowSortedDown } from 'react-icons/ti'

import Notification from '../utils/Notification'
import Skeleton from 'react-loading-skeleton'

const PhotosMain = ({ crumbs, loggedUser }) => {
    const { userId } = useParams()
    const match = useRouteMatch()
    const [offset] = useState(0)
    const [limit, setLimit ] = useState(10)

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })

    const { error: errorPhotos, loading: loadingPhotos, data: dataPhotos, fetchMore } = useQuery(GET_USER_PHOTOS, {
        variables: { userId, limit, offset }
    })

    if (error || errorPhotos) return <Notification />
    if (loading) return (
        <h1>loading...</h1>
    )

    const user = data && data.findUser
    const photos = dataPhotos && dataPhotos.findPhotos.rows
    const photoCount = dataPhotos && dataPhotos.findPhotos.count

    return (
        <MainColumn stretched>
            <Card>
                <ProfileInfo>
                    <h2>{ user.id === loggedUser.id ? 'Minhas fotos' : `Fotos de ${user.name}`} ({ user.Photos.length })</h2>
                    {/* <Breadcrumbs crumbs={ crumbs } /> */}
                </ProfileInfo>
                {
                    loadingPhotos
                    ? (
                        <ProfileInfo>
                            <PhotoList>
                                {
                                    Array.from(Array(limit).keys()).map((s, i) => (
                                        <Skeleton height={150} key={ i } />
                                    ))
                                }
                            </PhotoList>
                        </ProfileInfo>    
                    )
                    : (<ProfileInfo>
                        <PhotoList>
                            {
                                photos.map(photo => (
                                    <Link key={ photo.id } to={`${match.url}/${photo.id}`} >
                                        <Image url={ photo.url } size="140" />
                                    </Link>
                                ))
                            }
                        </PhotoList>
                        <ShowMore>
                            { photos.length < photoCount && (
                                <FakeLink
                                    onClick={ () => {
                                        fetchMore({
                                            variables: {
                                                limit: limit + 10
                                            }
                                        })
                                        setLimit(limit + 10)
                                    } }
                                ><TiArrowSortedDown className="icenter" /> ver mais</FakeLink>)}
                        </ShowMore>
                    </ProfileInfo>)
                }
            </Card>
        </MainColumn>
    )
}

export default PhotosMain