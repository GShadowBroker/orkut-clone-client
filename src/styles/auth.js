import styled from 'styled-components'

export const LoginMain = styled.main`
    display: flex;
    flex-direction: row;
`

export const LoginContainer = styled.div`
    margin-top: 4rem;
    width: 100%;
`
export const RegisterContainer = styled(LoginContainer)`
    margin-top: 0;
    margin-bottom: .6rem;
    background: #ffff;
    padding: .6rem;
`

export const LoginHero = styled.div`
    background: white;
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 .6rem .6rem 0;
`

export const LoginTitle = styled.div`
    font-size: 2.8em;
    flex: 1;
    padding-top: 2rem;
    display: flex;
    align-items: center;
`

export const LoginSubtitles = styled.div`
    text-align: center;
    flex: 1;
`

export const LoginFooter = styled.footer`
    font-size: .9em;
    background: #BCCDE9;
    text-align: center;
    padding: .5rem;

    ul, li {
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0 .3rem;
        display: inline;
    }
`

export const LoginRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
`

// Typography
export const FakeLinkLogin = styled.a`
    cursor: pointer;
    color: #0047BE;

    &:hover {
        color: #C40098;
    }
`

export const Stressed = styled.span`
    color: #B11E97;
    font-weight: bold;
`

// Form

export const LoginFormContainer = styled.div`
    background: #E8EEFA;
    flex: 1;
    margin-bottom: .6rem;
    border: solid white;
`



// Register

export const RegisterBoxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: #E8EEFA;
    border: solid white;
    margin-bottom: .6rem;
    padding: .5rem;

    span, a {
        padding: .3em 0;
    }
    a {
        cursor: pointer;
        color: #0047BE;

        &:hover {
            color: #C40098;
        }
    }
`

export const FormRegister = styled.form`
    margin-top: 1rem;
`

export const RegisterInputGroup = styled.div`
    display: flex;
    width: 100%;
    background: #E8EEFA;
    margin: .2rem 0;

    div {
        padding: .5rem;
    }
`

export const LabelControl = styled.div`
    width: 35%;
    color: grey;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;

    div:last-of-type {

    }
`

export const InputControl = styled.div`
    width: 65%;
    display: flex;
    align-items: center;

    label {
        margin-right: 1rem;
    }

    input {
        margin: 0;
        margin-right: .2rem;
        max-width: 100%;
    }
`