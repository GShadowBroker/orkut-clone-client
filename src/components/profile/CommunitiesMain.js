import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import {
    Card,
    Button,
    Subtitle2,
    Image,
    Message,
    MessageContent,
    MessageHeaderSpaced,
    MessageBody,
    Time,
    FakeLink,
    ShowMore
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader
} from '../../styles/profile'

import { useQuery } from '@apollo/client'
import { GET_ALL_COMMUNITIES, GET_COMMUNITY_MEMBERS_COUNT } from '../../services/queries'

import { Link } from 'react-router-dom'
import trunc from '../../utils/truncate'
import Notification from '../utils/Notification'
import { TiArrowSortedDown } from 'react-icons/ti'

import CommunityItemSkeleton from '../skeletons/CommunityItemSkeleton'
import ProfileCommunitiesMainSkeleton from '../skeletons/ProfileCommunitiesMainSkeleton'

const CommunitiesMain = ({ user }) => {
    const [limitManaged, setLimitManaged] = useState(3)
    const [limitAll, setLimitAll] = useState(3)

    const { error, loading, data } = useQuery(GET_ALL_COMMUNITIES, {
        variables: { creatorId: user.id, limitTopic: 1, limitComment: 1 }
    })

    if (error) return <Notification margin="0" />
    if (loading) return <ProfileCommunitiesMainSkeleton />

    const sortFunction = (a, b) => {
        if (!a.Comments[0]) return 1
        if (!b.Comments[0]) return -1
        if (new Date(a.Comments[0].createdAt) > new Date(b.Comments[0].createdAt)) {
            return -1
        }
        return 1
    }

    const communities = data && [...data.allCommunities.rows].sort(sortFunction)
    const communityCount = data && data.allCommunities.count

    const managedComm = data && [...data.allCommunities.rows]
        .filter(c => c.creatorId === user.id)
        .sort(sortFunction)
    const managedCommCount = managedComm.length

    const hasShowMoreButton = (array, limit) => {
        if (array.length > limit) return true
        return false
    }

    return (
        <MainColumn>
            <Card>
                <InlineHeader style={{marginTop: '.6rem'}}>
                    <Link to={`/criar-comunidade`}>
                        <Button style={{color: '#34495e'}}><strong>Criar comunidade</strong></Button>
                    </Link>
                </InlineHeader>
                <ProfileInfo>
                    <Subtitle2>Minhas comunidades gerenciadas ({ managedCommCount || 0 })</Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}>
                        {
                            managedComm.slice(0, limitManaged).map(c =>
                                <CommunityItem key={ c.id } community={c} />
                            )
                        }
                        { hasShowMoreButton(managedComm, limitManaged)
                            && <ShowMore
                                    style={{margin: 0, padding: 0, cursor: 'pointer'}}
                                    onClick={() => setLimitManaged(limitAll + 5)}
                                >
                                <FakeLink><TiArrowSortedDown className="icenter" /> ver mais</FakeLink>
                            </ShowMore> }
                    </div>
                </ProfileInfo>

                <ProfileInfo>
                    <Subtitle2>Minhas comunidades ({ communityCount })</Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}>
                        {
                            communities.slice(0, limitAll).map(c =>
                                <CommunityItem key={ c.id } community={c} />
                            )
                        }
                        { hasShowMoreButton(communities, limitAll) && 
                            <ShowMore 
                                style={{margin: 0, padding: 0, cursor: 'pointer'}}
                                onClick={() => setLimitAll(limitAll + 5)}
                            >
                                <FakeLink><TiArrowSortedDown className="icenter" /> ver mais</FakeLink>
                            </ShowMore> }
                    </div>
                    
                </ProfileInfo>
                <ProfileInfo style={{ marginBottom: '1rem' }}>
                    <Subtitle2>Comunidades pendentes (0)</Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}></div>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

const CommunityItem = ({ community }) => {
    const {error, loading, data} = useQuery(GET_COMMUNITY_MEMBERS_COUNT, {
        variables: { communityId: community.id }
    })

    if (error) return <Notification margin="0" />
    if (loading) return <CommunityItemSkeleton />

    const communityCount = data && data.getCommunityMembersCount

    const timeOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }
    return (
        <Message>
            <Link to={`/comunidades/${community.id}`}>
                <Image size="70" url={ community.picture } />
            </Link>
            <MessageContent>
                <MessageHeaderSpaced>
                    <Link to={`/comunidades/${community.id}`}><strong>{ trunc(community.title, 30) } ({ communityCount })</strong></Link>
                    
                        { community.Comments[0]
                            && <Time>
                                    {new Date(community.Comments[0].createdAt).toLocaleString('pt', timeOptions)} ({ moment(community.Comments[0].createdAt).fromNow() })
                                </Time>
                        }
                    
                </MessageHeaderSpaced>
                { community.Topics.length > 0
                    ? (<MessageBody>
                        <p style={{ marginBottom: '.3rem' }}>Última postagem: { new Date(community.Topics[0].createdAt).toLocaleDateString('pt', timeOptions) } ({ moment(community.Topics[0].createdAt).fromNow() })</p>
                        <Link to={`/comunidades/${community.id}/forum/${community.Topics[0].id}`}>{ trunc(community.Topics[0].title, 30) }</Link>
                    </MessageBody>)
                    : (<MessageBody>
                        <p style={{ color: '#afafaf' }}>Nenhuma postagem</p>
                    </MessageBody>)
                }
            </MessageContent>
        </Message>
    )
}

export default CommunitiesMain