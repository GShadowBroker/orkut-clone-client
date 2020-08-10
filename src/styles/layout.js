import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${props => props.background ? props.background : 'inherit'};
`

export const Container = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    max-width: 1000px;
    margin: auto;

    transition: transform .5s;

    /* navbar */
    display: ${ props => props.nav ? 'flex' : 'block' };
    padding: ${ props => props.nav ? '0 1rem' : '0 1rem 2rem 1rem'};
    justify-content: ${ props => props.nav ? 'space-between' : '' };
    max-height: ${ props => props.nav ? '6em' : '' };

    & .mobile-nav {
        display: none;
    }

    @media (max-width: 950px) {
        & {
            max-height: ${ props => props.nav ? '14em' : '' };
            display: ${ props => props.nav ? 'flex' : 'block'};
            flex-wrap: wrap;
            margin-top: ${ props => props.main ? '1rem' : '' };
            padding: ${ props => {
                if (props.nav) {
                    return '0 1rem'
                }
                if (props.main) {
                    return '0 1rem 2rem 1rem'
                }
                return '0 1rem 2rem 1rem'
            }};
        }
    }
    @media (max-width: 776px) {
        & {
            display: ${props => props.nav && !props.footer ? 'none' : ''};
            margin-top: ${ props => props.main ? '1rem' : '' };
            padding: ${ props => {
                if (props.nav) {
                    return '0 1rem'
                }
                if (props.main) {
                    return '60px 1rem 2rem 1rem'
                }
                return '0 1rem 2rem 1rem'
            }};
        }
    }
`

export const DrawerMenu = styled.aside`
    height: 100%;
    width: 0px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #ffff;
    overflow-x: hidden;
    padding: 60px 0;
    transition: 0.5s;
    box-shadow: 2px 2px 6px #bebebe;
`

export const Card = styled.div`
    background: white;
`

export const Message = styled.div`
    padding: .6rem 0;
    display: flex;
    justify-content: space-between;
`

export const FlexBoxCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Image = styled.div`
    background-image: url(${ props => props.url });
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`

export const ProfileImage = styled(Image)`
    border-radius: 50%;
`

export const MessageContent = styled.div`
    width: 100%;
    overflow-x: auto;
    margin-left: 1em;
`

export const MessageHeader = styled.div`
    text-align: left;
    a {
        font-size: 1.2em;
        font-weight: bold;
    }
`

export const MessageHeaderSpaced = styled.div`
    display: flex;
    justify-content: space-between;
`

export const MessageProfile = styled.div`
    border: .3px solid #e3e8f5;
    display: flex;
    flex-direction: row;
    max-width: 250px;

    a {
        padding: .5rem;
    }
`

export const MessageActions = styled.div`
    text-align: right;
    font-size: .9em;
    padding: ${props => props.below ? '1rem 0 0 0' : ''};
    button {
        margin-right: ${props => props.below ? '.6rem' : ''};
    }
`

export const MessageBody = styled.div`
    overflow-wrap: break-word;
    max-width: 100%;
    img {
        max-width: 100%;
    }
    blockquote {
        color: grey;
        border-left: 3px solid #eeeeee;
        padding-left: .5rem;
        margin: 0;
        margin: .5rem 0 .5rem .5rem;
    }
`

export const MessageDetails = styled.div`
    margin: .3rem 0;
    color: grey;
`

export const Time = styled.span`
    font-size: ${props => props.size ? props.size : '.9'}em;
    font-weight: ${props => props.bold ? 'bold' : ''};
    padding: 0 .5em;
    color: grey;
`

// Modal

