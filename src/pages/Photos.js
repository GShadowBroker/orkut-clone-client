import React from 'react'

import { Link, useParams, useRouteMatch } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { FIND_USER } from '../services/queries'

import { Card, Image} from '../styles/layout'
import { 
    Main,
    MainColumn, 
    ProfileInfo, 
    PhotoList
} from '../styles/profile'

import ProfileLeft from '../components/profile/ProfileLeft'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import Notification from '../components/utils/Notification'

const Photos = ({ crumbs, loggedUser }) => {
    const { userId } = useParams()
    const match = useRouteMatch()

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })

    if (error) return <Notification />
    if (loading) return (
        <h1>loading...</h1>
    )

    const user = data && data.findUser

    return (
        <Main>
            <ProfileLeft user={ user } loggedUser={ loggedUser } />

            <MainColumn stretched>
                <Card style={{ marginTop: '.6rem' }}>
                    <ProfileInfo>
                        <h2>{ user.id === loggedUser.id ? 'Minhas fotos' : `Fotos de ${user.name}`} ({ user.Photos.length })</h2>
                        <Breadcrumbs crumbs={ crumbs } />
                    </ProfileInfo>
                    <ProfileInfo>
                        <PhotoList>
                            {
                                user.Photos.map(photo => (
                                    <div key={ photo.id }>
                                        <Link to={`${match.url}/${photo.id}`} >
                                            <Image url={ photo.url } size="140" />
                                        </Link>
                                    </div>
                                ))
                            }
                        </PhotoList>
                        
                    </ProfileInfo>
                </Card>
            </MainColumn>
        </Main>
    )
}

export default Photos