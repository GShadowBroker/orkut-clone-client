import React, { useState } from "react";
import {
  Card,
  FakeLink,
  Button,
  Subtitle,
  Image,
  Message,
  MessageContent,
  MessageHeaderSpaced,
  MessageBody,
  MessageDetails,
  FormInputGroup,
  FormInputGroupCheck,
  Input,
  Label,
  ButtonGroup,
  SpinnerButtonContainer,
  FlexBoxCenter,
  ProfileImage,
} from "../../styles/layout";
import {
  MainColumn,
  ProfileInfo,
  InlineHeader,
  ProfileSection,
} from "../../styles/profile";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { IoIosArrowDropdown } from "react-icons/io";

import { Link } from "react-router-dom";
import trunc from "../../utils/truncate";
import moment from "moment";
import "moment/locale/pt-br";

import { useMutation } from "@apollo/client";
import { CREATE_TOPIC, FETCH_TOPICS } from "../../services/queries";

import RawModal from "../utils/RawModal";
import errorHandler from "../../utils/errorHandler";
import Notification from "../utils/Notification";
import Spinner from "react-loading";

import Editor from "../RichEditor";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const CommunityMain = ({
  user,
  community,
  topics,
  topicCount,
  newTopicFormOpen,
  setNewTopicFormOpen,
  toggleTopicForm,
  handleJoinCommunity,
  handleLeaveCommunity,
  loadingJoin,
  loadingLeave,
  mobile,
}) => {
  const [viewFullProfile, setViewFullProfile] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [agree, setAgree] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState(EditorState.createEmpty());

  const [errors, setErrors] = useState("");
  const [editorError, setEditorError] = useState("");

  const setEditorState = (editorState) => {
    setBody(editorState);
  };

  const [createTopic] = useMutation(CREATE_TOPIC, {
    onError: (error) => errorHandler(error, setErrors),
    refetchQueries: [
      {
        query: FETCH_TOPICS,
        variables: {
          communityId: community.id,
          limit: 5,
          offset: 0,
          limitComment: 1,
        },
      },
    ],
    onCompleted: () => handleSubmitCompleted(),
  });

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (title && body.getCurrentContent().getPlainText().length < 2048) {
      setLoadingSubmit(true);
      createTopic({
        variables: {
          communityId: community.id,
          title,
          body: draftToHtml(convertToRaw(body.getCurrentContent())),
        },
      });
    }
  };
  const handleTopicCancel = (e) => {
    e.preventDefault();
    toggleTopicForm();
  };

  const handleSubmitCompleted = () => {
    setLoadingSubmit(false);
    toggleTopicForm();
  };

  const validateEditor = () => {
    if (body.getCurrentContent().getPlainText().length > 2048) {
      setEditorError("Conteúdo não pode ultrapassar 2048 caractéres");
      return;
    }
    setEditorError("");
  };

  const timeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  const isMember = user.Subscriptions.find((c) => c.id === community.id)
    ? true
    : false;
  return (
    <MainColumn>
      <RawModal
        title="Criar um novo tópico"
        isModalOpen={newTopicFormOpen}
        setModalOpen={setNewTopicFormOpen}
        minWidth={mobile ? "auto" : 400}
      >
        <form
          onSubmit={handleTopicSubmit}
          style={{
            overflowY: "auto",
            maxHeight: "90vh",
            paddingRight: "1rem",
          }}
        >
          <div style={{ padding: ".5rem 0" }}>
            <Label>
              <strong>Comunidade: </strong>
            </Label>
            <Link to={`/comunidades/${community.id}`}>{community.title}</Link>
          </div>
          <div style={{ padding: ".5rem 0" }}>
            <Label>
              <strong>Autor: </strong>
            </Label>
            <Link to={`/perfil/${user.id}`}>{user.name}</Link>
          </div>
          <FormInputGroup>
            <Label htmlFor="title-newtopic">
              <strong>Assunto:</strong>
            </Label>
            <Input
              id="title-newtopic"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              maxLength="100"
              required
            />
            <MessageDetails>{title.length}/100</MessageDetails>
          </FormInputGroup>
          <FormInputGroup>
            <Label htmlFor="body-newtopic">
              <strong>Mensagem:</strong>
              {editorError ? (
                <span style={{ color: "red" }}>{` (${editorError})`}</span>
              ) : null}
            </Label>
            <Editor
              id="body-newtopic"
              name="body"
              message={body}
              setEditorState={setEditorState}
              onBlur={validateEditor}
              user={user}
            />
          </FormInputGroup>
          <FormInputGroupCheck>
            <Input
              id="agreetoterms"
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <Label htmlFor="agreetoterms">
              Declaro que minha postagem segue os{" "}
              <FakeLink>Termos de Uso e Conduta</FakeLink> do site.
            </Label>
          </FormInputGroupCheck>
          <ButtonGroup>
            <Button
              type="submit"
              disabled={
                loadingSubmit || !agree || !title || !body ? true : false
              }
            >
              <strong>
                {loadingSubmit ? (
                  <SpinnerButtonContainer>
                    <Spinner
                      type="spokes"
                      color="#34495e"
                      height="15px"
                      width="15px"
                    />
                  </SpinnerButtonContainer>
                ) : (
                  "criar tópico"
                )}
              </strong>
            </Button>
            <Button onClick={handleTopicCancel} disabled={loadingSubmit}>
              {"cancelar"}
            </Button>
          </ButtonGroup>
        </form>
      </RawModal>

      {errors && <Notification title="Erro" message={errors} />}

      <Card>
        <ProfileInfo style={{ marginTop: ".6rem" }}>
          {mobile ? (
            <div>
              <FlexBoxCenter style={{ flexDirection: "column" }}>
                <ProfileImage url={community.picture} size={200} />
                <Subtitle>{community.title}</Subtitle>
              </FlexBoxCenter>
              <div
                style={{
                  alignSelf: "start",
                  textAlign: "center",
                }}
              >
                {isMember ? (
                  <Button onClick={handleLeaveCommunity}>
                    <TiMinusOutline
                      className="icenter"
                      style={{ color: "#bebebe" }}
                    />
                    {loadingLeave ? "Saindo..." : " Deixar comunidade"}
                  </Button>
                ) : (
                  <Button onClick={handleJoinCommunity}>
                    <TiPlusOutline
                      className="icenter"
                      style={{ color: "#bebebe" }}
                    />
                    {loadingJoin ? "Entrando..." : " Participar da comunidade"}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <InlineHeader style={{ paddingBottom: "0" }}>
              <div style={{ maxWidth: "40%" }}>
                <Subtitle>{community.title}</Subtitle>
              </div>
              <div
                style={{
                  alignSelf: "start",
                  marginTop: ".6rem",
                  textAlign: "right",
                }}
              >
                {isMember ? (
                  <Button onClick={handleLeaveCommunity}>
                    <TiMinusOutline
                      className="icenter"
                      style={{ color: "#bebebe" }}
                    />
                    {loadingLeave ? "Saindo..." : " Deixar comunidade"}
                  </Button>
                ) : (
                  <Button onClick={handleJoinCommunity}>
                    <TiPlusOutline
                      className="icenter"
                      style={{ color: "#bebebe" }}
                    />
                    {loadingJoin ? "Entrando..." : " Participar da comunidade"}
                  </Button>
                )}
              </div>
            </InlineHeader>
          )}

          <ProfileSection border style={{ paddingBottom: ".5rem" }}>
            {viewFullProfile ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ marginLeft: ".5rem", minWidth: "46%" }}>
                  <p>
                    <strong>idioma: </strong>
                    {community.language}
                  </p>
                  <p>
                    <strong>categoria: </strong>
                    {community.Category.title}
                  </p>
                  <p>
                    <strong>tipo: </strong>
                    {community.type}
                  </p>
                  <p>
                    <strong>visível por: </strong>todos
                  </p>
                </div>
                <div style={{ marginLeft: ".5rem", minWidth: "46%" }}>
                  <p>
                    <strong>criada em: </strong>
                    {new Date(community.createdAt).toLocaleString(
                      "pt-BR",
                      timeOptions
                    )}
                  </p>
                  <p>
                    <strong>local: </strong>
                    {community.country}
                  </p>
                  <p>
                    <strong>proprietário: </strong>
                    <Link to={`/perfil/${community.Creator.id}`}>
                      {community.Creator.name}
                    </Link>
                  </p>
                  <p>
                    <strong>moderadores: </strong>
                  </p>
                </div>
              </div>
            ) : null}
            <FakeLink onClick={() => setViewFullProfile(!viewFullProfile)}>
              {viewFullProfile ? "ocultar perfil" : "ver perfil"}
            </FakeLink>
          </ProfileSection>
          <ProfileSection>
            <div>
              <p style={{ lineHeight: "1.6" }}>
                {community.description
                  ? community.description
                  : "Sem descrição."}
              </p>
            </div>
          </ProfileSection>
        </ProfileInfo>
      </Card>

      <Card style={{ marginTop: ".6em" }}>
        <ProfileInfo>
          <InlineHeader>
            <div style={{ maxWidth: "40%" }}>
              <Link to={`/comunidades/${community.id}/forum`}>
                <Subtitle style={{ paddingBottom: "0" }}>Fórum</Subtitle>
              </Link>
            </div>
            <div
              style={{
                alignSelf: "start",
                marginTop: ".6rem",
                textAlign: "right",
              }}
            >
              {isMember && (
                <Button onClick={toggleTopicForm}>Criar tópico</Button>
              )}
            </div>
          </InlineHeader>

          <div
            style={{
              padding: ".5rem 0",
            }}
          >
            {topics.map((t) => (
              <Link
                to={`/comunidades/${community.id}/forum/${t.id}`}
                key={t.id}
                style={{ borderBottom: ".3px solid #e3e8f5" }}
              >
                <Message style={{ borderBottom: ".3px solid #e3e8f5" }}>
                  <Image size="40" url={t.TopicCreator.profile_picture} />
                  <MessageContent>
                    <MessageHeaderSpaced style={{ fontSize: "1.1em" }}>
                      <FakeLink>
                        <strong>{trunc(t.title, 45)}</strong>
                      </FakeLink>
                      <IoIosArrowDropdown
                        style={{ color: "#bebebe", fontSize: "1.2em" }}
                      />
                    </MessageHeaderSpaced>
                    {t.Comments[0] ? (
                      <MessageBody>
                        <MessageDetails>
                          <span>
                            {t.Comments.length}{" "}
                            {t.Comments.length === 1 ? "resposta" : "respostas"}
                            .{" "}
                          </span>
                          <span>
                            Última postagem:{" "}
                            {trunc(
                              t.Comments[0].body.replace(/<[^>]*>/g, ""),
                              25
                            )}{" "}
                          </span>
                          <span style={{ fontSize: ".9em" }}>
                            {moment(t.Comments[0].createdAt).fromNow()}
                          </span>
                        </MessageDetails>
                      </MessageBody>
                    ) : (
                      <MessageBody>
                        <MessageDetails>
                          <span>{t.Comments.length} respostas. </span>
                          <span>
                            Última postagem:{" "}
                            {trunc(t.body.replace(/<[^>]*>/g, ""), 25)}{" "}
                          </span>
                          <span style={{ fontSize: ".9em" }}>
                            {moment(t.createdAt).fromNow()}
                          </span>
                        </MessageDetails>
                      </MessageBody>
                    )}
                  </MessageContent>
                </Message>
              </Link>
            ))}
          </div>
        </ProfileInfo>
        {topics.length > 0 ? (
          <ProfileInfo style={{ paddingBottom: "1.2rem" }}>
            <Link to={`/comunidades/${community.id}/forum`}>
              ver todos os tópicos
            </Link>
          </ProfileInfo>
        ) : (
          <ProfileInfo style={{ paddingBottom: "1.2rem", color: "grey" }}>
            <span>Nenhum tópico</span>
          </ProfileInfo>
        )}
      </Card>
    </MainColumn>
  );
};

export default CommunityMain;
