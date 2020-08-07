import React, { useState } from 'react'
import {
    RegisterContainer,
    FormRegister,
    RegisterInputGroup,
    LabelControl,
    InputControl
} from '../styles/auth'
import {
    Input,
    Select,
    Button,
    ButtonGroup,
    SpinnerButtonContainer,
    ErrorBoxContainer
} from '../styles/layout'
import Spinner from 'react-loading'
import { RiErrorWarningLine } from 'react-icons/ri'
import CreateCommunitySkeleton from '../components/skeletons/CreateCommunitySkeleton'

import Notification from '../components/utils/Notification'
import errorHandler from '../utils/errorHandler'
import Breadcrumbs from '../components/utils/Breadcrumbs'

import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_CATEGORIES, CREATE_NEW_COMMUNITY, FIND_USER } from '../services/queries'
import languages from '../assets/languages'
import countries from '../assets/countries.json'

import { useForm } from 'react-hook-form'

import styled from 'styled-components'

const VerticalRadio = styled.div`
    display: flex;
    flex-direction: column;
    padding: .2rem;
`
const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    padding: 0 .2rem .2rem .2rem !important;

    input {
        margin: 0;
        margin-right: .2rem;
    }
`
const TextAreaDescription = styled.textarea`
    width: 60%;
    resize: vertical;
    height: 200px;
    max-height: 400px;
    font-family: inherit;
    border: 1px solid #bebebe;
