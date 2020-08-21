import React, { useState, useRef } from "react";
import {
  DrawerMenu,
  ProfileImage,
  Subtitle,
  Badge,
  FakeLink,
  Image,
  ButtonGroup,
  Button,
  SpinnerButtonContainer,
} from "../styles/layout";
import { ProfileMenu } from "../styles/profile";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import RawModal from "./utils/RawModal";
import Spinner from "react-loading";
import { useMutation } from "@apollo/client";
import {
  UPDATE_PROFILE_PICTURE,
  FIND_USER,
  FETCH_FEED,
} from "../services/queries";

const DrawerContainer = styled.div`
  position: relative;
  padding: 0.6rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Drawer = ({ loggedUser, logout, toggleConfig }) => {
  const location = useLocation();
  const user = loggedUser;

  //Image Upload
  const uploadForm = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [updateProfilePicture, { loading }] = useMutation(
    UPDATE_PROFILE_PICTURE,
    {
      onError: (error) => console.log(error),
      refetchQueries: [
        { query: FIND_USER, variables: { userId: loggedUser.id } },
        { query: FETCH_FEED, variables: { limit: 10 } },
      ],
      onCompleted: () => handleModal(false),
    }
  );

  const handleImageClick = (e) => {
    e.preventDefault();
    uploadForm.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      handleModal(true);
    };
  };

  const uploadImage = (base64EncodedImage) => {
    updateProfilePicture({
      variables: {
        newPhoto: base64EncodedImage,
      },
    });
  };

  const handleModal = (bool) => {
    if (bool) {
      document.querySelector("body").style.overflowY = "hidden";
    } else {
      document.querySelector("body").style.overflowY = "";
    }
    setIsModalOpen(bool);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleModal(false);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (selectedFile.type.slice(0, 5) !== "image") {
      alert("A foto de perfil deve ser um arquivo de imagem.");
      return;
    }
    if (Number(selectedFile.size) > 10000000) {
      alert("A foto selecionada é grande demais.");
      return;
    }
    if (!previewSource) return;

    uploadImage(previewSource);
  };

  // End Image Upload

  const handleLogout = () => {
    document.querySelector("body").style.overflow = "";
    logout();
  };
  const handleConfig = () => {
    const drawer = document.querySelector("#menu-drawer");
    const body = document.querySelector("body");
    const content = document.querySelector("#main-content");
    const wrapper = document.querySelector("#menu-content-wrapper");

    if (drawer && content && wrapper) {
      content.style.transform = "";
      body.style.overflow = "";
      wrapper.style.overflow = "";
      drawer.style.width = "";
    }
    toggleConfig();
  };

  return (
    <DrawerMenu id="menu-drawer">
      <form style={{ display: "none" }} onSubmit={handleSubmitFile}>
        <input
          ref={uploadForm}
          type="file"
          accept="image/*"
          name="image"
          value={fileInputState}
          onChange={handleFileUpload}
        />
      </form>

      <RawModal
        title="Pré-visualização"
        isModalOpen={isModalOpen}
        setModalOpen={(bool) => handleModal(bool)}
        loading={loading}
        minWidth={300} //// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      >
        <form onSubmit={handleSubmitFile}>
          <div style={{ display: "flex" }}>
            <Image
              size={150}
              url={previewSource}
              style={{ marginRight: "1rem" }}
            />
            <div>
              <p>
                <strong>tamanho: </strong>
                {selectedFile.size} bytes
              </p>
              <p>
                <strong>tipo: </strong>
                {selectedFile.type}
              </p>
            </div>
          </div>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
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
                  "salvar"
                )}
              </strong>
            </Button>
            <Button onClick={handleCancel} disabled={loading}>
              cancelar
            </Button>
          </ButtonGroup>
        </form>
      </RawModal>

      <DrawerContainer>
        <DrawerHeader>
          <ProfileImage
            url={loggedUser.profile_picture}
            size={100}
            onClick={handleImageClick}
          />
          <Subtitle>{loggedUser.name}</Subtitle>
        </DrawerHeader>

        <ProfileMenu>
          <ul>
            <li className="vibes">
              <FakeLink>
                {user.id === loggedUser.id ? "0 vibes" : "vibes? 0"}
              </FakeLink>
              <Badge>
                <BsStar style={{ fontSize: "1.2em", marginRight: ".2rem" }} />0
              </Badge>
            </li>
            {/* <Link to={ `/perfil/${user.id}/atualizacoes` }>
                            <li className={ location.pathname === `/perfil/${user.id}/atualizacoes` ? 'active' : '' }>
                                <span>
                                    {user.id === loggedUser.id ? 'minhas atualizações' : 'atualizações'}
                                </span>
                                <Badge>{ user.Posts.length > 0 && user.Posts.length }</Badge>
                            </li>
                        </Link> */}
            <Link to={`/perfil/${user.id}`}>
              <li
                className={
                  location.pathname === `/perfil/${user.id}` ? "active" : ""
                }
              >
                <span>perfil</span>
              </li>
            </Link>
            <Link to={`/perfil/${user.id}/scraps`}>
              <li
                className={
                  location.pathname === `/perfil/${user.id}/scraps`
                    ? "active"
                    : ""
                }
              >
                <span>scraps</span>
                <Badge>{user.Scraps.length > 0 && user.Scraps.length}</Badge>
              </li>
            </Link>
            <Link to={`/perfil/${user.id}/albuns`}>
              <li
                className={
                  location.pathname.startsWith(`/perfil/${user.id}/albuns`)
                    ? "active"
                    : ""
                }
              >
                <span>fotos</span>
                <Badge>{user.Photos.length > 0 && user.Photos.length}</Badge>
              </li>
            </Link>
            <Link to={`/perfil/${user.id}/videos`}>
              <li
                className={
                  location.pathname === `/perfil/${user.id}/videos`
                    ? "active"
                    : ""
                }
              >
                <span>videos</span>
                <Badge>{user.Videos.length > 0 && user.Videos.length}</Badge>
              </li>
            </Link>
            <Link to={`/perfil/${user.id}/depoimentos`}>
              <li
                className={
                  location.pathname === `/perfil/${user.id}/depoimentos`
                    ? "active"
                    : ""
                }
              >
                <span>depoimentos</span>
                <Badge>
                  {user.Testimonials.length > 0 && user.Testimonials.length}
                </Badge>
              </li>
            </Link>
          </ul>
          <h3>Ações</h3>
          <ul>
            <li onClick={handleConfig}>
              <FakeLink>Configurações</FakeLink>
            </li>
            <li onClick={handleLogout}>
              <FakeLink>Sair</FakeLink>
            </li>
          </ul>
        </ProfileMenu>
      </DrawerContainer>
    </DrawerMenu>
  );
};

export default Drawer;
