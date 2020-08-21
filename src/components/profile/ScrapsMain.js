import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/pt-br";

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  FIND_USER,
  GET_USER_SCRAPS,
  REMOVE_SCRAP,
} from "../../services/queries";

import {
  Card,
  Button,
  Select,
  Image,
  FakeLink,
  Time,
} from "../../styles/layout";
import {
  Main,
  MainColumn,
  ProfileInfo,
  CommentSectionHeader,
  CommentSectionFooter,
  PaginationBlock,
  CommentSection,
  Comment,
  CommentBody,
  CommentContent,
  CommentCheckbox,
} from "../../styles/profile";

import ScrapForm from "../ScrapForm";
import Breadcrumbs from "../utils/Breadcrumbs";
import Notification from "../utils/Notification";
import ProfileLeftSkeleton from "../skeletons/ProfileLeftSkeleton";
import ProfileMainSkeleton from "../skeletons/ProfileMainSkeleton";
import ProfileRightSkeleton from "../skeletons/ProfileRightSkeleton";
import ScrapsSkeleton from "../skeletons/ScrapsSkeleton";
import trunc from "../../utils/truncate";

const ScrapsMain = ({ loggedUser, mobile }) => {
  const { userId } = useParams();
  const [selected, setSelected] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const savedLimit = JSON.parse(window.localStorage.getItem("config"));
    if (savedLimit) {
      setLimit(Number(savedLimit.scrapLimit));
    }
  }, []);

  const [removeScrap, { loading: removeLoading }] = useMutation(REMOVE_SCRAP, {
    onError: (error) => {
      error.graphQLErrors
        ? alert(error.graphQLErrors[0].message)
        : alert("Server timeout");
    },
    refetchQueries: [
      {
        query: FIND_USER,
        variables: { userId },
      },
      {
        query: GET_USER_SCRAPS,
        variables: { receiverId: userId, limit, offset },
      },
    ],
  });

  const { error, loading, data } = useQuery(FIND_USER, {
    variables: { userId },
  });

  const {
    error: errorScraps,
    loading: loadingScraps,
    data: dataScraps,
    fetchMore,
  } = useQuery(GET_USER_SCRAPS, {
    variables: {
      receiverId: userId,
      limit,
      offset,
    },
  });

  if (error || errorScraps) return <Notification />;

  if (loading)
    return (
      <Main>
        <ProfileLeftSkeleton />
        <ProfileMainSkeleton />
        <ProfileRightSkeleton />
      </Main>
    );

  const user = data && data.findUser;

  if (loadingScraps) return <ScrapsSkeleton />;

  const scraps = dataScraps && dataScraps.findScraps.rows;
  const scrapCount = dataScraps && dataScraps.findScraps.count;

  const deleteScrap = (scrap) => {
    removeScrap({
      variables: {
        userId: loggedUser.id,
        scrapId: scrap.id,
      },
    });
  };

  const selectAll = () => {
    let newSelected = [...selected];
    scraps.forEach((s) => newSelected.push(s.id));
    console.log("new selected", newSelected);

    const checkboxes = document.querySelectorAll(".comment-checkbox");
    checkboxes.forEach((c) => (c.checked = true));

    setSelected(newSelected);
  };

  const resetSelect = () => {
    const checkboxes = document.querySelectorAll(".comment-checkbox");
    checkboxes.forEach((c) => (c.checked = false));

    setSelected([]);
  };

  const toggleSelected = (scrapId) => {
    if (selected.find((s) => s === scrapId)) {
      let newSelected = [...selected];
      let updatedSelected = newSelected.filter((s) => s !== scrapId);
      setSelected(updatedSelected);
      return;
    }
    let newSelected = [...selected];
    newSelected.push(scrapId);
    setSelected(newSelected);
  };

  const removeSelected = () => {
    if (!selected.length) return;

    selected.forEach((i) => {
      removeScrap({
        variables: {
          userId: loggedUser.id,
          scrapId: i,
        },
      });
    });
  };

  // Pagination Methods
  const pages = Math.ceil(scrapCount / limit) || 1;

  const nextPage = () => {
    fetchMore({
      variables: {
        offset: offset + limit,
      },
    });
    setOffset(offset + limit);
  };
  const prevPage = () => {
    fetchMore({
      variables: {
        offset: offset - limit,
      },
    });
    setOffset(offset - limit);
  };
  const firstPage = () => {
    fetchMore({
      variables: {
        offset: 0,
      },
    });
    setOffset(0);
  };
  const lastPage = () => {
    fetchMore({
      variables: {
        offset: (pages - 1) * limit,
      },
    });
    setOffset((pages - 1) * limit);
  };

  const hasNextPage = limit < scrapCount && offset !== (pages - 1) * limit;
  const hasPrevPage = offset >= limit;

  // Limit
  const handleLimitChange = ({ target }) => {
    const savedPreferences = JSON.parse(window.localStorage.getItem("config"));
    let preferences;
    if (savedPreferences) {
      preferences = {
        ...savedPreferences,
        scrapLimit: Number(target.value),
      };
    } else {
      preferences = {
        scrapLimit: Number(target.value),
      };
    }
    window.localStorage.setItem("config", JSON.stringify(preferences));
    setLimit(Number(target.value));
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <MainColumn stretched>
      <Card>
        <ProfileInfo>
          <ScrapForm
            user={user}
            loggedUser={loggedUser}
            limit={limit}
            offset={offset}
          />
        </ProfileInfo>
      </Card>

      <Card style={{ marginTop: ".6rem" }}>
        <ProfileInfo>
          <h2>
            {user.id === loggedUser.id
              ? "Minha página de scraps"
              : `Página de scraps de ${trunc(user.name, 30)}`}{" "}
            ({user.Scraps.length})
          </h2>
          <Breadcrumbs user={user.name} />
          <CommentSectionHeader>
            {user.id === loggedUser.id ? (
              <Button onClick={removeSelected} disabled={removeLoading}>
                {removeLoading
                  ? "excluindo scraps ..."
                  : "excluir scraps selecionados"}
              </Button>
            ) : (
              <span></span>
            )}
            <Select onChange={handleLimitChange} value={limit.toString()}>
              <option value="10">Ver 10 scraps</option>
              <option value="20">Ver 20 scraps</option>
            </Select>
          </CommentSectionHeader>
          <CommentSectionHeader>
            {user.id === loggedUser.id ? (
              <span>
                Selecionar: <FakeLink onClick={selectAll}>Todos</FakeLink>,{" "}
                <FakeLink onClick={resetSelect}>Nenhum</FakeLink>
              </span>
            ) : (
              <span></span>
            )}
            <PaginationBlock>
              {hasPrevPage ? (
                <span onClick={firstPage}>
                  <FakeLink>primeira</FakeLink>
                </span>
              ) : (
                <span>primeira</span>
              )}
              {hasPrevPage ? (
                <span onClick={prevPage}>
                  <FakeLink>&lt; anterior</FakeLink>
                </span>
              ) : (
                <span>&lt; anterior</span>
              )}
              {hasNextPage ? (
                <span onClick={nextPage}>
                  <FakeLink>próxima &gt;</FakeLink>
                </span>
              ) : (
                <span>próxima &gt;</span>
              )}
              {hasNextPage ? (
                <span onClick={lastPage}>
                  <FakeLink>última</FakeLink>
                </span>
              ) : (
                <span>última</span>
              )}
            </PaginationBlock>
          </CommentSectionHeader>

          <CommentSection>
            {scraps.map((scrap) => (
              <Comment key={scrap.id}>
                {loggedUser.id === user.id && (
                  <CommentCheckbox>
                    <input
                      className="comment-checkbox"
                      id={`scrapid_${scrap.id}`}
                      type="checkbox"
                      onChange={({ target }) => toggleSelected(scrap.id)}
                    />
                  </CommentCheckbox>
                )}
                <Link to={`/perfil/${scrap.Sender.id}`}>
                  <Image url={scrap.Sender.profile_picture} size="70" />
                </Link>
                <CommentBody>
                  <CommentSectionHeader style={{ margin: 0 }}>
                    <Link to={`/perfil/${scrap.Sender.id}`}>
                      {trunc(scrap.Sender.name, 25)}:
                    </Link>
                    <div>
                      <Time size="1">
                        {new Date(scrap.createdAt).toLocaleString(
                          "pt-BR",
                          timeOptions
                        )}{" "}
                        ({moment(scrap.createdAt).fromNow()})
                      </Time>
                      {user.id === loggedUser.id ||
                      scrap.Sender.id === loggedUser.id ? (
                        <Button onClick={() => deleteScrap(scrap)}>
                          apagar
                        </Button>
                      ) : null}
                    </div>
                  </CommentSectionHeader>
                  <CommentContent>
                    <div dangerouslySetInnerHTML={{ __html: scrap.body }} />
                  </CommentContent>
                  <FakeLink>Responder</FakeLink>
                </CommentBody>
              </Comment>
            ))}
          </CommentSection>
          <CommentSectionFooter>
            {scraps.length > 0 && (
              <PaginationBlock>
                {hasPrevPage ? (
                  <span onClick={firstPage}>
                    <FakeLink>primeira</FakeLink>
                  </span>
                ) : (
                  <span>primeira</span>
                )}
                {hasPrevPage ? (
                  <span onClick={prevPage}>
                    <FakeLink>&lt; anterior</FakeLink>
                  </span>
                ) : (
                  <span>&lt; anterior</span>
                )}
                {hasNextPage ? (
                  <span onClick={nextPage}>
                    <FakeLink>próxima &gt;</FakeLink>
                  </span>
                ) : (
                  <span>próxima &gt;</span>
                )}
                {hasNextPage ? (
                  <span onClick={lastPage}>
                    <FakeLink>última</FakeLink>
                  </span>
                ) : (
                  <span>última</span>
                )}
              </PaginationBlock>
            )}
          </CommentSectionFooter>
        </ProfileInfo>
      </Card>
    </MainColumn>
  );
};

export default ScrapsMain;
