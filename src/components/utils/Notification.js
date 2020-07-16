import React from 'react'
import { NotificationContainer, Subtitle } from '../../styles/layout'

const Notification = ({ title, message, severity }) => {
    return (
        <NotificationContainer>
            <Subtitle severity={ severity }>{ title }</Subtitle>
            <p>{ message }</p>
        </NotificationContainer>
    )
}

Notification.defaultProps = {
    title: "Que feio, servidor! Você não pode fazer isso.",
    message: "Infelizmente o servidor do aplicativo se comportou de forma inesperada. Por favor, recarregue a página ou aguarde alguns minutos.",
    severity: "high"
}

export default Notification