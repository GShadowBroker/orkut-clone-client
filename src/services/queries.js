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

// Mutations
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