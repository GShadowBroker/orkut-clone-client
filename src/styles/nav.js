import styled from 'styled-components'

// Navbar
export const Nav = styled.nav`
    & div {
    }
`

export const UpperNav = styled.div`
    background: #89B1D6;
    color: white;
    padding: .4em 0;
    font-size: .9em;

    & ul {
        margin: 0;
        padding: 0;
    }

    & ul li {
        cursor: pointer;
        display: inline;
        padding: 0 .3rem;
    }

    .left-menu {
        border-left: 1px solid white;
        padding: 0 .6rem;
    }
    .email-menu {
        padding: 0 .6rem;
    }

    & li:hover {
        color: #eeeeee;
    }

    @media (max-width: 776px) {
        .email-menu {
            display: none;
        }
    }

    @media (max-width: 776px) {
        & {
            display: none;
        }
    }
`

export const MainNav = styled.div`
`

export const Logo = styled.div`
    display: flex;
    align-items: center;
    color: #E95B95;
    font-family: "Ronda", Arial, Helvetica, sans-serif;
    font-size: 2em;

    @media (max-width: 950px) {
        & {
            font-size: 2em;
        }
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    padding: 0 1.2rem;

    & a {
        padding: .4rem;
        margin: 0 .3rem;
        color: white;
        background: #89B1D6;
        border-radius: .3rem;
        transition: background .2s linear;
    }

    & a:hover {
        background: #779fc5;
    }

    & .active {
        background: #779fc5;
    }

    @media (max-width: 950px) {
        & {
            width: auto;
            padding: .4rem 0;
        }
    }
    @media (max-width: 776px) {
        width: 100%;
        justify-content: center;
    }
`

export const NavInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 500px;

    input {
        width: 100%;
        margin: 0 .3em;
    }

    @media (max-width: 950px) {
        & {
            width: 100%;
            justify-content: center;
        }

        & input {
            width: 50%;
        }
    }
`

export const MobileNav = styled.nav`
    z-index: 91;
    position: fixed;
    
    display: none;
    height: 60px;
    width: 100%;
    padding: 0 1em;
    background: #ffff;
    color: inherit;

    box-shadow: 2px 2px 6px #bebebe;

    @media (max-width: 776px) {
        & {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
`

export const FooterNav = styled.div`
    z-index: 91;
    position: fixed;
    bottom: 0;
    
    display: none;
    height: 60px;
    width: 100%;
    padding: 0 1em;
    background: #ffff;
    color: inherit;

    box-shadow: 2px 2px 6px #bebebe;

    @media (max-width: 776px) {
        & {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
`