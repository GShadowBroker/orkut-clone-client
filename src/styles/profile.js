import styled from 'styled-components'

// Main

export const Main = styled.main`
    font-size: 0.9em;
    display: flex;
    flex-direction: row;
`

export const LeftColumn = styled.div`
    display: flex;
    margin-right: .6rem;
    flex-direction: column;
    min-width: ${0.18 * 966}px;
`

export const MainColumn = styled.div`
    display: flex;
    flex-direction: column;
    min-width: ${props => props.stretched ? 0.82 * 966 : 0.52 * 966}px;
`

export const RightColumn = styled.div`
    margin-left: .6rem;
    display: flex;
    flex-direction: column;
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
    margin-bottom: .6rem;
`

export const ProfileMenu = styled.div`
    margin-bottom: .5rem;
    font-size: 1em;
    padding-bottom: 1rem;

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
        padding-bottom: .3rem;
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
    flex-direction: column;
    width: 100%;
    padding: 0 .8rem;
`

export const InlineHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .5rem;

    & div span {
        padding: 0 .5rem;
    }
    & div span:first-of-type {
        border-right: .5px solid #bebebe;
    }
    button {
        margin: 0 .5rem;
    }
`

export const ProfileSection = styled.div`
    padding: 0 0 2rem 0;
    border-bottom: ${props => props.border ? '.3px solid #D4DCEF' : ''};
`

export const ProfileFriends = styled(ProfileInfo)`
    padding-bottom: 1rem;
    input {
        width: 100%;
    }

    div:first-of-type {
        padding-bottom: 1em;
    }
`

export const FriendsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px 100px;
    grid-gap: .5rem;

    & div {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`

export const LastImages = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: .5rem;
`

// Scraps
export const CommentSectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: .5rem 0;
`

export const CommentSectionFooter = styled(CommentSectionHeader)`
    justify-content: flex-end;
`

export const CommentSection = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
`

export const Comment = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    padding: .8rem .6rem;
    margin: .2rem 0;
    background: #E2E8FD;

`

export const CommentBody = styled.div`
    width: 100%;
    padding-left: 1rem;
`

export const CommentContent = styled.div`
    padding: .2rem 0 .4rem 0;
`

export const CommentCheckbox = styled.div`
    padding-right: .5rem;
`

export const PaginationBlock = styled.div`
    span {
        padding: 0 .5rem;
    }
    span:last-child {
        padding-right: 0;
    }
    span:not(:last-child) {
        border-right: .5px solid #bebebe;
    }
`