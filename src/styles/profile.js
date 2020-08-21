import styled from "styled-components";

// Main

// profile container breakpoints
const bigger = 966;
const big = 866;
const medium = 766;
const small = 666;
const tiny = 566;

export const Main = styled.main`
  font-size: 0.9em;
  display: flex;
  flex-direction: row;
`;

export const LeftColumn = styled.div`
  display: flex;
  margin-right: 0.6rem;
  flex-direction: column;
  min-width: ${0.17 * bigger}px;
  max-width: 150px;
  flex-shrink: 1;

  @media (max-width: 1015px) {
    & {
      min-width: ${0.18 * big}px;
    }
  }
  @media (max-width: 920px) {
    & {
      min-width: ${0.18 * medium}px;
    }
  }
  @media (max-width: 825px) {
    & {
      min-width: ${0.18 * small}px;
    }
  }
  @media (max-width: 785px) {
    & {
      min-width: ${0.18 * tiny}px;
    }
  }
`;

export const MainColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    /* min-width: ${(props) =>
      props.stretched ? 0.72 * bigger : 0.52 * bigger}px; */
    max-width: 100vw;

    /* @media (max-width: 1015px) {
        & {
            min-width: ${(props) =>
              props.stretched ? 0.72 * big : 0.52 * big}px;
        }
    }
    @media (max-width: 920px) {
        & {
            min-width: ${(props) =>
              props.stretched ? 0.72 * medium : 0.52 * medium}px;
        }
    }
    @media (max-width: 825px) {
        & {
            min-width: ${(props) =>
              props.stretched ? 0.72 * small : 0.52 * small}px;
        }
    }
    @media (max-width: 785px) {
        & {
            min-width: ${(props) =>
              props.stretched ? 0.72 * tiny : 0.52 * tiny}px;
        }
    } */
`;

export const RightColumn = styled.div`
    margin-left: .6rem;
    display: flex;
    flex-direction: column;
    width: 280px;
    flex-shrink: 10;

    @media (max-width: 920px) {
        & {
            width: 250px;
        }
    }
    @media (max-width: 850px) {
        & {
            width: 220px;
        }
    }

    /* @media (max-width: 1015px) {
        & {
            min-width: ${0.2 * big}px;
        }
    }
    @media (max-width: 920px) {
        & {
            min-width: ${0.2 * medium}px;
        }
    }
    @media (max-width: 825px) {
        & {
            min-width: ${0.2 * small}px;
        }
    }
    @media (max-width: 785px) {
        & {
            min-width: ${0.2 * tiny}px;
        }
    } */
`;

export const ProfileImage = styled.div`
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: block;
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 0.6rem;

  cursor: ${(props) => (props.pointer ? "pointer" : "")};
  &:hover div {
    opacity: 0.9;
  }
`;

export const ChangeImageTag = styled.div`
  opacity: 0;

  background: #ffff;
  padding: 0.5rem;
  text-align: center;

  position: absolute;
  bottom: 0;
  width: 100%;
  transition: opacity 0.2s linear;
`;

export const ProfileMenu = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1em;
  padding-bottom: 1rem;

  a {
    color: inherit;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;

    &:hover {
      color: black;
      background: #eeeeee;
    }
  }

  .vibes {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }

  & .disabled {
    cursor: not-allowed;
    color: grey;
  }

  h2 {
    padding: 0.6rem 0.8rem;
    margin: 0;
    border-bottom: 0.3px solid #e3e8f5;
  }

  p {
    color: #afafaf;
    font-style: italic;
    border-bottom: 0.3px solid #e3e8f5;
    padding: 0 0.8rem 0.8rem 0.8rem;
    margin: 0;
  }

  h3 {
    padding: 0.6rem 0.8rem;
    color: grey;
    margin-bottom: 0;
  }

  .active {
    color: #89b1d6;
    font-weight: bold;
    border-left: 5px solid #89b1d6;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0.8rem;
  border-top: ${(props) => (props.bordertop ? ".3px solid #e3e8f5" : "")};
  border-bottom: ${(props) => (props.borderbottom ? ".3px solid #e3e8f5" : "")};
`;

