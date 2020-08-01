// import React, { useState } from 'react'
// import { Main } from '../styles/profile'
// import { useParams } from 'react-router-dom'

// import { useQuery, useMutation } from '@apollo/client'
// import { 
//     FIND_COMMUNITY,
//     FIND_COMMUNITY_MEMBERS, 
//     FIND_COMMUNITY_TOPICS,
//     JOIN_COMMUNITY,
//     LEAVE_COMMUNITY,
//     FIND_USER
// } from '../services/queries'

// import CommunityLeft from '../components/communities/CommunityLeft'
// import TopicMain from '../components/communities/TopicMain'

// import Notification from '../components/utils/Notification'
// import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
// import Error404 from './404Error'
// import errorHandler from '../utils/errorHandler'

// const Topic = ({ loggedUser, crumbs }) => {
//     const { communityId } = useParams()
//     const [errors, setErrors] = useState('')
//     const [newTopicFormOpen, setNewTopicFormOpen] = useState(false)

//     const { error, loading, data } = useQuery(FIND_COMMUNITY, {
//         variables: { communityId }
//     })
//     const { error: errorMembers, loading: loadingMembers, data: dataMembers } = useQuery(FIND_COMMUNITY_MEMBERS, {
//         variables: { communityId, limit: 9 }
//     })
//     const { error: errorTopics, loading: loadingTopics, data: dataTopics } = useQuery(FIND_COMMUNITY_TOPICS, {
//         variables: { communityId, limit: 5, offset: 0 }
//     })
//     const [joinCommunity, { loading: loadingJoin }] = useMutation(JOIN_COMMUNITY, {
//         onError: error => errorHandler(error, setErrors),
//         refetchQueries: [
//             { query: FIND_COMMUNITY, variables: { communityId } },
//             { query: FIND_USER, variables: { userId: loggedUser.id } }
//         ]
//     })
//     const [leaveCommunity, { loading: loadingLeave }] = useMutation(LEAVE_COMMUNITY, {
//         onError: error => errorHandler(error, setErrors),
//         refetchQueries: [
//             { query: FIND_COMMUNITY, variables: { communityId } },
//             { query: FIND_USER, variables: { userId: loggedUser.id } }
//         ]
//     })

//     const handleJoinCommunity = () => {
//         joinCommunity({
//             variables: {
//                 communityId
//             }
//         })
//     }
//     const handleLeaveCommunity = () => {
//         leaveCommunity({
//             variables: {
//                 communityId
//             }
//         })
//     }

//     if (loading || loadingMembers || loadingTopics) return <ProfileSkeleton />

//     if (error || errorMembers || errorTopics) return (
//         <Notification />
//     )

//     const community = data && data.findCommunity
//     const members = dataMembers && dataMembers.findCommunityMembers.rows
//     const memberCount = dataMembers && dataMembers.findCommunityMembers.count
//     const topics = dataTopics && dataTopics.findCommunityTopics.rows
//     const topicCount = dataTopics && dataTopics.findCommunityTopics.count

//     if (!community) return <Error404 />

//     return (
//         <Main>
//             <CommunityLeft
//                 user={ loggedUser }
//                 community={ community }
//                 members={ members }
//                 memberCount={ memberCount }
//                 topics={ topics }
//                 topicCount={ topicCount }
//                 handleJoinCommunity={ handleJoinCommunity }
//                 loadingJoin={ joinCommunity }
//                 handleLeaveCommunity={ handleLeaveCommunity }
//                 loadingLeave={ loadingLeave }
//             />
//             <TopicMain
//                 user={ loggedUser } 
//                 community={ community }
//                 topics={ topics }
//                 crumbs={ crumbs }
//             />
//         </Main>
//     )
// }

// export default Topic