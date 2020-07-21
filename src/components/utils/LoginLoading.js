import React from 'react'
import styled from 'styled-components'

import { Wrapper } from '../../styles/layout'

const OrkutLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    color: #E95B95;
    font-family: "Ronda", Arial, Helvetica, sans-serif;
    font-size: 4em;
    font-weight: bold;

    @keyframes jumping {
        0% {
            transform: translateY(0px);
        }
        20% {
            transform: translateY(-30px);
        }
        40% {
            transform: translateY(0px);
        }
        100% {
            transform: translateY(0px);
        }
    }
    #letter_1 {
        animation-name: jumping;
        animation-duration: 2s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
    }
    #letter_2 {
        animation-name: jumping;
        animation-duration: 2s;
        animation-delay: .3s;
        animation-iteration-count: infinite;
    }
    #letter_3 {
        animation-name: jumping;
        animation-duration: 2s;
        animation-delay: .6s;
        animation-iteration-count: infinite;
    }
    #letter_4 {
        animation-name: jumping;
        animation-duration: 2s;
        animation-delay: .9s;
        animation-iteration-count: infinite;
    }
    #letter_5 {
        animation-name: jumping;
        animation-duration: 2s;
        animation-delay: 1.12s;
        animation-iteration-count: infinite;
    }
`

const LoginLoading = () => {
    return (
        <Wrapper>
            <OrkutLogo>
                <span id="letter_1">o</span>
                <span id="letter_2">r</span>
                <span id="letter_3">k</span>
                <span id="letter_4">u</span>
                <span id="letter_5">t</span>
            </OrkutLogo>
        </Wrapper>
    )
}

export default LoginLoading