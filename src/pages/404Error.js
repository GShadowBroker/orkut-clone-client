import React from 'react'
import { LogoError, ErrorContainer, VideoRecommendations } from '../styles/layout'

const Error404 = () => {
    return (
        <ErrorContainer>
            <LogoError />
            <div style={{ textAlign: 'center' }}>
                <h3>Ops! Alguma coisa está faltando...</h3>
                <h3>Erro 404. Página não encontrada</h3>
            </div>
            <VideoRecommendations>
                <iframe title="conheça o orkut" width="350" height="200" src="https://www.youtube.com/embed/lZoP-IXS8tg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <iframe title="aprenda a história do orkut" width="350" height="200" src="https://www.youtube.com/embed/xHC2m3Ii3_M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </VideoRecommendations>
        </ErrorContainer>
    )
}

export default Error404