import { gql } from '@apollo/client'

// Queries
export const GET_ALL_USERS = gql`
    query getAllUsers {
        allUsers {
            id
            name
            email
            city
            country
            profile_picture
            Friends {
                id
                name
            }
            Requesters {
                id
                name
            }
            Subscriptions {
                id
                title
                picture
            }
        }
    }
`

export const FIND_USER = gql`
    query findUser(
        $userId: ID!
    ) {
        findUser(
            userId: $userId
        ) {
            id
            name
            email
            city
            country
            born
            age
            gender
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
            }
            Updates {
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
`
export const GET_FEED = gql`
    query getFeed($limit: Int, $offset: Int) {
        getFeed(limit: $limit, offset: $offset) {
            id
            createdAt
            body
            picture
            verb
            object
            User {
                id
                name
                profile_picture
            }
        }
    }
`

// Remove Topics altogether
export const GET_ALL_COMMUNITIES = gql`
    query allCommunities {
        allCommunities {
            id
            createdAt
            title
            picture
            description
            language
            type
            Creator {
                id
                name
            }
            Members {
                id
            }
            Category {
                title
            },
            Topics {
                id,
                title,
                body,
                TopicCreator {
                    id
                    name
                },
                Comments {
                    id
                    body
                    Sender {
                        id
                        name
                    }
                }
            }
        }
    }
`

export const GET_FRIENDS = gql`
    query getFriends($userId: ID!) {
        findFriends(userId: $userId) {
            id
            name
            profile_picture
        }
    }
`

export const GET_FRIEND_REQUESTS = gql`
    query getFriendRequests($userId: ID!) {
        findRequesters(userId: $userId) {
            id
            name
            profile_picture
        }
    }
`

// WIP
export const GET_USER_COMMUNITIES = gql`
    query getUserCommunities($userId: ID!) {
        findSubscriptions(userId: $userId) {
            id
            title
            picture
        }
    }
`

export const GET_USER_SCRAPS = gql`
    query getUserScraps($receiverId: ID!, $limit: Int, $offset: Int) {
        findScraps(
            receiverId: $receiverId
            limit: $limit
            offset: $offset
        ) {
            count,
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
`

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
`

export const GET_USER_UPDATES = gql`
    query getUserUpdates($userId: ID!) {
        findUpdates(userId: $userId) {
            id
            body
        }
    }
`

export const GET_USER_PHOTOS = gql`
    query getUserPhotos($userId: ID!, $limit: Int, $offset: Int) {
        findPhotos(userId: $userId, limit: $limit, offset: $offset) {
            count,
            rows {
                id
                url
                description
            }
        }
    }
`


// Mutations
export const LOGIN = gql`
    mutation login(
        $email: EmailAddress!,
        $password: String!
    ) {
        login(
            email: $email,
            password: $password
        ) {
            id
            value
        }
    }
`

export const SEND_FRIEND_REQUEST = gql`
    mutation sendFriendRequest(
        $requesteeId: ID!
    ) {
        sendFriendRequest(
            requesteeId: $requesteeId
        ) {
            requesterId
            requesteeId
        }
    }
`

export const RESPOND_FRIEND_REQUEST = gql`
    mutation respondFriendRequest(
        $requesterId: ID!,
        $accept: Boolean!
    ) {
        respondFriendRequest(
            requesterId: $requesterId,
            accept: $accept
        ) {
            id
            name
        }
    }
`

export const UNFRIEND = gql`
    mutation unfriend(
        $friendId: ID!
    ) {
        unfriend(
            friendId: $friendId
        ) {
            id
        }
    }
`

export const SEND_SCRAP = gql`
    mutation sendScrap(
        $body: String!
        $userId: ID!
    ) {
        sendScrap(
            body: $body
            userId: $userId
        ) {
            id
        }
    }
`

export const REMOVE_SCRAP = gql`
    mutation removeScrap(
        $userId: ID!
        $scrapId: ID!
    ) {
        deleteScrap(
            userId: $userId,
            scrapId: $scrapId
        ) {
            id
        }
    }
`

export const SEND_TESTIMONIAL = gql`
    mutation sendTestimonial(
        $body: String!
        $userId: ID!
    ) {
        sendTestimonial(
            body: $body
            userId: $userId
        ) {
            id
        }
    }
`

export const REMOVE_TESTIMONIAL = gql`
    mutation removeTestimonial(
        $userId: ID!
        $testimonialId: ID!
    ) {
        deleteTestimonial(
            userId: $userId
            testimonialId: $testimonialId
        ) {
            id
        }
    }
`

export const JOIN_COMMUNITY = gql`
    mutation joinCommunity(
        $communityId: ID!
    ) {
        joinCommunity(
            communityId: $communityId
        ) {
            id
        }
    }
`

export const LEAVE_COMMUNITY = gql`
    mutation leaveCommunity(
        $communityId: ID!
    ) {
        leaveCommunity(
            communityId: $communityId
        ) {
            id
        }
    }
`