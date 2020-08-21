import styled from "styled-components";

// Footer
export const Foot = styled.footer`
  background: white;
  width: 100%;
  padding: 0.8em 0;
  padding-bottom: 1.4em;
  font-size: 0.9em;

  & ul {
    margin: 0;
    padding: 0;
  }

  & ul li {
    display: inline;
    padding: 0 0.6rem;
  }
  & ul li:not(:last-child) {
    border-right: 0.5px solid #bebebe;
  }

  span {
    color: #979797;
    font-size: 0.8em;
  }

  @media (max-width: 950px) {
    & ul {
      text-align: center;
    }
    & .developed-by {
      width: 100%;
      margin-top: 0.5em;
      text-align: center;
    }
  }

  @media (max-width: 776px) {
    margin-bottom: 60px;
  }
`;
