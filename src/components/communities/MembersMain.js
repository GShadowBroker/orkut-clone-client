import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  Subtitle,
  Image,
  Message,
  MessageContent,
  MessageBody,
  FakeLink,
  Input,
  SearchInputContainer,
  SearchInputIcon,
} from "../../styles/layout";
import {
  MainColumn,
  ProfileInfo,
  InlineHeader,
  CommentSectionFooter,
  PaginationBlock,
  Page,
  CommentSectionHeader,
} from "../../styles/profile";

import { useQuery, useLazyQuery } from "@apollo/client";
import { FETCH_MEMBERS } from "../../services/queries";
import Notification from "../utils/Notification";
import trunc from "../../utils/truncate";
import Breadcrumbs from "../utils/Breadcrumbs";

import Spinner from "react-loading";
import SearchSkeleton from "../skeletons/SearchSkeleton";
import { BsSearch } from "react-icons/bs";

const MembersMain = ({ user, community, topics }) => {
  const { communityId } = useParams();
  const [errors] = useState("");
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [memberSearch, setMemberSearch] = useState("");

  const [timeoutState, setTimeoutState] = useState(null);

  const { error, loading, data, fetchMore } = useQuery(FETCH_MEMBERS, {
    variables: { communityId: communityId, random: false, limit, offset },
  });

  const [
    fetchMembers,
    { loading: loadingMembers, data: dataMembers },
  ] = useLazyQuery(FETCH_MEMBERS);

  if (error) return <Notification />;
  if (loading) return <SearchSkeleton />;

  let members = data && data.findCommunityMembers.rows;
  const memberCount = data && data.findCommunityMembers.count;

  let pages = Math.ceil(memberCount / limit) || 1;
  let currentPage = offset / limit + 1;

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

  const handleMemberSearch = (e) => {
    e.preventDefault();
    setMemberSearch(e.target.value);
  };
  const searchMembers = () => {
    if (!memberSearch) {
      clearTimeout(timeoutState);
      setTimeoutState(null);
      return;
    }

    let timeoutId;
    if (!timeoutState) {
      timeoutId = setTimeout(() => {
        // Action after user stops typing
        console.log("searching for", memberSearch); //network request
        setTimeoutState(null);
        fetchMembers({
          variables: {
            communityId,
            filter: memberSearch,
            random: false,
            limit,
            offset,
          },
        });
      }, 2000);
      setTimeoutState(timeoutId);
    } else {
      clearTimeout(timeoutState);
      setTimeoutState(null);

      timeoutId = setTimeout(() => {
        // Action after user stops typing
        console.log("searching for", memberSearch); //network request
        setTimeoutState(null);
        fetchMembers({
          variables: {
            communityId,
            filter: memberSearch,
            random: false,
            limit,
            offset,
          },
        });
      }, 2000);
      setTimeoutState(timeoutId);
    }
  };

  let hasNextPage = limit < memberCount && offset !== (pages - 1) * limit;
  let hasPrevPage = offset >= limit;

  if (dataMembers && dataMembers.findCommunityMembers) {
    members = dataMembers.findCommunityMembers.rows;
    hasNextPage = false;
    hasPrevPage = false;
    pages = 1;
    currentPage = 1;
  }

  return (
    <MainColumn stretched>
      {errors && (
        <Notification title="Erro" message={errors} margin={"0 0 .6rem 0"} />
      )}

      <Card>
        <ProfileInfo>
          <InlineHeader style={{ paddingBottom: "0" }}>
            <Subtitle>Membros ({memberCount})</Subtitle>
          </InlineHeader>
          <Breadcrumbs community={community.title} />
        </ProfileInfo>

        <ProfileInfo>
          <CommentSectionFooter>
            <PaginationBlock noborder>
              {hasPrevPage ? (
                <Page onClick={firstPage}>
                  <FakeLink>primeira</FakeLink>
                </Page>
              ) : (
                <Page>primeira</Page>
              )}
              {hasPrevPage ? (
                <Page onClick={prevPage}>
                  <FakeLink>&lt; anterior</FakeLink>
                </Page>
              ) : (
                <Page>&lt; anterior</Page>
              )}
              <Page>
                {currentPage} de {pages}
              </Page>
              {hasNextPage ? (
                <Page onClick={nextPage}>
                  <FakeLink>próxima &gt;</FakeLink>
                </Page>
              ) : (
                <Page>próxima &gt;</Page>
              )}
              {hasNextPage ? (
                <Page onClick={lastPage}>
                  <FakeLink>última</FakeLink>
                </Page>
              ) : (
                <Page>última</Page>
              )}
            </PaginationBlock>
          </CommentSectionFooter>

          <SearchInputContainer
            noborderright
            style={{
              justifyContent: "flex-start",
              margin: "1rem 0",
            }}
          >
            <Input
              placeholder="buscar membros"
              value={memberSearch}
              onChange={handleMemberSearch}
              onKeyUp={searchMembers}
            />
            <SearchInputIcon noborderleft>
              <BsSearch />
            </SearchInputIcon>
            {(timeoutState || loadingMembers) && (
              <div style={{ display: "flex", paddingLeft: ".5rem" }}>
                <Spinner
                  type="spokes"
                  color="#3c88cf"
                  height="15px"
                  width="15px"
                />
                <span style={{ marginLeft: ".5rem", color: "grey" }}>
                  procurando usuário...
                </span>
              </div>
            )}
          </SearchInputContainer>
        </ProfileInfo>
      </Card>

      <Card>
        <ProfileInfo style={{ padding: "0 .8rem .5rem .8rem" }}>
          {members.map((m) => (
            <Message
              key={m.id}
              style={{ borderTop: ".3px solid #e3e8f5", margin: "0 0 .5rem 0" }}
            >
              <Link to={`/perfil/${m.id}`}>
                <Image size="70" url={m.profile_picture} />
              </Link>
              <MessageContent>
                <CommentSectionHeader style={{ margin: 0 }}>
                  <div>
                    <Link to={`/perfil/${m.id}`}>
                      <strong>{trunc(m.name, 50)}</strong>
                    </Link>
                  </div>
                </CommentSectionHeader>
                <MessageBody>
                  {m.country && (
                    <p style={{ color: "#afafaf", margin: ".2rem 0" }}>
                      {m.country}
                    </p>
                  )}
                  {m.city && (
                    <p style={{ color: "#afafaf", margin: ".2rem 0" }}>
                      {m.city}
                    </p>
                  )}
                  {m.age && (
                    <p style={{ color: "#afafaf", margin: ".2rem 0" }}>
                      {m.age} anos
                    </p>
                  )}
                </MessageBody>
              </MessageContent>
            </Message>
          ))}
          {members.length === 0 && (
            <span style={{ color: "#afafaf", marginBottom: ".5rem" }}>
              Nenhum membro encontrado
            </span>
          )}
        </ProfileInfo>

        {members.length > 0 && (
          <ProfileInfo>
            <CommentSectionFooter style={{ marginBottom: "1.5rem" }}>
              <PaginationBlock noborder>
                {hasPrevPage ? (
                  <Page onClick={firstPage}>
                    <FakeLink>primeira</FakeLink>
                  </Page>
                ) : (
                  <Page>primeira</Page>
                )}
                {hasPrevPage ? (
                  <Page onClick={prevPage}>
                    <FakeLink>&lt; anterior</FakeLink>
                  </Page>
                ) : (
                  <Page>&lt; anterior</Page>
                )}
                <Page>
                  {currentPage} de {pages}
                </Page>
                {hasNextPage ? (
                  <Page onClick={nextPage}>
                    <FakeLink>próxima &gt;</FakeLink>
                  </Page>
                ) : (
                  <Page>próxima &gt;</Page>
                )}
                {hasNextPage ? (
                  <Page onClick={lastPage}>
                    <FakeLink>última</FakeLink>
                  </Page>
                ) : (
                  <Page>última</Page>
                )}
              </PaginationBlock>
            </CommentSectionFooter>
          </ProfileInfo>
        )}
      </Card>
    </MainColumn>
  );
};

export default MembersMain;
