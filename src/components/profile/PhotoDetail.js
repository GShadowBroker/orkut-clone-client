import React, { useState } from "react";

import moment from "moment";
import "moment/locale/pt-br";
import { useParams, useHistory, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PHOTO_COMMENTS,
  SEND_PHOTO_COMMENT,
  REMOVE_PHOTO_COMMENT,
} from "../../services/queries";

import RichEditor from "../RichEditor";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import Togglable from "../utils/Togglable";

import {
  Card,
  Subtitle2,
  Message,
  Image,
  MessageContent,
  MessageHeader,
  MessageBody,
  MessageActions,
  Time,
  Form,
  InputGroup,
  ActionGroup,
  Button,
  FakeLink,
} from "../../styles/layout";
import {
  MainColumn,
  ProfileInfo,
  PhotoContainer,
  ImageContain,
  ImageArrow,
  InlineHeader,
} from "../../styles/profile";

import Breadcrumbs from "../utils/Breadcrumbs";
import ImageModal from "../utils/ImageModal";
import Error404 from "../../pages/404Error";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Spinner from "react-loading";
import PhotoDetailSkeleton from "../skeletons/PhotoDetailSkeleton";
import Notification from "../utils/Notification";

const PhotoDetail = ({ loggedUser, user, albuns }) => {
  const { photoId, folderId } = useParams();
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [comment, setComment] = useState(EditorState.createEmpty());
  const setEditorState = (editorState) => {
    setComment(editorState);
  };

  const {
    error: errorPhoto,
    loading: loadingPhoto,
    data: dataPhoto,
  } = useQuery(GET_PHOTO_COMMENTS, {
    variables: { photoId },
  });
  const [sendPhotoComment, { loading: loadingCommentSubmission }] = useMutation(
    SEND_PHOTO_COMMENT,
    {
      onError: (error) => console.log(error),
      refetchQueries: [{ query: GET_PHOTO_COMMENTS, variables: { photoId } }],
      onCompleted: () => setComment(EditorState.createEmpty()),
    }
  );
  const [removePhotoComment, { loading: loadingCommentDeletion }] = useMutation(
    REMOVE_PHOTO_COMMENT,
    {
      onError: (error) => console.log(error),
      refetchQueries: [{ query: GET_PHOTO_COMMENTS, variables: { photoId } }],
    }
  );

  if (errorPhoto) return <Notification />;
  if (loadingPhoto) return <PhotoDetailSkeleton />;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(draftToHtml(convertToRaw(comment.getCurrentContent())));

    sendPhotoComment({
      variables: {
        body: draftToHtml(convertToRaw(comment.getCurrentContent())),
        photoId,
      },
    });
  };

  const handleCommentDeletion = (commentId) => {
    const confirm = window.confirm(
      "Tem certeza de que deseja excluir este comentário?"
    );
    if (!confirm) return;
    removePhotoComment({
      variables: {
        commentId,
      },
    });
  };

  const photos = [...user.Photos]
    .reverse()
    .filter((p) => p.folderId === folderId);
  console.log("photos", photos);
  const photo = user && photos.find((p) => p.id === photoId);
  const comments = dataPhoto && dataPhoto.findPhotoComments.rows;
  const commentCount = dataPhoto && dataPhoto.findPhotoComments.count;
  const album = albuns.find((a) => a.id === folderId) || null;

  const prevPhoto = user && photos[photos.indexOf(photo) - 1];
  const nextPhoto = user && photos[photos.indexOf(photo) + 1];

  if (!photo) return <Error404 />;

  const handleModal = (bool) => {
    if (bool) {
      document.querySelector("body").style.overflowY = "hidden";
    } else {
      document.querySelector("body").style.overflowY = "";
    }
    setIsModalOpen(bool);
  };

  const timeOptions = {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return (
    <MainColumn stretched>
      <ImageModal
        isModalOpen={isModalOpen}
        setModalOpen={(bool) => handleModal(bool)}
      >
        <img
          src={photo.url}
          alt={photo.description}
          onClick={() => handleModal(false)}
        />
      </ImageModal>

      <Card>
        <ProfileInfo>
          <h2>
            {`${album && album.title}`} ({album && album.Photos.length})
          </h2>

          <Breadcrumbs
            user={user.name}
            photo={photo.description}
            folder="album"
          />

          <p>
            Mostrando{" "}
            <strong>
              {[...user.Photos]
                .reverse()
                .filter((p) => p.folderId === folderId)
                .indexOf(photo) + 1}
            </strong>{" "}
            de <strong>{photos.length}</strong> fotos
          </p>
        </ProfileInfo>
        <PhotoContainer>
          {prevPhoto ? (
            <ImageArrow
              onClick={() =>
                history.push(
                  `/perfil/${user.id}/albuns/${folderId}/fotos/${prevPhoto.id}`
                )
              }
            >
              <IoIosArrowBack className="arrow-icon" />
            </ImageArrow>
          ) : (
            <ImageArrow disabled>
              <IoIosArrowBack className="arrow-icon" />
            </ImageArrow>
          )}
          <ImageContain url={photo.url} onClick={() => handleModal(true)} />
          {nextPhoto ? (
            <ImageArrow
              onClick={() =>
                history.push(
                  `/perfil/${user.id}/albuns/${folderId}/fotos/${nextPhoto.id}`
                )
              }
            >
              <IoIosArrowForward className="arrow-icon" />
            </ImageArrow>
          ) : (
            <ImageArrow disabled>
              <IoIosArrowForward className="arrow-icon" />
            </ImageArrow>
          )}
        </PhotoContainer>
        <ProfileInfo>
          <p style={{ textAlign: "center" }}>{photo.description}</p>
        </ProfileInfo>

        <ProfileInfo>
          <InlineHeader>
            <Subtitle2>Comentários ({commentCount || 0})</Subtitle2>
          </InlineHeader>
          {comments.map((c) => (
            <Message key={c.id}>
              <Link to={`/perfil/${c.Sender.id}`}>
                <Image size="50" url={c.Sender.profile_picture} />
              </Link>
              <MessageContent>
                <MessageHeader>
                  <Link to={`/perfil/${c.Sender.id}`}>{c.Sender.name}</Link>
                  <Time>
                    -{" "}
                    {new Date(c.createdAt).toLocaleString("pt-BR", timeOptions)}{" "}
                    ({moment(c.createdAt).fromNow()})
                  </Time>
                </MessageHeader>
                <MessageBody>
                  <div dangerouslySetInnerHTML={{ __html: c.body }} />
                </MessageBody>
              </MessageContent>
              {(user.id === loggedUser.id || c.Sender.id === loggedUser.id) && (
                <MessageActions>
                  {loadingCommentDeletion ? (
                    <Spinner
                      type="spokes"
                      color="#3c88cf"
                      height="15px"
                      width="15px"
                    />
                  ) : (
                    <FakeLink onClick={() => handleCommentDeletion(c.id)}>
                      excluir
                    </FakeLink>
                  )}
                </MessageActions>
              )}
            </Message>
          ))}
        </ProfileInfo>

        <ProfileInfo style={{ marginBottom: "1rem" }}>
          <Togglable viewLabel="enviar comentário">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <RichEditor
                  message={comment}
                  setEditorState={setEditorState}
                  user={loggedUser}
                />
              </InputGroup>
              <ActionGroup>
                <Button type="submit" disabled={loadingCommentSubmission}>
                  {loadingCommentSubmission
                    ? "enviando..."
                    : "enviar comentário"}
                </Button>
              </ActionGroup>
            </Form>
          </Togglable>
        </ProfileInfo>
      </Card>
    </MainColumn>
  );
};

export default PhotoDetail;
