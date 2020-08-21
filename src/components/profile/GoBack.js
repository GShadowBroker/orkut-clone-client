import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TiArrowBack } from "react-icons/ti";
import { IconContainer } from "../../styles/layout";

const FloatButton = styled.div`
  position: fixed;
  bottom: 80px;
  right: 15px;

  background: #ffff;
  margin: 0;
  padding: 0.3rem;
  border-radius: 50%;
  box-shadow: 2px 2px 6px #bebebe;
`;

const GoBack = ({ user }) => {
  return (
    <Link to={`/perfil/${user.id}`}>
      <FloatButton>
        <IconContainer>
          <TiArrowBack />
        </IconContainer>
      </FloatButton>
    </Link>
  );
};

export default GoBack;
