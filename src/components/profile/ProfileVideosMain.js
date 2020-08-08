import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
    Card,
    Button,
    FlexBoxCenter,
    Form,
    Input,
    ModalInputGroup,
    ModalActionGroup,
    SpinnerButtonContainer,
    ErrorBoxContainer 
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo
} from '../../styles/profile'
import Breadcrumbs from '../utils/Breadcrumbs'
import { AiFillCamera } from 'react-icons/ai'
import RawModal from '../utils/RawModal'
import { useForm } from 'react-hook-form'
import Spinner from 'react-loading'
import { RiErrorWarningLine } from 'react-icons/ri'

import { useMutation } from '@apollo/client'
import { SEND_VIDEO, FIND_USER } from '../../services/queries'

import styled from 'styled-components'

const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5rem;

`

const ProfileVideosMain = ({ loggedUser, user }) => {
    const { userId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { register, handleSubmit, errors } = useForm()

    const [sendVideo, { loading: loadingVideoSubmission }] = useMutation(SEND_VIDEO, {
        onError: errors => console.log(errors),
        refetchQueries: [
            { query: FIND_USER, variables: { userId } }
        ],
        onCompleted: () => toggleModal()
    })

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
    const onSubmit = data => {
        console.log('submitting...', data)
        const { url, description } = data
        
        sendVideo({
            variables: {
                url,
                description
            }
        })
    }

    return (
        <MainColumn stretched>
            <RawModal
                title="Adicionar vídeo"
                isModalOpen={ isModalOpen }
                setModalOpen={ toggleModal }
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    { errors.url && errors.url.type === 'required'
                        && <ErrorBoxContainer>
                            <RiErrorWarningLine className="icenter" />
                            <span> Insira o link do vídeo</span>
                        </ErrorBoxContainer>
                    }
                    { errors.url && errors.url.type === 'maxLength'
                        && <ErrorBoxContainer>
                            <RiErrorWarningLine className="icenter" />
                            <span> Limite de caractéres alcançado para o campo 'link do vídeo' (máx. 255 caractéres)</span>
                        </ErrorBoxContainer>
                    }
                    { errors.description && errors.description.type === 'maxLength'
                        && <ErrorBoxContainer>
                            <RiErrorWarningLine className="icenter" />
                            <span> Limite de caractéres alcançado para o campo 'descrição' (máx. 100 caractéres)</span>
                        </ErrorBoxContainer>
                    }
                    <ModalInputGroup>
                        <label id="videolink"><strong>Link do vídeo:</strong></label>
                        <Input 
                            id="videolink" 
                            name="url"
                            ref={register({required: true, maxLength: 255})}
                            invalid={errors.url}
                        />
                    </ModalInputGroup>
                    <ModalInputGroup>
                        <label id="videodesc"><strong>Breve descrição:</strong></label>
                        <Input 
                            id="videodesc" 
                            name="description"
                            ref={register({maxLength: 100})}
                            invalid={errors.description}
                        />
                    </ModalInputGroup>
                    <ModalActionGroup>
                        { loadingVideoSubmission
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
                        <h2>{ loggedUser.id === userId ? 'Meus Vídeos' : `Vídeos de ${user.name}` } ({ user.Videos && user.Videos.length })</h2>
                    </div>
                    <Breadcrumbs user={ user.name } />
                </ProfileInfo>

                <ProfileInfo>
                    <VideoGrid>
                        {
                            user.Videos.length > 0
                            ? user.Videos.map(v =>
                                <FlexBoxCenter key={ v.id } style={{width: '100%', minHeight: 250}}>
                                    <iframe title={ v.description } height="200" src={ v.url.replace("watch?v=", "embed/") } frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </FlexBoxCenter>
                            )
                            : null
                        }
                        { user.Videos.length === 0 && <p style={{color: "#afafaf", paddingTop: '.5rem'}}>Nenhum vídeo</p> }
                    </VideoGrid>
                </ProfileInfo>

                { loggedUser.id === user.id &&
                    (<ProfileInfo style={{ marginBottom: '1rem' }}>
                        <div>
                            <Button onClick={ toggleModal }>
                                <FlexBoxCenter>
                                    <AiFillCamera />
                                    <strong style={{ marginLeft: '.2rem' }}>Adicionar vídeo</strong>
                                </FlexBoxCenter>
                            </Button>
                        </div>
                    </ProfileInfo>)}
            </Card>
        </MainColumn>
    )
}

export default ProfileVideosMain