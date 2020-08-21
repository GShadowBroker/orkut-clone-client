import React from "react";

import {
  ModalOverlay,
  ModalContainer,
  Card,
  Subtitle,
  CloseButton,
  ButtonGroup,
  Button,
  SpinnerButtonContainer,
} from "../../styles/layout";
import { ProfileInfo, InlineHeader } from "../../styles/profile";
import Spinner from "react-loading";

const Modal = ({
  title,
  action,
  actionLabel,
  cancel,
  cancelLabel,
  isModalOpen,
  setModalOpen,
  loading,
  disabled,
  children,
}) => {
  return (
    <ModalOverlay open={isModalOpen}>
      <ModalContainer>
        <Card style={{ maxHeight: "98vh" }}>
          <ProfileInfo
            style={{
              padding: "0 1.5rem",
              minWidth: 400,
              maxHeight: "98vh",
              maxWidth: "80vw",
              overflowY: "auto",
            }}
          >
            <form onSubmit={action}>
              <InlineHeader>
                <Subtitle>{title}</Subtitle>
                <CloseButton size={1.5} onClick={() => setModalOpen(false)}>
                  <span>&times;</span>
                </CloseButton>
              </InlineHeader>
              <div>{children}</div>
              <ButtonGroup>
                <Button type="submit" disabled={disabled}>
                  <strong>
                    {loading ? (
                      <SpinnerButtonContainer>
                        <Spinner
                          type="spokes"
                          color="#34495e"
                          height="15px"
                          width="15px"
                        />
                      </SpinnerButtonContainer>
                    ) : (
                      actionLabel
                    )}
                  </strong>
                </Button>
                <Button onClick={cancel} disabled={loading}>
                  {cancelLabel}
                </Button>
              </ButtonGroup>
            </form>
          </ProfileInfo>
        </Card>
      </ModalContainer>
    </ModalOverlay>
  );
};

Modal.defaultProps = {
  title: "",
  action: () => {},
  actionLabel: "OK",
  cancel: () => {},
  canelLabel: "cancelar",
  isModalOpen: false,
};

export default Modal;
