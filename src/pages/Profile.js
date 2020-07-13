import React from 'react'
import {
    Main
} from '../styles/profile'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_USER } from '../services/queries'
import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileMain from '../components/profile/ProfileMain'
import ProfileRight from '../components/profile/ProfileRight'

const Profile = () => {
    const { userId } = useParams()
    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })

    if (error) return (
        <h1>Woops! There was an error.</h1>
    )
    if (loading) return (
        <h1>loading...</h1>
    )

    const user = data ? data.findUser : null;

    return (
        <Main>
            <ProfileLeft user={ user } />
            <ProfileMain user={ user } />
            <ProfileRight user={ user } />
        </Main>
    )
}

export default Profile