import React from 'react'
import { NotificationContainer, Subtitle2 } from '../../styles/layout'

const Notification = ({ title, message, severity, margin }) => {
    return (
        <NotificationContainer margin={ margin ? margin : '.6rem' }>
            <Subtitle2 severity={ severity }><strong>{ title }</strong></Subtitle2>
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