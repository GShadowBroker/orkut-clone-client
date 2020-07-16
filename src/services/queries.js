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

export const GET_ALL_COMMUNITIES = gql`
    query allCommunities {
        allCommunities {
            id
            title
            picture
            description
            category
            language
            Members {
                id
                name
            }
            createdAt
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
    query getUserScraps($receiverId: ID!) {
        findScraps(receiverId: $receiverId) {
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
    query getUserPhotos($userId: ID!) {
        findPhotos(userId: $userId) {
            id
            url
            description
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
        $requesterId: ID!,
        $requesteeId: ID!
    ) {
        sendFriendRequest(
            requesterId: $requesterId,
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
        $requesteeId: ID!,
        $accept: Boolean!
    ) {
        respondFriendRequest(
            requesterId: $requesterId,
            requesteeId: $requesteeId,
            accept: $accept
        ) {
            id
            name
        }
    }
`

export const UNFRIEND = gql`
    mutation unfriend(
        $userId: ID!
        $friendId: ID!
    ) {
        unfriend(
            userId: $userId
            friendId: $friendId
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

export const JOIN_COMMUNITY = gql`
    mutation joinCommunity(
        $userId: ID!
        $communityId: ID!
    ) {
        joinCommunity(
            userId: $userId
            communityId: $communityId
        ) {
            id
        }
    }
`

export const LEAVE_COMMUNITY = gql`
    mutation leaveCommunity(
        $userId: ID!
        $communityId: ID!
    ) {
        leaveCommunity(
            userId: $userId
            communityId: $communityId
        ) {
            id
        }
    }
`