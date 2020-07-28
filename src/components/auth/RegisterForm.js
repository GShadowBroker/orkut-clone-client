import React, { useState, useEffect } from 'react'
import { Input, Select, Button, ButtonGroup, SpinnerButtonContainer } from '../../styles/layout'
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

import Notification from '../utils/Notification'
import errorHandler from '../../utils/errorHandler'

const RegisterForm = ({ setAccountCreated }) => {
    const history = useHistory()
    // Form fields
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [born, setBorn] = useState('')
    const [name, setName] = useState('')
    const [sex, setSex] = useState('')
    const [country, setCountry] = useState('Brasil')
    const [acceptedTerms, setAcceptedTerms] = useState(false)

    const [isFormValid, setIsFormValid] = useState(false)

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

    useEffect(() => {
        const checkValidity = () => {
            if (
                !email
                || !password
                || !born
                || !name
                || !country
                || !sex
                || !acceptedTerms
            ) {
                if (isFormValid === false) return
                setIsFormValid(false)
                return
            }
            if (isFormValid === false) setIsFormValid(true)
        }
        checkValidity()
    })

    const handleSubmit = e => {
        e.preventDefault()

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

    return (
        <FormRegister onSubmit={ handleSubmit }>

            { errors && <Notification title="Erro" message={ errors } margin="0" />}

            <RegisterInputGroup>
                <LabelControl>
                    <label htmlFor="email">email:</label>
                </LabelControl>
                <InputControl>
                    <Input 
                        id="email"
                        name="email"
                        type="email" 
                        value={email} 
                        onChange={({target}) => setEmail(target.value)}
                        maxLength="255"
                        minLength="5"
                        required
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
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                        maxLength="255"
                        minLength="5"
                        required
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
                        value={born}
                        onChange={({target}) => setBorn(target.value)}
                        required
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
                        value={name}
                        onChange={({target}) => setName(target.value)}
                        maxLength="100"
                        minLength="2"
                        required
                    />
                </InputControl>
            </RegisterInputGroup>

            <RegisterInputGroup>
                <LabelControl>
                    <span>sexo:</span>
                </LabelControl>
                <InputControl onChange={ ({target}) => setSex(target.value) }>
                    <Input id="masculino" type="radio" name="sex" value="masculino" />
                    <label htmlFor="masculino">masculino</label>
                    <Input id="feminino" type="radio" name="sex" value="feminino" />
                    <label htmlFor="feminino">feminino</label>
                    <Input id="notinformed" type="radio" name="sex" value="notinformed" />
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
                        value={ country }
                        onChange={ ({target}) => setCountry(target.value) }
                        required
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
                <Button type="submit" disabled={ !isFormValid || loading }>
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