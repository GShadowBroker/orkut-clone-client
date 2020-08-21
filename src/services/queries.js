import { gql } from "@apollo/client";

// Queries
export const GET_ALL_USERS = gql`
  query getAllUsers($filter: String, $limit: Int, $offset: Int) {
    allUsers(filter: $filter, limit: $limit, offset: $offset) {
      count
      rows {
        id
        name
        profile_picture
        age
        city
        country
      }
    }
  }
`;

export const FIND_USER = gql`
  query findUser($userId: ID!) {
    findUser(userId: $userId) {
      id
      name
      email
      city
      country
      born
      age
      sex
      about
      profile_picture
      Friends {
        id
        name
        profile_picture
      }
      Requesters {
        id
        name
        profile_picture
      }
      Subscriptions {
        id
        title
        picture
      }
      Photos {
        id
        url
        description
        folderId
      }
      Videos {
        id
        url
      }
      Posts {
        id
        body
      }
      Scraps {
        id
      }
      Testimonials {
        id
      }
    }
  }
`;
export const FETCH_FEED = gql`
  query fetchFeed($limit: Int, $offset: Int) {
    getFeed(limit: $limit, offset: $offset) {
      count
      rows {
        id
        createdAt
        body
        picture
        action
        object
        User {
          id
          name
          profile_picture
        }
      }
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query getSuggestions {
    getFriendSuggestions {
      id
      name
      profile_picture
    }
  }
`;

export const GET_ALL_COMMUNITIES = gql`
  query getAllCommunities(
    $creatorId: ID
    $filter: String
    $limit: Int
    $offset: Int
    $limitTopic: Int
    $offsetTopic: Int
    $limitComment: Int
    $offsetComment: Int
  ) {
    allCommunities(
      creatorId: $creatorId
      filter: $filter
      limit: $limit
      offset: $offset
      limitTopic: $limitTopic
      offsetTopic: $offsetTopic
      limitComment: $limitComment
      offsetComment: $offsetComment
    ) {
      count
      rows {
        id
        title
        picture
        creatorId
        Topics {
          id
          title
          createdAt
        }
        Comments {
          id
          createdAt
        }
      }
    }
  }
`;

export const GET_COMMUNITY_MEMBERS_COUNT = gql`
  query getCommunityMembersCount($communityId: ID!) {
    getCommunityMembersCount(communityId: $communityId)
  }
`;

export const GET_FRIENDS = gql`
  query getFriends($userId: ID!) {
    findFriends(userId: $userId) {
      id
      name
      profile_picture
    }
  }
`;

export const GET_FRIEND_REQUESTS = gql`
  query getFriendRequests($userId: ID!) {
    findRequesters(userId: $userId) {
      id
      name
      profile_picture
    }
  }
`;

// WIP
export const GET_USER_COMMUNITIES = gql`
  query getUserCommunities($userId: ID!) {
    findSubscriptions(userId: $userId) {
      id
      title
      picture
    }
  }
`;

export const GET_USER_SCRAPS = gql`
  query getUserScraps($receiverId: ID!, $limit: Int, $offset: Int) {
    findScraps(receiverId: $receiverId, limit: $limit, offset: $offset) {
      count
      rows {
        id
        createdAt
        body
        Sender {
          id
          name
          profile_picture
        }
      }
    }
  }
`;

export const GET_USER_TESTIMONIALS = gql`
  query getUserTestimonials($receiverId: ID!) {
    findTestimonials(receiverId: $receiverId) {
      id
      createdAt
      body
      Sender {
        id
        name
        profile_picture
      }
    }
  }
`;

export const GET_USER_UPDATES = gql`
  query getUserUpdates($userId: ID!) {
    findUpdates(userId: $userId) {
      id
      createdAt
      body
      action
      picture
      object
      User {
        id
        name
        profile_picture
      }
    }
  }
`;

export const GET_USER_ALBUNS = gql`
  query getUserAlbuns($userId: ID!) {
    findPhotoFolders(userId: $userId) {
      id
      createdAt
      title
      visible_to_all
      userId
      Photos {
        id
        url
      }
    }
  }
`;

