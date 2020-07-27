import React, { useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { FIND_USER } from '../services/queries'

import { Card } from '../styles/layout'
import { 
    Main,
    MainColumn, 
    ProfileInfo,
    PhotoContainer,
    ImageContain,
    ImageArrow
} from '../styles/profile'

import ProfileLeft from '../components/profile/ProfileLeft'
import Breadcrumbs from './utils/Breadcrumbs'
import ImageModal from './utils/ImageModal'
import Error404 from '../pages/404Error'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Photo = ({ crumbs, loggedUser }) => {
    const { userId, photoId } = useParams()
    const history = useHistory()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })

    if (error) return (
        <h1>Woops! There was an error.</h1>
    )
    if (loading) return (
        <h1>loading...</h1>
    )

    const user = data && data.findUser
    const photos = [...user.Photos].reverse()
    const photo = user && photos.find(p => p.id === photoId)
    const prevPhoto = user && photos[photos.indexOf(photo) - 1]
    const nextPhoto = user && photos[photos.indexOf(photo) + 1]

    if (!photo) return <Error404 />

    const handleModal = (bool) => {
        if (bool) {
            document.querySelector('body').style.overflowY = 'hidden'
        } else {
            document.querySelector('body').style.overflowY = ''
        }
        setIsModalOpen(bool)
    }

    return (
        <Main>
            <ImageModal isModalOpen={ isModalOpen } setModalOpen={ (bool) => handleModal(bool) }>
                <img src={ photo.url } alt={ photo.description } onClick={ () => handleModal(false) } />
            </ImageModal>

            <ProfileLeft user={ user } loggedUser={ loggedUser } />

            <MainColumn stretched>
                <Card>
                    <ProfileInfo>
                        <h2>{ user.id === loggedUser.id ? 'Minhas fotos' : `Fotos de ${user.name}`} ({ user.Photos.length })</h2>
                        <Breadcrumbs crumbs={ crumbs } />
                        <p>Mostrando <strong>{ [...user.Photos].reverse().indexOf(photo) + 1 }</strong> de <strong>{ user.Photos.length }</strong> fotos</p>
                    </ProfileInfo>
                    <PhotoContainer>
                        { prevPhoto ? (
                            <ImageArrow onClick={ () => history.push(`/perfil/${user.id}/fotos/${prevPhoto.id}`) }>
                                <IoIosArrowBack className="arrow-icon" />
                            </ImageArrow>)
                            : (<ImageArrow disabled>
                                    <IoIosArrowBack className="arrow-icon" />
                                </ImageArrow>)
                        }
                        <ImageContain url={ photo.url } onClick={ () => handleModal(true) } />
                        { nextPhoto ? (
                            <ImageArrow onClick={ () => history.push(`/perfil/${user.id}/fotos/${nextPhoto.id}`) }>
                                <IoIosArrowForward className="arrow-icon" />
                            </ImageArrow>)
                            : (<ImageArrow disabled>
                                    <IoIosArrowForward className="arrow-icon" />
                                </ImageArrow>)
                        }
                    </PhotoContainer>
                    <ProfileInfo>
                        <p style={{textAlign: 'center'}}>{ photo.description }</p>
                    </ProfileInfo>
                    
                    <ProfileInfo>

                    </ProfileInfo>
                </Card>
            </MainColumn>
        </Main>
    )
}

export default Photo