export const ModalOverlay = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;

    width: 100vw;
    height: 100vh;

    background: ${props => props.opacity ? props.opacity : 'rgba(0, 0, 0, .4)'};

    display: ${props => props.open ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`

export const ModalContainer = styled.div`
    margin: auto;

    display: flex;
    justify-content: center;

    img {
        cursor: ${props => props.image ? 'zoom-out' : 'cursor'};
        max-height: 100vh;
        max-width: 100vw;
    }
`

export const CloseModal = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    padding: 1rem;
    cursor: pointer;

    font-size: 2em;
    font-weight: bold;
    color: white;
`

// Elements
export const Badge = styled.span`
    color: #bebebe;
    font-weight: bold;
    display: flex;
    align-items: center;
`
export const FakeLink = styled.span`
    cursor: pointer;
    color: #3c88cf;
`

export const Button = styled.button`
    border: 1px solid #bebebe;
    cursor: pointer;
    border-radius: .2em;
    padding: .3em .6em;
    background-image: linear-gradient(white, #eeeeee);
    color: inherit;
    font-family: inherit;
    transition: background-image .5s linear;

    &:hover {
        background-image: linear-gradient(#eeeeee, #e5e5e5);
    }

    &:disabled {
        cursor: not-allowed;
        background-image: linear-gradient(#eeeeee, #e5e5e5);
        color: grey;
    }
`

export const CloseButton = styled.div`
    font-size: ${props => props.size ? props.size : '1'}rem;
    font-weight: bold;
    
    span {
        color: #89B1D6;
        cursor: pointer;
        border: none !important;
    }
    span:hover {
        color: #779FC5;
    }
`

export const SpinnerButtonContainer = styled.div`
    min-width: ${ props => props.minwidth ? props.minwidth : 50 }px;
    display: flex;
    align-items: center;
    justify-content: center;
`

// Typography
export const Title = styled.h1`
    font-weight: 500;
`

export const Subtitle = styled.h2`
    font-weight: 500;
    color: ${props => {
        switch(props.severity) {
            case 'high':
                return '#c0392b'
            case 'medium':
                return '#f1c40f'
            case 'low':
                return '#27ae60'
            default:
                return 'inherit'
        }
    }};
`

export const Subtitle2 = styled.h3`
    font-weight: 500;
    color: ${props => {
        switch(props.severity) {
            case 'high':
                return '#c0392b'
            case 'medium':
                return '#f1c40f'
            case 'low':
                return '#27ae60'
            default:
                return 'inherit'
        }
    }};
`

export const ShowMore = styled.div`
    padding: .6rem;
    text-align: center;
`

// Forms

export const Form = styled.form`
    margin: .5rem 0;
`

export const InputGroup = styled.div`
    padding: .5rem 0;
    border-bottom: .3px solid #e3e8f5;
`

export const FormInputGroup = styled(InputGroup)`
    border: none;
    display: flex;
    flex-direction: column;
`

export const FormInputGroupCheck = styled.div`
    display: flex;
    align-items: center;
    padding: .5rem 0;
    input {
        margin: 0;
        margin-right: .3rem;
    }
`

export const LoginInputGroup = styled(InputGroup)`
    padding: .6rem;
    border: none;
`

export const ActionGroup = styled(InputGroup)`
    button {
        margin-right: .5rem;
    }
`

export const ButtonGroup = styled.div`
    padding: 1rem 0;
    display: flex;
    button {
        margin-right: .5rem;
    }
`

export const ModalInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    padding: .8rem 0;

    label {
        padding-bottom: .2rem;
    }
`

export const ModalActionGroup = styled.div`
    border-top: .3px solid #e3e8f5;
    padding: .8rem 0;
    button {
        margin-right: .5rem;
    }
`

export const RadioGroup = styled.div`
    display: flex;
    align-items: center;

    input {
        margin: 0;
        margin-right: .2rem;
    }
`

export const Input = styled.input`
    max-width: 100%;
    border: ${props => {
        if (props.valid) return '1px solid #27ae60'
        if (props.invalid) return '1px solid #e74c3c'
        return '1px solid #bebebe'
    }};
    padding: .3em .6em;
    font-family: inherit;
`

export const SearchInputContainer = styled.div`
    /* border: 1px solid green; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: .3rem;
    flex: 1;
    height: 26px;

    input {
        height: 26px;
        margin: 0 !important;
        border-right: ${props => props.noborderright ? 'none' : ''};
        border-left: ${props => props.noborderleft ? 'none' : ''};
        padding: .3em 0;
        padding-right: ${props => props.noborderleft ? '.3rem' : '0'};
        padding-left: ${props => props.noborderright ? '.3rem' : '0'};

        &:focus {
            outline: none;
        }
    }
`

export const SearchInputIcon = styled.div`
    display: flex;
    align-items: center;
    height: 26px;

    background: #ffff;
    padding: 5px;
    border: 1px solid #bebebe;
    border-right: ${props => props.noborderright ? 'none' : '1px solid #bebebe'};
    border-left: ${props => props.noborderleft ? 'none' : '1px solid #bebebe'};
    color: grey;
`

export const Select = styled.select`
    cursor: pointer;
    border: 1px solid #bebebe;
    border-radius: .2rem;
    padding: .3em .6em;
    max-width: 100%;
    font-family: inherit;
`

export const Label = styled.label`
    padding: .5rem 0;
`

export const InputWarning = styled.span`
    padding: .6rem 0;
    color: #e74c3c;
`

export const LoginInputNote = styled(LoginInputGroup)`
    color: grey;
    font-size: .9em;
    padding: .3rem;
`
export const InputNote = styled(LoginInputNote)`
    padding: 0;
    margin: 0;
    text-align: center;
`

export const FormUpdate = styled.form`
    border: none;
    padding: .6rem;
    border: ${props => props.error ? '1px solid #e74c3c' : '1px solid #bebebe'};
`

export const InputGroupUpdate = styled.div``

export const ActionGroupUpdate = styled.div`
    button {
        margin-right: .6em !important;
    }
`

export const TextArea = styled.textarea`
    border: none;
    width: 100%;
    resize: vertical;
    max-height: 200px;
    padding: .3em .6em;
    font-family: inherit;

    &::placeholder {
        font-size: .8rem;
    }
    &:focus {
        outline: none;
    }
`

export const ErrorBoxContainer = styled.div`
    background: #FFFFD2;
    color: #c0392b;
    margin-bottom: .6rem;
    padding: .3rem;
`

// 404 Error Page

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const LogoError = styled.div`
    max-width: 500px;
    width: 100%;
    height: 160px;
    margin: auto;

    background-image: url(${require(`../assets/orkut.png`)});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`

export const VideoRecommendations = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem 0;

    iframe {
        padding: 0 .6rem;
    }
`

// Notification

export const NotificationContainer = styled.div`
    background-color: #FFFFD2;
    padding: .2rem 1rem;
    margin: ${props => props.margin};
`

// Home

export const FortuneLogo = styled.div`
    background-image: url(${require('../assets/todays-fortune.png')});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    min-width: 40px;
    min-height: 40px;
`