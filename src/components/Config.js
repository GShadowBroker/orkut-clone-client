import React, { useState } from 'react'
import RawModal from './utils/RawModal'

import {
    Image,
    Input,
    RadioGroup,
    ButtonGroup,
    Button,
    Select,
    ProfileImage,
    ErrorBoxContainer
} from '../styles/layout'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import countries from '../assets/countries.json'
import { RiErrorWarningLine } from 'react-icons/ri'

import { useMutation } from '@apollo/client'
import { EDIT_PROFILE, FIND_USER } from '../services/queries'
import errorHandler from '../utils/errorHandler'
import Notification from './utils/Notification'

const ConfigForm = styled.form`
    overflow-y: auto;
    max-height: 90vh;
    padding-right: 1rem;
`

const ConfigBlock = styled.div`
    display: flex;
    
`

const ImageNameBlock = styled.div`
    
`

const InputControl = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: .8rem 0;
    border-bottom: .3px solid #e3e8f5;
`

const TextArea = styled.textarea`
    width: 100%;
    resize: vertical;
    height: 100px;
    max-height: 200px;
    font-family: inherit;
    border: 1px solid #bebebe;
`

const Config = ({ configOpen, setConfigOpen, toggleConfig, loggedUser }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, watch, errors } = useForm()

    const [editProfile, { loading: loadingSubmission }] = useMutation(EDIT_PROFILE, {
        onError: errors => errorHandler(errors, setErrorMessage),
        refetchQueries: [
            { query: FIND_USER, variables: { userId: loggedUser.id } }
        ]
    })

    const validateBirthdate = (value) => {
        if (new Date(value) >= (new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 5)) return false
        else if (new Date(value) <= new Date('1900-01-01')) return false
        return true
    }

    const handleCancel = (e) => {
        e.preventDefault()
        toggleConfig()
    }

    const onSubmit = data => {
        console.table(data)
        const { name, born, country, city, sex, interests, about } = data
        if (!name || !born || !country || !sex) return
        editProfile({
            variables: {
                name,
                born,
                country,
                city,
                sex,
                interests,
                about
            }
        })
    }

    return (
        <RawModal
            title="Configurações do orkut"
            isModalOpen={configOpen}
            setModalOpen={setConfigOpen}
            minWidth={600}
        >
            <ConfigForm onSubmit={ handleSubmit(onSubmit)}>
                { errorMessage && <Notification message={ errorMessage } style={{margin: 0}} /> }
                { errors.name && errors.name.type === "required"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> você deve ter um nome!</span>
                    </ErrorBoxContainer>
                }
                { errors.name && errors.name.type === "minLength"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o seu nome deve ter no mínimo 2 caractéres</span>
                    </ErrorBoxContainer>
                }
                { errors.name && errors.name.type === "maxLength"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o seu nome deve ter no máximo 100 caractéres</span>
                    </ErrorBoxContainer>
                }

                { errors.born && errors.born.type === "required"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> informe a data de nascimento</span>
                    </ErrorBoxContainer>
                }
                { errors.born && errors.born.type === "validate"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> data de nascimento inválida (ou muito improvável ¯\_(ツ)_/¯)</span>
                    </ErrorBoxContainer>
                }

                { errors.country && errors.country.type === "required"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> selectione o país</span>
                    </ErrorBoxContainer>
                }

                { errors.sex && errors.sex.type === "required"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> sexo não selecionado (caso não queira informá-lo, marque a opção 'não informar')</span>
                    </ErrorBoxContainer>
                }

                { errors.interests && errors.interests.type === "maxLength"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> O campo de interesses não pode ultrapassar 100 caractéres</span>
                    </ErrorBoxContainer>
                }
                { errors.about && errors.about.type === "maxLength"
                    && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o campo 'sobre' não pode ultrapassar 2048 caractéres</span>
                    </ErrorBoxContainer>
                }
                
                <ConfigBlock>
                    <ProfileImage url={loggedUser.profile_picture} size={70} />
                    <InputControl style={{marginLeft: '2rem'}}>
                        <label htmlFor="name">nome:</label>
                        <Input 
                            id="name" 
                            name="name" 
                            defaultValue={loggedUser.name} 
                            ref={register({
                                required: true,
                                minLength: 2,
                                maxLength: 100
                            })}
                            invalid={ errors.name }
                        />
                    </InputControl>
                </ConfigBlock>
                <InputControl>
                    <label htmlFor="born">Data de nascimento:</label>
                    <Input 
                        id="born" 
                        name="born" 
                        type="date"
                        defaultValue={loggedUser.born} 
                        ref={register({
                            required: true,
                            validate: validateBirthdate
                        })}
                        invalid={ errors.born }
                    />
                </InputControl>
                <InputControl>
                    <label html="country">País:</label>
                    <Select
                        id="country"
                        name="country"
                        defaultValue={loggedUser.country} 
                        ref={register({ required: true })}
                        invalid={ errors.country }
                    >
                        {
                            countries.map(c => (
                                <option key={ c.ordem } value={ c.nome }>{ c.nome }</option>
                            ))
                        }
                    </Select>
                </InputControl>
                <InputControl>
                    <label htmlFor="city">Cidade:</label>
                    <Input
                        id="city" 
                        name="city" 
                        type="text"
                        defaultValue={loggedUser.city} 
                        ref={ register({ required: false }) }
                        invalid={ errors.city }
                    />
                </InputControl>
                <InputControl>
                    <span>Sexo:</span>
            
                    <RadioGroup style={{margin: '.2rem 0'}}>
                        <input 
                            id="masculino"
                            type="radio"
                            name="sex"
                            value="masculino" 
                            ref={register({required: true})}
                        />
                        <label htmlFor="masculino">masculino</label>
                    </RadioGroup>
                    <RadioGroup style={{margin: '.2rem 0'}}>
                        <input 
                            id="feminino" 
                            type="radio" 
                            name="sex" 
                            value="feminino" 
                            ref={register({required: true})}
                        />
                        <label htmlFor="feminino">feminino</label>
                    </RadioGroup>
                    <RadioGroup style={{margin: '.2rem 0'}}>
                        <input 
                            id="notinformed" 
                            type="radio" 
                            name="sex" 
                            value="notinformed" 
                            ref={register({required: true})}
                        />
                        <label htmlFor="notinformed">não informar</label>
                    </RadioGroup>
                    
                </InputControl>

                <InputControl>
                    <label htmlFor="interests">Interesses:</label>
                    <Input
                        id="interests"
                        name="interests"
                        defaultValue={ loggedUser.interests }
                        ref={register({required: false, maxLength: 100})}
                        invalid={ errors.interests }
                    />
                </InputControl>

                <InputControl>
                    <label htmlFor="about">Sobre você:</label>
                    <TextArea
                        id="about"
                        name="about"
                        defaultValue={ loggedUser.about }
                        ref={register({required: false, maxLength: 2048})}
                        invalid={ errors.about }
                    />
                </InputControl>

                <ButtonGroup>
                    <Button type="submit"><strong>{ loadingSubmission ? 'salvando...' : 'salvar' }</strong></Button>
                    <Button onClick={ handleCancel }>cancelar</Button>
                </ButtonGroup>
            </ConfigForm>

        </RawModal>
    )
}

export default Config