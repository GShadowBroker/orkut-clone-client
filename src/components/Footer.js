import React from "react";
import { Container } from "../styles/layout";
import { Foot } from "../styles/footer";

const Footer = () => {
  return (
    <Foot>
      <Container nav footer>
        <ul>
          <li>
            <a href="/">acesse o orkut.com</a>
          </li>
          <li>
            <a href="/">sobre o orkut</a>
          </li>
          <li>
            <a href="/">blog</a>
          </li>
          <li>
            <a href="/">desenvolvedores</a>
          </li>
          <li>
            <a href="/">centro de segurança</a>
          </li>
          <li>
            <a href="/">privacidade</a>
          </li>
          <li>
            <a href="/">termos de uso</a>
          </li>
          <li>
            <a href="/">ajuda</a>
          </li>
        </ul>
        <div className="developed-by">
          <span>
            desenvolvido por{" "}
            <a href="https://github.com/GShadowBroker">Glédyson Ferreira</a>
          </span>
        </div>
      </Container>
    </Foot>
  );
};

export default Footer;
