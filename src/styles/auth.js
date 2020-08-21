import styled from "styled-components";

export const LoginMain = styled.main`
  display: flex;
  flex-direction: row;
`;

export const LoginContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
`;
export const RegisterContainer = styled(LoginContainer)`
  margin-top: 0;
  margin-bottom: 0.6rem;
  background: #ffff;
  padding: 0.6rem;
`;

export const LoginHero = styled.div`
  background: #ffff;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.6rem 0.6rem 0;
`;

export const LoginHeroMobile = styled(LoginHero)`
  margin: 0 0 0.6rem 0;
  font-size: 0.8em;
  padding: 0.6rem;
`;

export const LoginTitle = styled.div`
  font-size: 2.8em;
  flex: 1;
  padding-top: 2rem;
  display: flex;
  align-items: center;
`;

export const LoginSubtitles = styled.div`
  text-align: center;
  flex: 1;
`;

export const LoginFooter = styled.footer`
  font-size: 0.9em;
  background: #bccde9;
  text-align: center;
  padding: 0.5rem;

  ul,
  li {
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0 0.3rem;
    display: inline;
  }
`;

export const LoginRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Typography
export const FakeLinkLogin = styled.a`
  cursor: pointer;
  color: #0047be;

  &:hover {
    color: #c40098;
  }
`;

export const Stressed = styled.span`
  color: #b11e97;
  font-weight: bold;
`;

// Form

export const LoginFormContainer = styled.div`
  background: #e8eefa;
  flex: 1;
  margin-bottom: 0.6rem;
  border: solid white;
`;

// Register

export const RegisterBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: #e8eefa;
  border: solid white;
  margin-bottom: 0.6rem;
  padding: 0.5rem;

  span,
  a {
    padding: 0.3em 0;
  }
  a {
    cursor: pointer;
    color: #0047be;

    &:hover {
      color: #c40098;
    }
  }
`;

export const FormRegister = styled.form`
  margin-top: 1rem;
`;

export const RegisterInputGroup = styled.div`
  display: flex;
  width: 100%;
  background: #e8eefa;
  margin: 0.2rem 0;

  div {
    padding: 0.5rem;
  }
`;
export const RegisterInputGroupMobile = styled(RegisterInputGroup)`
  flex-direction: column;
`;

export const LabelControl = styled.div`
  width: ${(props) => (props.mobile ? "100%" : "35%")};
  color: grey;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.mobile ? "flex-start" : "flex-end")};
  text-align: ${(props) => (props.mobile ? "left" : "right")};
`;

export const InputControl = styled.div`
  width: ${(props) => (props.mobile ? "100%" : "65%")};
  display: flex;
  align-items: center;

  label {
    margin-right: 1rem;
  }

  input {
    margin: 0;
    margin-right: 0.2rem;
    max-width: 100%;
    width: ${(props) => (props.mobile ? "100%" : "")};
  }
`;

export const RadioControlMobile = styled(InputControl)`
  flex-direction: column;
  align-items: flex-start;

  div {
    display: flex;
    label {
      margin-right: 1rem;
    }

    input {
      margin: 0;
      margin-right: 0.2rem;
      max-width: 100%;
      width: ${(props) => (props.mobile ? "100%" : "")};
      align-self: center;
    }
  }
`;
