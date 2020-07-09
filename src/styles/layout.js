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

export const Badge = styled.span`
    color: #bebebe;
    font-weight: bold;
`
export const FakeLink = styled.span`
    cursor: pointer;
    color: #6999c5;
`