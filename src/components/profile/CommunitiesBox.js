import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Subtitle2,
  Image,
  SearchInputContainer,
  SearchInputIcon,
} from "../../styles/layout";
import { ProfileFriends, FriendsList } from "../../styles/profile";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import trunc from "../../utils/truncate";

const CommunitiesBox = ({ user }) => {
  const [communities, setCommunities] = useState(
    user.Subscriptions.slice(0, 9)
  );

  useEffect(() => {
    setCommunities(user.Subscriptions.slice(0, 9));
  }, [user]);

  const onChange = ({ target }) => {
    if (target.value === "") {
      setCommunities(user.Subscriptions.slice(0, 9));
      return;
    }
    let searchedComms = user.Subscriptions.filter((c) =>
      c.title.toLowerCase().includes(target.value.toLowerCase())
    );
    setCommunities(searchedComms.slice(0, 9));
  };
  return (
    <Card>
      <ProfileFriends>
        <div style={{ paddingBottom: "1rem" }}>
          <Subtitle2>Comunidades ({user.Subscriptions.length})</Subtitle2>
          <SearchInputContainer noborderright>
            <Input placeholder="buscar comunidades" onChange={onChange} />
            <SearchInputIcon noborderleft>
              <BsSearch />
            </SearchInputIcon>
          </SearchInputContainer>
        </div>
        <FriendsList style={{ paddingBottom: "1rem" }}>
          {communities.map((c) => (
            <Link to={`/comunidades/${c.id}`} key={c.id}>
              <div>
                <Image size="70" url={c.picture} />
                <span>{trunc(c.title, 30)}</span>
              </div>
            </Link>
          ))}
        </FriendsList>
      </ProfileFriends>
    </Card>
  );
};

export default CommunitiesBox;
