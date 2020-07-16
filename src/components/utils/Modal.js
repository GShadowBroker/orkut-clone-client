import React from 'react'

import { ModalOverlay, ModalContainer, CloseModal } from '../../styles/layout'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ isModalOpen, setModalOpen, children }) => {

    return (
        <ModalOverlay open={ isModalOpen }>
            <CloseModal onClick={ () => setModalOpen(false) }>
                <AiOutlineClose />
            </CloseModal>
            <ModalContainer>
                { children }
            </ModalContainer>
        </ModalOverlay>
    )
}

Modal.defaultProps = {
    isModalOpen: false
}

export default Modal