import React, { useState, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";

import {
  Form,
  LoginInputGroup,
  Input,
  Label,
  Button,
  LoginInputNote,
  InputNote,
  Subtitle,
  ErrorBoxContainer,
} from "../../styles/layout";
import {
  LoginFormContainer,
  RegisterBoxContainer,
  LoginRegisterContainer,
  FakeLinkLogin,
} from "../../styles/auth";
import { RiErrorWarningLine } from "react-icons/ri";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../../services/queries";
import errorHandler from "../../utils/errorHandler";
import { useForm } from "react-hook-form";

const Login = ({ setToken, mobile }) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const [login, { loading, data }] = useMutation(LOGIN, {
    onError: (error) => errorHandler(error, setErrorMessage),
  });

  useEffect(() => {
    if (data) {
      const token = data.login;
      window.localStorage.setItem("token", JSON.stringify(token));
      history.push("/");
      setToken(token);
    }
  }, [data]); // eslint-disable-line

  useEffect(() => {
    const credentials = JSON.parse(window.localStorage.getItem("autocomplete"));
    if (credentials) {
      setEmail(credentials.email);
    }
  }, []);

  const handleLogin = (data) => {
    const { email, password } = data;
    if (remember) {
      window.localStorage.setItem(
        "autocomplete",
        JSON.stringify({
          email,
          password,
        })
      );
    } else {
      window.localStorage.removeItem("autocomplete");
    }

    login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <LoginRegisterContainer>
      <LoginFormContainer>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <Subtitle style={{ padding: "0 .5rem" }}>Entrar</Subtitle>
          {errorMessage && (
            <ErrorBoxContainer>
              <RiErrorWarningLine className="icenter" />
              <span> {errorMessage}</span>
            </ErrorBoxContainer>
          )}
          {errors.email && errors.email.type === "required" && (
            <ErrorBoxContainer>
              <RiErrorWarningLine className="icenter" />
              <span> o e-mail é obrigatório</span>
            </ErrorBoxContainer>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <ErrorBoxContainer>
              <RiErrorWarningLine className="icenter" />
              <span> e-mail inválido</span>
            </ErrorBoxContainer>
          )}

          {errors.password && errors.password.type === "required" && (
            <ErrorBoxContainer>
              <RiErrorWarningLine className="icenter" />
              <span> a senha é obrigatória</span>
            </ErrorBoxContainer>
          )}

          <LoginInputGroup>
            <Label htmlFor="email">e-mail: </Label>
            <Input
              id="email"
              name="email"
              type="text"
              defaultValue={email || ""}
              ref={register({
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
              })}
              invalid={errors.email}
              style={mobile && { width: "100%" }}
            />
            <InputNote nopad>ex: pat@exemplo.com</InputNote>
          </LoginInputGroup>
          <LoginInputGroup style={{ paddingTop: "0" }}>
            <Label htmlFor="password">senha: </Label>
            <Input
              id="password"
              name="password"
              type="password"
              ref={register({ required: true })}
              invalid={errors.password}
              style={mobile && { width: "100%" }}
            />
          </LoginInputGroup>
          <LoginInputGroup>
            <Input
              id="rememberme"
              name="rememberme"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <Label htmlFor="rememberme">Me lembre neste computador.</Label>
            <LoginInputNote>
              Não use em computadores públicos [?]
            </LoginInputNote>
          </LoginInputGroup>
          <LoginInputGroup>
            <Button
              type="submit"
              disabled={loading}
              style={mobile && { width: "100%" }}
            >
              {loading ? "entrando..." : "entrar"}
            </Button>
          </LoginInputGroup>
          <LoginInputNote style={{ textAlign: "center", padding: ".8rem 0" }}>
            <FakeLinkLogin>Não consegue acessar sua conta?</FakeLinkLogin>
          </LoginInputNote>
        </Form>
      </LoginFormContainer>
      <RegisterBoxContainer>
        <span>Ainda não é membro?</span>
        <Link to="/registro">
          <strong>ENTRAR JÁ!</strong>
        </Link>
      </RegisterBoxContainer>
    </LoginRegisterContainer>
  );
};

export default Login;
