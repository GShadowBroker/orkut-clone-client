import React from 'react'

import { 
    ModalOverlay, 
    ModalContainer,
    Card, 
    Subtitle, 
    CloseButton, 
    ButtonGroup, 
    Button 
} from '../../styles/layout'
import { ProfileInfo, InlineHeader } from '../../styles/profile'
import Spinner from 'react-loading'

const spinnerContainer = {
    minWidth: 50, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Modal = ({
    title,
    action,
    actionLabel,
    cancel,
    cancelLabel,
    isModalOpen,
    setModalOpen,
    loading,
    children
}) => {

    return (
        <ModalOverlay open={ isModalOpen } >
            <ModalContainer>
                <Card>
                    <ProfileInfo style={{ padding: '0 1.5rem', minWidth: 400  }}>
                        <InlineHeader>
                            <Subtitle>{ title }</Subtitle>
                            <CloseButton size={ 1.5 } onClick={ () => setModalOpen(false) }>
                                <span>&times;</span>
                            </CloseButton>
                        </InlineHeader>
                        <div>
                            { children }
                        </div>
                        <ButtonGroup>
                            <Button onClick={ action } disabled={ loading }>
                                <strong>
                                    {
                                        loading
                                        ? (<div style={spinnerContainer}>
                                            <Spinner type="spokes" color="#34495e" height='15px' width='15px' />
                                        </div>)
                                        : actionLabel
                                    }
                                </strong>
                            </Button>
                            <Button onClick={ cancel } disabled={ loading }>{ cancelLabel }</Button>
                        </ButtonGroup>
                    </ProfileInfo>
                </Card>
            </ModalContainer>
        </ModalOverlay>
    )
}

Modal.defaultProps = {
    title: '',
    action: () => {},
    actionLabel: 'OK',
    cancel: () => {},
    canelLabel: 'cancelar',
    isModalOpen: false
}

export default Modal