export const GET_USER_PHOTOS = gql`
  query getUserPhotos($userId: ID!, $folderId: ID!, $limit: Int, $offset: Int) {
    findPhotos(
      userId: $userId
      folderId: $folderId
      limit: $limit
      offset: $offset
    ) {
      count
      rows {
        id
        url
        description
      }
    }
  }
`;

export const GET_PHOTO_COMMENTS = gql`
  query getPhotoComments($photoId: ID!, $limit: Int, $offset: Int) {
    findPhotoComments(photoId: $photoId, limit: $limit, offset: $offset) {
      count
      rows {
        id
        createdAt
        body
        Sender {
          id
          name
          profile_picture
        }
      }
    }
  }
`;

export const FIND_COMMUNITY = gql`
  query findCommunity($communityId: ID!) {
    findCommunity(communityId: $communityId) {
      id
      createdAt
      title
      picture
      description
      type
      language
      country
      Creator {
        id
        name
      }
      Category {
        id
        title
      }
    }
  }
`;

export const FETCH_MEMBERS = gql`
  query fetchMembers(
    $communityId: ID!
    $filter: String
    $random: Boolean
    $limit: Int
    $offset: Int
  ) {
    findCommunityMembers(
      communityId: $communityId
      filter: $filter
      random: $random
      limit: $limit
      offset: $offset
    ) {
      count
      rows {
        id
        name
        profile_picture
        age
        city
        country
      }
    }
  }
`;

export const FETCH_TOPICS = gql`
  query fetchTopics(
    $communityId: ID!
    $filter: String
    $limit: Int
    $offset: Int
    $limitComment: Int
    $offsetComment: Int
  ) {
    findCommunityTopics(
      communityId: $communityId
      filter: $filter
      limit: $limit
      offset: $offset
      limitComment: $limitComment
      offsetComment: $offsetComment
    ) {
      count
      rows {
        id
        createdAt
        title
        body
        TopicCreator {
          id
          name
          profile_picture
        }
        Comments {
          id
          createdAt
          body
        }
      }
    }
  }
`;

export const FETCH_COMMENTS = gql`
  query fetchComments(
    $topicId: ID!
    $order: Order!
    $limit: Int
    $offset: Int
  ) {
    findTopicComments(
      topicId: $topicId
      order: $order
      limit: $limit
      offset: $offset
    ) {
      count
      rows {
        id
        createdAt
        body
        Sender {
          id
          name
          profile_picture
        }
      }
    }
  }
`;

export const FIND_TOPIC = gql`
  query findTopic($topicId: ID!, $limit: Int, $offset: Int) {
    findTopic(topicId: $topicId, limit: $limit, offset: $offset) {
      id
      createdAt
      title
      body
      TopicCreator {
        id
        name
        profile_picture
      }
      Comments {
        id
        createdAt
        body
        Sender {
          id
          name
          profile_picture
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    allCategories {
      id
      title
    }
  }
`;

export const FIND_USER_VIDEOS = gql`
  query findUserVideos($userId: ID!, $limit: Int, $offset: Int) {
    findVideos(userId: $userId, limit: $limit, offset: $offset) {
      count
      rows {
        id
        createdAt
        url
        description
        userId
      }
    }
  }
`;

