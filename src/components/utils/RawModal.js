import React from 'react'

import { 
    ModalOverlay, 
    ModalContainer,
    Card, 
    Subtitle, 
    CloseButton
} from '../../styles/layout'
import { ProfileInfo, InlineHeader } from '../../styles/profile'

const Modal = ({
    title,
    isModalOpen, // state that describes weather modal is open or not
    setModalOpen, // function that opens/closes modal
    children,
    minWidth,
    minHeight
}) => {

    return (
        <ModalOverlay open={ isModalOpen } >
            <ModalContainer>
                <Card style={{maxHeight: '98vh'}}>
                    <ProfileInfo style={{ 
                        padding: '0 1.5rem', 
                        minWidth,
                        minHeight,
                        maxHeight: '98vh',
                        maxWidth: '80vw',
                        overflowY: 'auto' 
                    }}>
                        <InlineHeader>
                            <Subtitle>{ title }</Subtitle>
                            <CloseButton size={ 1.5 } onClick={ () => setModalOpen(false) }>
                                <span>&times;</span>
                            </CloseButton>
                        </InlineHeader>
                        <div>
                            { children }
                        </div>
                    </ProfileInfo>
                </Card>
            </ModalContainer>
        </ModalOverlay>
    )
}

Modal.defaultProps = {
    title: '',
    isModalOpen: false,
    minWidth: 400,
    minHeight: 'auto'
}

export default Modal