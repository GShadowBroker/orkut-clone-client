import React from 'react'

import { ModalOverlay, ModalContainer, CloseModal } from '../../styles/layout'
import { AiOutlineClose } from 'react-icons/ai'

const ImageModal = ({ isModalOpen, setModalOpen, children }) => {

    return (
        <ModalOverlay open={ isModalOpen } opacity='rgba(0, 0, 0, .8)'>
            <CloseModal onClick={ () => setModalOpen(false) }>
                <AiOutlineClose />
            </CloseModal>
            <ModalContainer>
                { children }
            </ModalContainer>
        </ModalOverlay>
    )
}

ImageModal.defaultProps = {
    isModalOpen: false
}

export default ImageModal