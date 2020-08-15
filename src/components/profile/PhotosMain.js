import React, { useState } from 'react'

import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_PHOTOS, REMOVE_ALBUM, GET_USER_ALBUNS, UPLOAD_NEW_PHOTOS, FIND_USER } from '../../services/queries'

import { 
    Card, 
    Image, 
    FakeLink, 
    ShowMore, 
    Button,
    FlexBoxCenter,
    Form,
    Input,
    ModalInputGroup,
    ModalActionGroup,
    SpinnerButtonContainer
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    PhotoList,
    InlineHeader
} from '../../styles/profile'
import { TiArrowSortedDown } from 'react-icons/ti'
import { AiFillCamera } from 'react-icons/ai'

import Notification from '../utils/Notification'
import Skeleton from 'react-loading-skeleton'
import Breadcrumbs from '../utils/Breadcrumbs'
import errorHandler from '../../utils/errorHandler'
import Spinner from 'react-loading'

import RawModal from '../utils/RawModal'
import styled from 'styled-components'
import GoBack from './GoBack'

const PreviewImageGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => props.mobile ? '80px 80px 80px' : '80px 80px 80px 80px'};
    grid-gap: .5rem;

    div {
        min-height: 80px;
        border: .5px solid #afafaf;
        border-style: dashed;
    }
`

const PhotosMain = ({ user, loggedUser, albuns, mobile }) => {
    const { userId, folderId } = useParams()
    const match = useRouteMatch()
    const history = useHistory()

    const [offset] = useState(0)
    const [limit, setLimit ] = useState(10)
    const [errors, setErrors] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Image Upload
    const [preview, setPreview] = useState([])

    const handleFileUpload = e => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        if (!file) return
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreview([...preview, reader.result])
        }
    }

    // Hooks
    const { error: errorPhotos, loading: loadingPhotos, data: dataPhotos, fetchMore } = useQuery(GET_USER_PHOTOS, {
        variables: { userId, folderId, limit, offset }
    })
    const [removeAlbum, { loading: loadingAlbumRemoval }] = useMutation(REMOVE_ALBUM, {
        onError: error => errorHandler(error, setErrors),
        onCompleted: () => history.push(`/perfil/${userId}/albuns`),
        refetchQueries: [
            { query: GET_USER_ALBUNS, variables: { userId } }
        ]
    })
    const [uploadNewPhotos, { loading: loadingUpload }] = useMutation(UPLOAD_NEW_PHOTOS, {
        onError: error => errorHandler(error, setErrors),
        onCompleted: () => {
            toggleModal()
            setPreview([])
        },
        refetchQueries: [
            { query: FIND_USER, variables: { userId } },
            { query: GET_USER_ALBUNS, variables: { userId } },
            { query: GET_USER_PHOTOS, variables: { userId, folderId, limit, offset } }
        ]
    })

    const handleAlbumDelete = () => {
        const question = window.confirm('Tem certeza de que deseja excluir este álbum e todo o seu conteúdo?')
        if (!question) return
        removeAlbum({
            variables: {
                folderId
            }
        })
    }

    const toggleModal = () => {
        if (isModalOpen) {
            document.querySelector('body').style.overflowY = ''
            setIsModalOpen(false)
        } else {
            document.querySelector('body').style.overflowY = 'hidden'
            setIsModalOpen(true)
        }
    }
    const handleCancel = e => {
        e.preventDefault()
        toggleModal()
    }
    const onSubmit = e => {
        e.preventDefault()
        console.log('submitting...', preview)
        if (preview.length < 1) return
        uploadNewPhotos({
            variables: {
                photos: preview,
                folderId
            }
        })
    }

    if (errorPhotos) return <Notification />

    const photos = dataPhotos && dataPhotos.findPhotos.rows
    const photoCount = dataPhotos && dataPhotos.findPhotos.count
    const album = albuns.find(a => a.id === folderId) || null

    return (
        <MainColumn stretched>
            { errors && <Notification message={errors} /> }
            { mobile && <GoBack user={user} /> }
            <RawModal
                title="Adicionar fotos"
                isModalOpen={ isModalOpen }
                setModalOpen={ toggleModal }
            >
                { preview.length > 0 && (
                    <InlineHeader>
                        <p><strong>fotos adicionadas ({ preview.length }):</strong></p>
                        <FakeLink onClick={ () => setPreview([]) }>limpar</FakeLink>
                    </InlineHeader>
                )}
                <PreviewImageGrid mobile={ mobile }>
                    { preview.length > 0
                        ? preview.map((i, index) => <Image key={index} url={i} size={80} />)
                            .concat(Array.from(Array((8 - preview.length) || 1).keys()).map((i, index) => <div key={index}></div>))
                        : Array.from(Array(8).keys()).map((i, index) => <div key={index}></div>)
                    }
                </PreviewImageGrid>
                <Form onSubmit={onSubmit}>
                    <ModalInputGroup>
                        <label htmlFor="newphoto"><strong>selecione uma foto ou mais:</strong></label>
                        <Input
                            id="newphoto" 
                            type="file" 
                            accept="image/*"
                            name="image"
                            onChange={ handleFileUpload }
                        />
                    </ModalInputGroup>
                    <ModalActionGroup>
                        {loadingUpload
                            ? <Button disabled>
                                <SpinnerButtonContainer minwidth={100}>
                                    <Spinner type="spokes" color="#34495e" height='15px' width='15px' /><span style={{marginLeft: '.5rem'}}>salvando...</span>
                                </SpinnerButtonContainer>
                            </Button>
                            : <Button type="submit"><strong>salvar</strong></Button>
                        }
                        <Button onClick={handleCancel}>cancelar</Button>
                    </ModalActionGroup>
                </Form>
            </RawModal>

            <Card>
                <ProfileInfo>
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}>
                        <h2>{ `${ album && album.title }` } ({ album && album.Photos.length })</h2>
                        { loggedUser.id === user.id &&
                            <FakeLink onClick={ handleAlbumDelete }>
                                {
                                    loadingAlbumRemoval
                                    ? <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                    : 'excluir álbum'
                                }
                            </FakeLink>
                        }
                    </div>
                    
                    <Breadcrumbs user={ user.name } />
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
                                    <div key={ photo.id }>
                                        <Link to={`${match.url}/${photo.id}`} >
                                            <Image url={ photo.url } size="140" />
                                        </Link>
                                    </div>
                                    
                                ))
                            }
                            { photos.length === 0 && <span style={{color: "grey"}}>Nenhuma foto</span> }
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

                { loggedUser.id === user.id &&
                    (<ProfileInfo style={{ marginBottom: '1rem' }}>
                        <div>
                            <Button onClick={ toggleModal }>
                                <FlexBoxCenter>
                                    <AiFillCamera />
                                    <strong style={{ marginLeft: '.2rem' }}>Adicionar fotos</strong>
                                </FlexBoxCenter>
                            </Button>
                        </div>
                    </ProfileInfo>)}
            </Card>
        </MainColumn>
    )
}

export default PhotosMain