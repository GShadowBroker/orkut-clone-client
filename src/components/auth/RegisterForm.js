import React, { useState } from 'react'
import {
    Input,
    Select, 
    Button, 
    ButtonGroup, 
    SpinnerButtonContainer, 
    ErrorBoxContainer 
} from '../../styles/layout'
import {
    FakeLinkLogin,
    FormRegister,
    RegisterInputGroup,
    LabelControl,
    InputControl
} from '../../styles/auth'
import countries from '../../assets/countries.json'

import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../../services/queries'

import Spinner from 'react-loading'
import { RiErrorWarningLine } from 'react-icons/ri'

import Notification from '../utils/Notification'
import errorHandler from '../../utils/errorHandler'

import { useForm } from 'react-hook-form'

const RegisterForm = ({ setAccountCreated }) => {
    const history = useHistory()

    const { register: registerForm, handleSubmit: onSubmit, errors: formErrors } = useForm()

    // Form fields
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [errors, setErrors] = useState('')

    const [register, { error, loading }] = useMutation(REGISTER, {
        onError: errors => errorHandler(errors, setErrors),
        onCompleted: () => {
            if (!error) {
                setAccountCreated(true)
                history.push('/login')
                return
            }
        }
    })

    const handleSubmit = data => {
        console.log(data)
        if (!acceptedTerms) return
        const { email, password, born, name, sex, country } = data
        console.table({
            email,
            password,
            born,
            name,
            sex,
            country
        })

        register({
            variables: {
                email,
                password,
                born,
                name,
                sex,
                country
            }
        })
    }

    const validateBirthdate = (value) => {
        if (new Date(value) >= (new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 5)) return false
        else if (new Date(value) <= new Date('1900-01-01')) return false
        return true
    }

    return (
        <FormRegister onSubmit={ onSubmit(handleSubmit) }>

            { errors && <Notification title="Erro" message={ errors } margin="0" />}

            { formErrors.email && formErrors.email.type === 'required'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o e-mail é obrigatório</span>
                    </ErrorBoxContainer>
            }
            { formErrors.email && formErrors.email.type === 'maxLength'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o e-mail fornecido é longo demais</span>
                    </ErrorBoxContainer>
            }
            { formErrors.email && formErrors.email.type === 'minLength'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o e-mail fornecido é curto demais</span>
                    </ErrorBoxContainer>
            }
            { formErrors.email && formErrors.email.type === 'pattern'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o e-mail deve ser válido</span>
                    </ErrorBoxContainer>
            }

            { formErrors.password && formErrors.password.type === 'required'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> a senha é obrigatória</span>
                    </ErrorBoxContainer>
            }
            { formErrors.password && formErrors.password.type === 'maxLength'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> a senha fornecida é longa demais</span>
                    </ErrorBoxContainer>
            }
            { formErrors.password && formErrors.password.type === 'minLength'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> a senha fornecida é curta demais (mínimo de 5 caractéres)</span>
                    </ErrorBoxContainer>
            }

            { formErrors.born && formErrors.born.type === 'required'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> a data de nascimento é obrigatória</span>
                    </ErrorBoxContainer>
            }
            { formErrors.born && formErrors.born.type === 'validate'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> data de nascimento inválida (ou muito improvável ¯\_(ツ)_/¯)</span>
                    </ErrorBoxContainer>
            }

            { formErrors.name && formErrors.name.type === 'required'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o nome é obrigatório</span>
                    </ErrorBoxContainer>
            }
            { formErrors.name && formErrors.name.type === 'maxLength'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o nome fornecido é longo demais (máximo de 100 caractéres)</span>
                    </ErrorBoxContainer>
            }
            { formErrors.name && formErrors.name.type === 'minLength'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> o nome fornecido é curto demais</span>
                    </ErrorBoxContainer>
            }

            { formErrors.sex && formErrors.sex.type === 'required'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> sexo não selecionado (caso não queira informá-lo, marque a opção 'desejo não informar')</span>
                    </ErrorBoxContainer>
            }

            { formErrors.country && formErrors.country.type === 'required'
                && <ErrorBoxContainer>
                        <RiErrorWarningLine className="icenter" />
                        <span> selecione o país</span>
                    </ErrorBoxContainer>
            }

            <RegisterInputGroup>
                <LabelControl>
                    <label htmlFor="email">email:</label>
                </LabelControl>
                <InputControl>
                    <Input 
                        id="email"
                        name="email"
                        type="email" 
                        ref={registerForm({
                            required: true,
                            maxLength: 255,
                            minLength: 5,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        invalid={ formErrors.email }
                    />
                </InputControl>
            </RegisterInputGroup>

            <RegisterInputGroup>
                <LabelControl>
                    <label htmlFor="password">senha:</label>
                </LabelControl>
                <InputControl>
                    <Input 
                        id="password"
                        name="password"
                        type="password"
                        ref={registerForm({
                            required: true,
                            minLength: 5,
                            maxLength: 255
                        })}
                        invalid={ formErrors.password }
                    />
                </InputControl>
            </RegisterInputGroup>

            <RegisterInputGroup>
                <LabelControl>
                    <label htmlFor="born">Desculpe se estamos sendo indiscretos, mas quando você nasceu?</label>
                </LabelControl>
                <InputControl>
                    <Input 
                        id="born"
                        name="born"
                        type="date"
                        ref={registerForm({
                            required: true,
                            validate: validateBirthdate
                        })}
                        invalid={ formErrors.born }
                    />
                </InputControl>
            </RegisterInputGroup>
            
            <RegisterInputGroup>
                <LabelControl>
                    <label htmlFor="name">Entendemos seu nome direito?</label>
                </LabelControl>
                <InputControl>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        ref={registerForm({
                            required: true,
                            minLength: 2,
                            maxLength: 100
                        })}
                        invalid={ formErrors.name }
                    />
                </InputControl>
            </RegisterInputGroup>

            <RegisterInputGroup>
                <LabelControl>
                    <span>sexo:</span>
                </LabelControl>
                <InputControl>
                    <Input id="masculino" type="radio" name="sex" value="masculino" ref={registerForm({required: true})} />
                    <label htmlFor="masculino">masculino</label>
                    <Input id="feminino" type="radio" name="sex" value="feminino" ref={registerForm({required: true})} />
                    <label htmlFor="feminino">feminino</label>
                    <Input id="notinformed" type="radio" name="sex" value="notinformed" ref={registerForm({required: true})} />
                    <label htmlFor="notinformed">desejo não informar</label>
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
                        ref={registerForm({ required: true })}
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
                    <span>Se levante, coloque a mão direita no peito e faça o seguinte juramento marcando a caixa de seleção:</span>
                </LabelControl>
                <InputControl>
                    <Input 
                        id="termos" 
                        name="termos"
                        type="checkbox" 
                        checked={ acceptedTerms }
                        onChange={ () => setAcceptedTerms(!acceptedTerms) }
                        style={{ alignSelf: 'start', marginRight: '.5rem' }}
                    />
                    <label htmlFor="termos">Sei que devo ter 18 anos ou mais para usar o orkut nostalgia. Tenho 18 anos ou mais e aceito cumprir os <FakeLinkLogin>Termos de Uso e Conduta</FakeLinkLogin> e as <FakeLinkLogin>Políticas de Privacidade</FakeLinkLogin>.</label>
                </InputControl>
            </RegisterInputGroup>

            <ButtonGroup>
                <Button type="submit" disabled={ loading || !acceptedTerms }>
                    {
                        loading
                        ? (<SpinnerButtonContainer minwidth={228}>
                                <Spinner type="spokes" color="#34495e" height='15px' width='15px' /><span style={{marginLeft: '.5rem'}}>criando conta</span>
                            </SpinnerButtonContainer>)
                        : <strong>Tudo certo, pode criar minha conta</strong>
                    }
                </Button>
            </ButtonGroup>

        </FormRegister>
    )
}

export default RegisterForm