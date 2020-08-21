import React from "react";

import {
  ModalOverlay,
  ModalContainer,
  Card,
  Subtitle,
  CloseButton,
} from "../../styles/layout";
import { ProfileInfo, InlineHeader } from "../../styles/profile";

const Modal = ({
  title,
  isModalOpen, // state that describes whether modal is open or not
  setModalOpen, // function that opens/closes modal
  children,
  minWidth,
  minHeight,
  maxWidth,
}) => {
  const handleClose = () => {
    setModalOpen(false);
    document.querySelector("body").style.overflow = "";
  };

  return (
    <ModalOverlay open={isModalOpen}>
      <ModalContainer>
        <Card>
          <ProfileInfo
            style={{
              padding: "0 1.5rem",
              maxWidth: "90vw",
              minWidth,
              minHeight,
            }}
          >
            <InlineHeader>
              <Subtitle>{title}</Subtitle>
              <CloseButton size={1.5} onClick={handleClose}>
                <span>&times;</span>
              </CloseButton>
            </InlineHeader>
            <div>{children}</div>
          </ProfileInfo>
        </Card>
      </ModalContainer>
    </ModalOverlay>
  );
};

Modal.defaultProps = {
  title: "",
  isModalOpen: false,
  minWidth: 300,
  maxWidth: "90vw",
};

export default Modal;
