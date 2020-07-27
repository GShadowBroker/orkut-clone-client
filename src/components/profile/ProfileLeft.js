import React, { useState, useRef } from 'react'
import {
    Card,
    Badge,
    FakeLink,
    Subtitle,
    Image
} from '../../styles/layout'
import {
    LeftColumn,
    ProfileImage,
    ProfileMenu,
    ChangeImageTag
} from '../../styles/profile'
import { Link, useLocation } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE_PICTURE, FIND_USER, FETCH_FEED } from '../../services/queries'

import { BsStar } from 'react-icons/bs'
import { AiFillCamera } from 'react-icons/ai'

import Modal from '../utils/Modal'

const ProfileLeft = ({ user, loggedUser, handleSendRequest, handleUnfriend }) => {
    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const uploadForm = useRef(null)
    const [selectedFile, setSelectedFile] = useState('')
    const [fileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState('')

    const [updateProfilePicture, { loading }] = useMutation(UPDATE_PROFILE_PICTURE, {
        onError: error => console.log(error),
        refetchQueries: [
            { query: FIND_USER, variables: { userId: loggedUser.id } },
            { query: FETCH_FEED, variables: { limit: 10 } }
        ],
        onCompleted: () => handleModal(false)
    })

    const handleImageClick = e => {
        e.preventDefault()
        if (user.id !== loggedUser.id) return
        uploadForm.current.click()
    }

    const handleFileUpload = e => {
        const file = e.target.files[0]
        setSelectedFile(file)
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
            handleModal(true)
        }
    }

    const handleSubmitFile = e => {
        e.preventDefault()

        if (!previewSource) return

        uploadImage(previewSource)
    }

    const uploadImage = (base64EncodedImage) => {
        updateProfilePicture({
            variables: {
                newPhoto: base64EncodedImage
            }
        })
    }

    const handleModal = (bool) => {
        if (bool) {
            document.querySelector('body').style.overflowY = 'hidden'
        } else {
            document.querySelector('body').style.overflowY = ''
        }
        setIsModalOpen(bool)
    }

    return (
        <LeftColumn>
            {
                user.id === loggedUser.id
                ? (<ProfileImage
                        url={ user.profile_picture } 
                        onClick={ handleImageClick }
                        pointer
                    >
                        <ChangeImageTag>
                            <FakeLink><AiFillCamera className="icenter" /> alterar foto</FakeLink>
                        </ChangeImageTag>
                    </ProfileImage>)
                : <ProfileImage url={ user.profile_picture } />
            }
            <form style={{ display: 'none' }} onSubmit={ handleSubmitFile }>
                <input 
                    ref={ uploadForm } 
                    type="file" 
                    name="image" 
                    value={ fileInputState }
                    onChange={ handleFileUpload }
                />
            </form>

            <Modal 
                title="Pré-visualização"
                action={ handleSubmitFile }
                actionLabel="salvar"
                cancel={ () => handleModal(false) }
                cancelLabel="cancelar"
                isModalOpen={ isModalOpen } 
                setModalOpen={ (bool) => handleModal(bool) }
                loading={ loading }
            >
                <div style={{ display: 'flex' }}>
                    <Image
                        size={ 200 } 
                        url={ previewSource } 
                        style={{ marginRight: '1rem' }}
                    />
                    <div>
                        <p><strong>tamanho: </strong>{ selectedFile.size } bytes</p>
                        <p><strong>tipo: </strong>{ selectedFile.type }</p>
                    </div>
                </div>
            </Modal>
            
            <ProfileMenu>
                <Card>
                    <ProfileMenu>
                        <Subtitle>{ user.name }</Subtitle>
                        <ul>
                            <li className="vibes">
                                <FakeLink>{user.id === loggedUser.id ? '0 vibes' : 'vibes? 0'}</FakeLink>
                                <Badge><BsStar style={{ fontSize: '1.2em', marginRight: '.2rem' }} />0</Badge>
                            </li>
                            <Link to={ `/perfil/${user.id}/atualizacoes` }>
                                <li className={ location.pathname === `/perfil/${user.id}/atualizacoes` ? 'active' : '' }>
                                    <span>
                                        {user.id === loggedUser.id ? 'minhas atualizações' : 'atualizações'}
                                    </span>
                                    <Badge>{ user.Posts.length > 0 && user.Posts.length }</Badge>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}` }>
                                <li className={ location.pathname === `/perfil/${user.id}` ? 'active' : '' }>
                                    <span>perfil</span>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}/scraps` }>
                                <li className={ location.pathname === `/perfil/${user.id}/scraps` ? 'active' : '' }>
                                    <span>scraps</span><Badge>{ user.Scraps.length > 0 && user.Scraps.length }</Badge>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}/fotos` }>
                                <li className={ location.pathname === `/perfil/${user.id}/fotos` ? 'active' : '' }>
                                    <span>fotos</span><Badge>{ user.Photos.length > 0 && user.Photos.length }</Badge>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}/videos` }>
                                <li className={ location.pathname === `/perfil/${user.id}/videos` ? 'active' : '' }>
                                    <span>videos</span><Badge></Badge>
                                </li>
                            </Link>
                            <Link to={ `/perfil/${user.id}/depoimentos` }>
                                <li className={ location.pathname === `/perfil/${user.id}/depoimentos` ? 'active' : '' }>
                                    <span>depoimentos</span><Badge>{ user.Testimonials.length > 0 && user.Testimonials.length }</Badge>
                                </li>
                            </Link>
                        </ul>
                        <h3>Actions</h3>
                        <ul>
                            {
                                user.Friends.find(u => u.id === loggedUser.id)
                                    ? <li onClick={ () => handleUnfriend(user) }><FakeLink><strong>desfazer amizade</strong></FakeLink></li>
                                    : (user.Requesters.find(u => u.id === loggedUser.id))
                                        ? <li className="disabled">solicitação enviada</li>
                                        : <li onClick={ () => handleSendRequest(user) }><FakeLink><strong>Adicionar como amigo</strong></FakeLink></li>
                            }
                            <li><FakeLink>Ignorar usuário</FakeLink></li>
                            <li><FakeLink>Reportar abuso</FakeLink></li>
                        </ul>
                    </ProfileMenu>
                </Card>
            </ProfileMenu>
        </LeftColumn>
    )
}

export default ProfileLeft