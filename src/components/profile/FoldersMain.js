import React from 'react'

import { Link, useParams, useRouteMatch } from 'react-router-dom'

import {
    Card,
    Button,
    Form,
    Input,
    ErrorBoxContainer,
    ModalInputGroup,
    ModalActionGroup,
    RadioGroup
 } from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo
} from '../../styles/profile'

import { RiErrorWarningLine } from 'react-icons/ri'
import Breadcrumbs from '../utils/Breadcrumbs'
import RawModal from '../utils/RawModal'
import { useForm } from 'react-hook-form'
import GoBack from './GoBack'

import styled from 'styled-components'

const AlbumGrid = styled.div`
    /* padding: 0 .8rem;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; */
    display: flex;
    flex-wrap: wrap;
`

const AlbumContainer = styled.div`
    position: relative;
    min-height: 250px;
    flex-grow: 1;
    padding: .8rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const AlbumItem = styled.div`
    z-index: 3;
    height: 180px;
    width: 150px;
    margin: .8rem 0;

    background-image: url(${ props => props.url });
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    border: solid #ffff;
    box-shadow: 2px 2px 4px #bebebe;
    transform: rotate(0deg);
`
const AlbumItemBackground = styled.div`
    z-index: ${props => props.zindex};
    position: absolute;

    height: 180px;
    width: 150px;
    border: solid #ffff;
    box-shadow: 2px 2px 4px #bebebe;
    transform: rotate(${props => props.deg}deg);
`

const FoldersMain = ({
    loggedUser, 
    user, 
    albuns, 
    getAlbumCount, 
    createNewAlbum, 
    loadingAlbumCreation, 
    isModalOpen, 
    handleModal,
    mobile
}) => {
    const { userId } = useParams()
    const match = useRouteMatch()
    const { register, handleSubmit, watch, errors: formErrors } = useForm()

    const onSubmit = data => {
        const { title, visible_to_all } = data
        createNewAlbum({
            variables: {
                title,
                visible_to_all: !!visible_to_all
            }
        })
    }
    const cancelModal = e => {
        e.preventDefault()
        handleModal()
    }

    const isFriend = loggedUser.Friends.map(f => f.id).indexOf(userId) >= 0
    const meOrFriend = (loggedUser.id === userId) || isFriend
    
    return (
        <MainColumn stretched>
            { mobile && <GoBack user={user} /> }
            <RawModal
                title="Criar novo álbum de fotos"
                isModalOpen={ isModalOpen }
                setModalOpen={ handleModal }
            >
                <Form onSubmit={ handleSubmit(onSubmit) }>
                    { formErrors.title && formErrors.title.type === "required"
                        ? (<ErrorBoxContainer>
                            <RiErrorWarningLine className="icenter" />
                            <span> Dê um nome ao álbum</span>
                        </ErrorBoxContainer>)
                        : null
                    }
                    { formErrors.title && formErrors.title.type === "maxLength"
                        ? (<ErrorBoxContainer>
                            <RiErrorWarningLine className="icenter" />
                            <span> O nome do álbum não precisa ser tão longo!</span>
                        </ErrorBoxContainer>)
                        : null
                    }
                    { formErrors.visible_to_all && formErrors.visible_to_all.type === "required"
                        ? (<ErrorBoxContainer>
                            <RiErrorWarningLine className="icenter" />
                            <span> Selecione o nível de visibilidade do álbum</span>
                        </ErrorBoxContainer>)
                        : null
                    }
                    <ModalInputGroup>
                        <label htmlFor="title"><strong>Nome do álbum:</strong></label>
                        <Input
                            id="title"
                            name="title"
                            ref={register({ required: true, maxLength: 100 })}
                            invalid={ formErrors.title }
                        />
                        <span style={{
                            color: watch("title") && (watch("title").length >= 100) ? "#c0392b" : "#afafaf",
                            marginTop: ".2rem"
                        }}>
                            { watch("title") ? watch("title").length : 0 }/100
                        </span>
                    </ModalInputGroup>
                    <ModalInputGroup>
                        <span><strong>Privacidade:</strong></span>
                        <div style={{padding: '.2rem 0'}}>
                            <RadioGroup>
                                <Input
                                    id="v_all"
                                    type="radio" 
                                    name="visible_to_all" 
                                    value="true" 
                                    ref={ register({ required: true }) }
                                />
                                <label htmlFor="v_all">visível para todos</label>
                            </RadioGroup>
                            <RadioGroup>
                                <Input 
                                    id="v_friends" 
                                    type="radio" 
                                    name="visible_to_all" 
                                    value="false" 
                                    ref={ register({ required: true }) }
                                />
                                <label htmlFor="v_friends">visível apenas para amigos</label>
                            </RadioGroup>
                        </div>
                    </ModalInputGroup>
                    <ModalActionGroup>
                        <Button type="submit" disabled={loadingAlbumCreation}>
                            <strong>{loadingAlbumCreation ? 'criando...' : 'criar álbum'}</strong>
                        </Button>
                        <Button onClick={cancelModal}>cancelar</Button>
                    </ModalActionGroup>
                </Form>
            </RawModal>

            <Card>
                <ProfileInfo style={{marginBottom: '.5rem'}}>
                    <h2>{ user.id === loggedUser.id ? 'Meus álbuns' : `Álbuns de ${user.name}`} ({ getAlbumCount() })</h2>
                    <Breadcrumbs user={ user.name } />
                    { user.id === loggedUser.id
                        && (<div style={{margin: '1rem 0'}}>
                                <Button onClick={ handleModal }><strong>Criar um álbum</strong></Button>
                            </div>)
                    }
                </ProfileInfo>

                <ProfileInfo>
                    { albuns.length > 0
                        ? (<AlbumGrid>
                            { albuns.map(a => {
                                if (a.visible_to_all || (!a.visible_to_all && meOrFriend)) return (
                                    
                                        <AlbumContainer key={a.id}>
                                            <Link to={`${match.url}/${a.id}/fotos`} style={{textAlign: 'center'}}>
                                                <AlbumItem url={ (a.Photos[0] && a.Photos[0].url) } />
                                                <span>{ a.title } ({ a.Photos.length })</span>
                                            </Link>
                                        </AlbumContainer>
                                    
                                )
                                return null
                            }
                                
                            )}
                        </AlbumGrid>)
                        : <AlbumGrid><p style={{color: '#afafaf'}}>Nenhum álbum</p></AlbumGrid>
                    }
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default FoldersMain