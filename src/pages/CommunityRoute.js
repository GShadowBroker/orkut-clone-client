import React, { useState } from 'react'
import { Main } from '../styles/profile'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { 
    FIND_COMMUNITY, 
    FETCH_MEMBERS, 
    FETCH_TOPICS,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
    FIND_USER
} from '../services/queries'

import CommunityLeft from '../components/communities/CommunityLeft'
import CommunityMain from '../components/communities/CommunityMain'
import CommunityRight from '../components/communities/CommunityRight'

import Notification from '../components/utils/Notification'
import errorHandler from '../utils/errorHandler'

import CommunityLeftSkeleton from '../components/skeletons/CommunityLeftSkeleton'
import CommunityMainSkeleton from '../components/skeletons/CommunityMainSkeleton'
import CommunityRightSkeleton from '../components/skeletons/CommunityRightSkeleton'

import TopicMain from '../components/communities/TopicMain'
import MembersMain from '../components/communities/MembersMain'
import ForumMain from '../components/communities/ForumMain'

const CommunityRoute = ({ loggedUser }) => {
    const match = useRouteMatch()

    const { communityId } = useParams()
    const [errors, setErrors] = useState('')
    const [newTopicFormOpen, setNewTopicFormOpen] = useState(false)

    const { error, loading, data } = useQuery(FIND_COMMUNITY, {
        variables: { communityId }
    })
    const { error: errorMembers, loading: loadingMembers, data: dataMembers } = useQuery(FETCH_MEMBERS, {
        variables: { communityId, random: true, limit: 9 }
    })
    const { error: errorTopics, loading: loadingTopics, data: dataTopics } = useQuery(FETCH_TOPICS, {
        variables: { communityId, limit: 5, offset: 0, limitComment: 1 }
    })
    const [joinCommunity, { loading: loadingJoin }] = useMutation(JOIN_COMMUNITY, {
        onError: error => errorHandler(error, setErrors),
        refetchQueries: [
            { query: FIND_COMMUNITY, variables: { communityId } },
            { query: FIND_USER, variables: { userId: loggedUser.id } }
        ]
    })
    const [leaveCommunity, { loading: loadingLeave }] = useMutation(LEAVE_COMMUNITY, {
        onError: error => errorHandler(error, setErrors),
        refetchQueries: [
            { query: FIND_COMMUNITY, variables: { communityId } },
            { query: FIND_USER, variables: { userId: loggedUser.id } }
        ]
    })

    if (loading || loadingMembers || loadingTopics) return (
        <Main>
            <CommunityLeftSkeleton />
            <CommunityMainSkeleton />
            <CommunityRightSkeleton />
        </Main>
    )

    if (error || errorMembers || errorTopics || errors) return (
        <Notification message={ errors ? errors : null } />
    )

    const community = data && data.findCommunity
    const members = dataMembers && dataMembers.findCommunityMembers.rows
    const memberCount = dataMembers && dataMembers.findCommunityMembers.count
    const topics = dataTopics && dataTopics.findCommunityTopics.rows
    const topicCount = dataTopics && dataTopics.findCommunityTopics.count

    const handleJoinCommunity = () => {
        const answer = window.confirm(`Deseja participar da comunidade ${community.title}?`)
        if (!answer) return
        joinCommunity({
            variables: {
                communityId
            }
        })
    }
    const handleLeaveCommunity = () => {
        const answer = window.confirm(`Deseja mesmo sair da comunidade ${community.title}?`)
        if (!answer) return
        leaveCommunity({
            variables: {
                communityId
            }
        })
    }

    return (
        <Main>
            <CommunityLeft
                user={ loggedUser }
                community={ community }
                members={ members }
                memberCount={ memberCount }
                topics={ topics }
                topicCount={ topicCount }
                setNewTopicFormOpen={ setNewTopicFormOpen }
                handleJoinCommunity={ handleJoinCommunity }
                loadingJoin={ loadingJoin }
                handleLeaveCommunity={ handleLeaveCommunity }
                loadingLeave={ loadingLeave }
            />

            <Switch>
                <Route exact path={`${match.path}/forum/:topicId`}>
                    <TopicMain
                        user={ loggedUser } 
                        community={ community }
                        topics={ topics }
                    />
                </Route>
                    
                <Route exact path={`${match.path}/forum`}>
                    <ForumMain
                        user={ loggedUser } 
                        community={ community }
                        topics={ topics }
                        topicCount={ topicCount }
                    />
                </Route>

                <Route exact path={`${match.path}/enquetes`}>
                    <h1>ENQUETES</h1>
                </Route>

                <Route exact path={`${match.path}/membros`}>
                    <MembersMain community={ community } />
                </Route>

                <Route exact path={`${match.path}`}>
                    <CommunityMain
                        user={ loggedUser } 
                        community={ community }
                        topics={ topics }
                        topicCount={ topicCount }
                        newTopicFormOpen={ newTopicFormOpen }
                        setNewTopicFormOpen={ setNewTopicFormOpen }
                        handleJoinCommunity={ handleJoinCommunity }
                        loadingJoin={ loadingJoin }
                        handleLeaveCommunity={ handleLeaveCommunity }
                        loadingLeave={ loadingLeave }
                    />
                    <CommunityRight
                        user={ loggedUser }
                        community={ community }
                        members={ members }
                        memberCount={ memberCount }
                    />
                </Route>
            </Switch>
        </Main>
    )
}

export default CommunityRoute