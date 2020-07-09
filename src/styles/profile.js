import styled from 'styled-components'

// Main

export const Main = styled.main`
    font-size: 0.9em;
    display: flex;
    flex-direction: row;
`

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    min-width: ${0.18 * 966}px;
`

export const MainColumn = styled.div`
    background: cyan;
    display: flex;
    flex-direction: column;
    min-width: ${0.52 * 966}px;
`

export const RightColumn = styled.div`
    background: red;
    display: flex;
    flex-direction: column;
    height: 500px;
    min-width: ${0.3 * 966}px;    
`

export const ProfileImage = styled.div`
    background-image: url(${ props => props.url });
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
    width: 100%;
    height: 200px;
    margin-bottom: .5rem;
`

export const ProfileMenu = styled.div`
    margin-bottom: .5rem;
    font-size: 1em;
    padding-bottom: 1em;

    a {
        color: inherit;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: .5rem .8rem;

        &:hover {
            color: black;
            background: #eeeeee;
        }
    }

    h2 {
        padding: .6rem .8rem;
        margin: 0;
        padding-bottom: .3em;
        border-bottom: .3px solid #D4DCEF;
    }

    h3 {
        padding: .6rem .8rem;
        color: grey;
        margin-bottom: 0;
    }

    .active {
        color: #89B1D6;
        font-weight: bold;
        border-left: 5px solid #89B1D6;
    }
`

export const ProfileInfo = styled.div`
    display: flex;
    width: 100%;
    padding: 0 .8em;
`

export const InlineHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & div span {
        padding: 0 .5em;
    }
    & div span:first-of-type {
        border-right: .5px solid #bebebe;
    }
    button {
        margin: 0 .5em;
    }
`