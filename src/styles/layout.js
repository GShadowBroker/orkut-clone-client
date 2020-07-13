import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const Container = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    max-width: 1000px;
    margin: auto;

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
    @media (max-width: 675px) {
        & {
            display: ${props => props.nav && !props.footer ? 'none' : ''};
            margin-top: ${ props => props.main ? '1rem' : '' };
            padding: ${ props => {
                if (props.nav) {
                    return '0 1rem'
                }
                if (props.main) {
                    return '40px 1rem 2rem 1rem'
                }
                return '0 1rem 2rem 1rem'
            }};
        }
    }
`

export const Card = styled.div`
    background: white;
`

export const Message = styled.div`
    padding: 0 1.5em 2em 1.5em;

    display: flex;
    justify-content: space-between;
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

export const MessageContent = styled.div`
    width: 100%;
    margin-left: 1em;
`

export const MessageHeader = styled.div`
    text-align: left;
    a {
        font-size: 1.2em;
        font-weight: bold;
    }
`

export const MessageBody = styled.p``

export const Time = styled.span`
    font-size: ${props => props.size ? props.size : '.9'}em;
    font-weight: ${props => props.bold ? 'bold' : ''};
    padding: 0 .5em;
    color: grey;
`


// Elements
export const Badge = styled.span`
    color: #bebebe;
    font-weight: bold;
`
export const FakeLink = styled.span`
    cursor: pointer;
    color: #6999c5;
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
    }
`

// Typography
export const Title = styled.h1`
    font-weight: 500;
`

export const Subtitle = styled.h2`
    font-weight: 500;
`

export const Subtitle2 = styled.h3`
    font-weight: 500;
`

// Forms

export const Form = styled.form`
    margin: .5rem 0;
`

export const InputGroup = styled.div`
    padding: .5rem 0;
    border-bottom: .3px solid #D4DCEF;
`

export const ActionGroup = styled(InputGroup)`
    border: none;
    button {
        margin-right: .5rem;
    }
`

export const Input = styled.input`
    border: 1px solid #bebebe;
    padding: .3em .6em;
    font-family: inherit;
`

export const Select = styled.select`
    cursor: pointer;
    border: 1px solid #bebebe;
    border-radius: .2rem;
    padding: .3em .6em;
    font-family: inherit;
`

export const TextArea = styled.textarea`
    border: 1px solid #bebebe;
    padding: .3em .6em;
    font-family: inherit;
    resize: vertical;
`

export const Label = styled.label``