export const InlineHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;

  & div span {
    padding: 0 0.5rem;
  }
  & div span:first-of-type {
    border-right: 0.5px solid #bebebe;
  }
  button {
    margin: 0 0.5rem;
  }
`;

export const ProfileSection = styled.div`
  padding: 0 0 2rem 0;
  border-bottom: ${(props) => (props.border ? ".3px solid #e3e8f5" : "")};
`;

export const FriendSuggestionGrid = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
`;

export const SuggestionContainer = styled.div`
  display: flex;
  /* overflow-x: hidden; */
  margin-bottom: 0.6rem;
`;

export const SuggestionImageContainer = styled.div`
  margin-right: 0.3rem;
`;

export const SuggestionBody = styled.div`
  display: flex;
  flex: 1;

  position: relative;
  flex-direction: column;
  flex-wrap: wrap;

  justify-content: space-between;
`;

export const ProfileFriends = styled(ProfileInfo)`
  /* padding-bottom: 1rem; */
  input {
    width: 100%;
  }

  div:first-of-type {
    /* padding-bottom: 1rem; */
  }
`;

export const FriendsList = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-rows: 100px 100px 100px; */
  grid-gap: 1rem;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const LastImages = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
`;

// Scraps
export const CommentSectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

export const CommentSectionFooter = styled(CommentSectionHeader)`
  justify-content: flex-end;
`;

export const CommentSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

export const Comment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  padding: 0.8rem 0.6rem;
  margin: 0.2rem 0;
  background: #e2e8fd;

  @media (max-width: 776px) {
    & {
      font-size: 0.9em;
      padding: 0.8rem 0.2rem;
    }
  }
`;

export const CommentBody = styled.div`
  width: 100%;
  overflow-wrap: break-word;
  padding-left: 1rem;
`;

export const CommentContent = styled.div`
  padding: 0.2rem 0 0.4rem 0;
  overflow-wrap: break-word;
  max-width: 100%;

  img {
    max-width: 100%;
  }
`;

export const CommentCheckbox = styled.div`
  padding-right: 0.5rem;
  @media (max-width: 776px) {
    & {
      padding-right: 0.2rem;
    }
  }
`;

export const PaginationBlock = styled.div`
  span {
    padding: 0 0.5rem;
  }
  span:last-child {
    padding-right: 0;
  }
  span:not(:last-child) {
    border-right: ${(props) =>
      props.noborder ? "none" : ".5px solid #bebebe"};
  }

  @media (max-width: 776px) {
    & {
      font-size: 0.8em;
    }
  }
`;

export const Page = styled.span`
  color: #afafaf;
`;

// Photos

export const PhotoList = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem 0;

  display: flex;
  flex-wrap: wrap;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0.6rem 0;
    flex: 1;
  }

  /* display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: .6rem; */
`;

export const PhotoContainer = styled.div`
  display: flex;

  padding: 0 0.6rem 1rem 0.6rem;
`;

export const ImageArrow = styled.div`
  display: flex;
  align-items: center;
  font-size: 2em;
  color: ${(props) => (props.disabled ? "#e6e6e6" : "")};

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover .arrow-icon {
    color: ${(props) => (props.disabled ? "#e6e6e6" : "grey")};
  }
`;

export const ImageContain = styled.div`
  flex-grow: 1;
  min-height: 66vh;

  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  &:hover {
    cursor: zoom-in;
  }
`;

export const FullscreenImageModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
`;

export const OrkutStyles = styled.div`
  button {
    margin: 0;
    border-radius: 0;
  }
  button:first-of-type {
    margin-left: 0.3rem;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }
  button:last-of-type {
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
`;