// Mutations
export const LOGIN = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password) {
      id
      value
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $email: EmailAddress!
    $password: String!
    $born: Date!
    $name: String!
    $sex: Sex
    $country: String!
  ) {
    register(
      email: $email
      password: $password
      born: $born
      name: $name
      sex: $sex
      country: $country
    ) {
      id
      email
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $name: String!
    $born: Date!
    $country: String!
    $city: String
    $sex: Sex
    $interests: String
    $about: String
  ) {
    editProfile(
      name: $name
      born: $born
      country: $country
      city: $city
      sex: $sex
      interests: $interests
      about: $about
    ) {
      id
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($requesteeId: ID!) {
    sendFriendRequest(requesteeId: $requesteeId) {
      requesterId
      requesteeId
    }
  }
`;

export const RESPOND_FRIEND_REQUEST = gql`
  mutation respondFriendRequest($requesterId: ID!, $accept: Boolean!) {
    respondFriendRequest(requesterId: $requesterId, accept: $accept) {
      id
      name
    }
  }
`;

export const UNFRIEND = gql`
  mutation unfriend($friendId: ID!) {
    unfriend(friendId: $friendId) {
      id
    }
  }
`;

export const UPDATE_PROFILE_PICTURE = gql`
  mutation updateProfilePicture($newPhoto: String!) {
    updateProfilePicture(newPhoto: $newPhoto) {
      id
    }
  }
`;

export const SEND_SCRAP = gql`
  mutation sendScrap($body: String!, $userId: ID!) {
    sendScrap(body: $body, userId: $userId) {
      id
    }
  }
`;

export const REMOVE_SCRAP = gql`
  mutation removeScrap($userId: ID!, $scrapId: ID!) {
    deleteScrap(userId: $userId, scrapId: $scrapId) {
      id
    }
  }
`;

export const SEND_TESTIMONIAL = gql`
  mutation sendTestimonial($body: String!, $userId: ID!) {
    sendTestimonial(body: $body, userId: $userId) {
      id
    }
  }
`;

export const REMOVE_TESTIMONIAL = gql`
  mutation removeTestimonial($userId: ID!, $testimonialId: ID!) {
    deleteTestimonial(userId: $userId, testimonialId: $testimonialId) {
      id
    }
  }
`;

export const SEND_UPDATE = gql`
  mutation sendUpdate($body: String!) {
    sendUpdate(body: $body) {
      id
    }
  }
`;

export const CREATE_NEW_ALBUM = gql`
  mutation createNewAlbum($title: String, $visible_to_all: Boolean) {
    createPhotoFolder(title: $title, visible_to_all: $visible_to_all) {
      id
    }
  }
`;

export const REMOVE_ALBUM = gql`
  mutation removeAlbum($folderId: ID!) {
    deletePhotoFolder(folderId: $folderId) {
      id
    }
  }
`;

export const UPLOAD_NEW_PHOTOS = gql`
  mutation uploadNewPhotos($photos: [String]!, $folderId: ID!) {
    uploadPhotos(photos: $photos, folderId: $folderId)
  }
`;

export const SEND_PHOTO_COMMENT = gql`
  mutation sendPhotoComment($body: String!, $photoId: ID!) {
    createPhotoComment(body: $body, photoId: $photoId) {
      id
    }
  }
`;

export const REMOVE_PHOTO_COMMENT = gql`
  mutation removePhotoComment($commentId: ID!) {
    deletePhotoComment(commentId: $commentId) {
      id
    }
  }
`;

export const SEND_VIDEO = gql`
  mutation sendVideo($url: String!, $description: String) {
    saveVideo(url: $url, description: $description) {
      id
    }
  }
`;

export const REMOVE_VIDEO = gql`
  mutation removeVideo($videoId: ID!) {
    deleteVideo(videoId: $videoId) {
      id
    }
  }
`;

export const CREATE_NEW_COMMUNITY = gql`
  mutation createNewCommunity(
    $title: String!
    $categoryId: ID!
    $type: String!
    $language: String!
    $country: String!
    $picture: String!
    $description: String
  ) {
    createCommunity(
      title: $title
      categoryId: $categoryId
      type: $type
      language: $language
      country: $country
      picture: $picture
      description: $description
    ) {
      id
    }
  }
`;

export const JOIN_COMMUNITY = gql`
  mutation joinCommunity($communityId: ID!) {
    joinCommunity(communityId: $communityId) {
      id
    }
  }
`;

export const LEAVE_COMMUNITY = gql`
  mutation leaveCommunity($communityId: ID!) {
    leaveCommunity(communityId: $communityId) {
      id
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation createTopic($communityId: ID!, $title: String!, $body: String!) {
    createTopic(communityId: $communityId, title: $title, body: $body) {
      id
    }
  }
`;

export const REMOVE_TOPIC = gql`
  mutation removeTopic($topicId: ID!) {
    deleteTopic(topicId: $topicId) {
      id
    }
  }
`;

export const SEND_COMMENT = gql`
  mutation sendComment($topicId: ID!, $body: String!) {
    sendTopicComment(topicId: $topicId, body: $body) {
      id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($topicCommentId: ID!) {
    deleteTopicComment(topicCommentId: $topicCommentId) {
      id
    }
  }
`;