`

const CreateCommunity = ({ loggedUser }) => {
    const history = useHistory()
    const [errors, setErrors] = useState('')

    const { register, handleSubmit, watch, errors: formErrors } = useForm()

    // Fields
    const [picture, setPicture] = useState('')
    const [picturePreview, setPicturePreview] = useState('')

    const {error, loading, data} = useQuery(GET_ALL_CATEGORIES)
    const [createNewCommunity, { loading: loadingCommunityCreation }] = useMutation(CREATE_NEW_COMMUNITY, {
        onError: error => errorHandler(error, setErrors),
        onCompleted: data => {
            if (!data ) return
            history.push(`/comunidades/${data.createCommunity.id}`)
        },
        refetchQueries: [
            { query: FIND_USER, variables: { userId: loggedUser.id } }
        ]
    })

    const validateCategory = (value) => {
        if (value === '0') return false
        return true
    }

    const onSubmit = data => {
        console.table(data)
        const { title, category, type, language, country, description } = data
        createNewCommunity({
            variables: {
                title,
                categoryId: category,
                type,
                language,
                country,
                picture: picturePreview,
                description
            }
        })
    }

    const handleFileUpload = e => {
        const file = e.target.files[0]
        setPicture(e.target.value)

        if (!file) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPicturePreview(reader.result)
        }
    }

    if (error) return <Notification />
    if (loading) return <CreateCommunitySkeleton />

    const categories = data && data.allCategories

    return (
        <div>
            <RegisterContainer>
                <h1>Criar comunidade</h1>
                <Breadcrumbs keepAllCrumbs={ true } />
                <FormRegister onSubmit={ handleSubmit(onSubmit) }>
                    { errors && <Notification title="Erro" message={ errors } margin="0" />}
                    { formErrors.title && formErrors.title.type === 'required'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> o nome é obrigatório</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.title && formErrors.title.type === 'maxLength'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> o nome deve ter no máximo 100 caractéres</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.category && formErrors.category.type === 'required'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> escolha uma categoria</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.category && formErrors.category.type === 'validate'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> escolha uma categoria</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.type && formErrors.type.type === 'required'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> selecione o tipo da comunidade (pública ou privada)</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.language && formErrors.language.type === 'required'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> selecione o idioma</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.country && formErrors.country.type === 'required'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> selecione o país</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.description && formErrors.description.type === 'maxLength'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> sua descrição deve ter no máximo 2048 caractéres</span>
                            </ErrorBoxContainer>
                    }
                    { formErrors.picture && formErrors.picture.type === 'required'
                        && <ErrorBoxContainer>
                                <RiErrorWarningLine className="icenter" />
                                <span> selecione uma imagem para a comunidade</span>
                            </ErrorBoxContainer>
                    }
                    <RegisterInputGroup>
                        <LabelControl>
                            <label htmlFor="title">nome:</label>
                        </LabelControl>
                        <InputControl>
                            <Input 
                                id="title"
                                name="title"
                                ref={ register({
                                    required: true,
                                    maxLength: 100
                                }) }
                                invalid={ formErrors.title }
                                type="text"
                            />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label htmlFor="category">categoria:</label>
                        </LabelControl>
                        <InputControl>
                            <Select
                                id="category"
                                name="category"
                                defaultValue="0"
                                ref={ register({
                                    required: true,
                                    validate: validateCategory
                                }) }
                                invalid={ formErrors.category }
                            >
                                <option value="0">escolher...</option>
                                {
                                    categories.map(c => (
                                        <option key={ c.id } value={ c.id }>{ c.title }</option>
                                    ))
                                }
                            </Select>
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <span>tipo:</span>
                        </LabelControl>
                        <VerticalRadio>
                            <RadioGroup>
                                <Input id="public" type="radio" name="type" value="público" ref={ register({ required: true })} invalid={ formErrors.type } />
                                <label htmlFor="public">pública - qualquer pessoa pode ver o conteúdo da comunidade</label>
                            </RadioGroup>
                            <RadioGroup>
                                <Input id="private" type="radio" name="type" value="privado" ref={ register({ required: true })} invalid={ formErrors.type } />
                                <label htmlFor="private">privada - apenas membros podem ver o conteúdo da comunidade</label>
                            </RadioGroup>
                        </VerticalRadio>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label htmlFor="language">idioma:</label>
                        </LabelControl>
                        <InputControl>
                            <Select
                                id="language"
                                name="language"
                                defaultValue="Português"
                                ref={ register({ required: true })}
                                invalid={ formErrors.language }
                            >
                                {
                                    languages.map((l, index) => (
                                        <option key={ index } value={ l }>{ l }</option>
                                    ))
                                }
                            </Select>
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label htmlFor="country">país:</label>
                        </LabelControl>
                        <InputControl>
                            <Select
                                id="country"
                                name="country"
                                defaultValue="Brasil"
                                ref={ register({ required: true })}
                                invalid={ formErrors.country }
                            >
                                {
                                    countries.map(c => (
                                        <option key={ c.ordem } value={ c.nome }>{ c.nome }</option>
                                    ))
                                }
                            </Select>
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label htmlFor="picture">imagem:</label>
                        </LabelControl>
                        <InputControl>
                            <Input 
                                id="picture"
                                name="picture"
                                type="file"
                                accept="image/*"
                                value={picture} 
                                onChange={ handleFileUpload }
                                ref={ register({ required: true }) }
                                invalid={ formErrors.picture }
                            />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label htmlFor="description">descrição:</label>
                        </LabelControl>
                        <InputControl style={{flexDirection: 'column', alignItems: 'end'}}>
                            <TextAreaDescription 
                                id="description"
                                name="description"
                                type="text" 
                                ref={ register({ maxLength: 2048 })}
                                invalid={ formErrors.description }
                            />
                            <p>seu texto contém { (watch("description") && watch("description").length) || 0 } caractéres</p>
                        </InputControl>
                        
                    </RegisterInputGroup>

                    <ButtonGroup>
                        <Button type="submit" disabled={ loadingCommunityCreation }>
                        {
                            loadingCommunityCreation
                            ? (<SpinnerButtonContainer minwidth={228}>
                                    <Spinner type="spokes" color="#34495e" height='15px' width='15px' /><span style={{marginLeft: '.5rem'}}>criando comunidade</span>
                                </SpinnerButtonContainer>)
                            : <strong>criar comunidade</strong>
                        }
                        </Button>
                    </ButtonGroup>
                </FormRegister>
            </RegisterContainer>
        </div>
    )
}

export default CreateCommunity