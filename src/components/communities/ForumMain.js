import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import {
    Card,
    Subtitle,
    Image,
    Message,
    MessageContent,
    MessageBody,
    MessageHeaderSpaced,
    MessageDetails,
    FakeLink,
    Input,
    SearchInputContainer,
    SearchInputIcon
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    CommentSectionFooter,
    PaginationBlock,
    Page,
} from '../../styles/profile'

import { useQuery, useLazyQuery } from '@apollo/client'
import {
    FETCH_TOPICS
} from '../../services/queries'
import Notification from '../utils/Notification'
import trunc from '../../utils/truncate'
import Breadcrumbs from '../utils/Breadcrumbs'

import Spinner from 'react-loading'
import TopicMainSkeleton from '../skeletons/TopicMainSkeleton'
import { BsSearch } from 'react-icons/bs'
import { IoIosArrowDropdown } from 'react-icons/io'

const ForumMain = ({ user, community }) => {
    const { communityId } = useParams()
    const [errors] = useState('')
    const [limit] = useState(10)
    const [offset, setOffset] = useState(0)

    const [search, setSearch] = useState('')
    const [timeoutState, setTimeoutState] = useState(null)

    const { error, loading, data, fetchMore } = useQuery(FETCH_TOPICS, {
        variables: { communityId, limit, offset, limitComment: 1 }
    })
    const [fetchTopics, { loading: loadingTopics, data: dataTopics }] = useLazyQuery(FETCH_TOPICS)

    const handleSearch = () => {
        if (!search) {
            clearTimeout(timeoutState)
            setTimeoutState(null)
            return
        }

        let timeoutId
        if (!timeoutState) {
            timeoutId = setTimeout(() => {
                // Action after user stops typing
                console.log('searching for', search) //network request
                setTimeoutState(null)
                fetchTopics({
                    variables: {
                        communityId,
                        filter: search,
                        limit,
                        offset,
                        limitComment: 1
                    }
                })
            }, 2000)
            setTimeoutState(timeoutId)
        } else {
            clearTimeout(timeoutState)
            setTimeoutState(null)

            timeoutId = setTimeout(() => {
                // Action after user stops typing
                console.log('searching for', search) //network request
                setTimeoutState(null)
                fetchTopics({
                    variables: {
                        communityId,
                        filter: search,
                        limit,
                        offset,
                        limitComment: 1
                    }
                })
            }, 2000)
            setTimeoutState(timeoutId)
        }
    }

    if (error) return <Notification />
    if (loading) return <TopicMainSkeleton />

    let topics = data && data.findCommunityTopics.rows
    const topicCount = data && data.findCommunityTopics.count

    let pages = Math.ceil(topicCount / limit) || 1
    let currentPage = (offset / limit) + 1

    const nextPage = () => {
        fetchMore({
            variables: {
                offset: offset + limit
            }
        })
        setOffset(offset + limit)
    }
    const prevPage = () => {
        fetchMore({
            variables: {
                offset: offset - limit
            }
        })
        setOffset(offset - limit)
    }
    const firstPage = () => {
        fetchMore({
            variables: {
                offset: 0
            }
        })
        setOffset(0)
    }
    const lastPage = () => {
        fetchMore({
            variables: {
                offset: (pages - 1) * limit
            }
        })
        setOffset((pages - 1) * limit)
    }

    let hasNextPage = limit < topicCount && offset !== (pages - 1) * limit
    let hasPrevPage = offset >= limit

    if (dataTopics && dataTopics.findCommunityTopics) {
        topics = dataTopics.findCommunityTopics.rows
        hasNextPage = false
        hasPrevPage = false
        pages = 1
        currentPage = 1
    }

    return (
        <MainColumn stretched>
            { errors && <Notification title="Erro" message={ errors } margin={'0 0 .6rem 0'} />}

            <Card>
                <ProfileInfo>
                    <InlineHeader style={{paddingBottom: '0'}}>
                        <Subtitle>Fórum ({ topicCount })</Subtitle>
                    </InlineHeader>
                    <Breadcrumbs community={ community.title } />
                </ProfileInfo>

                <ProfileInfo>
                    <CommentSectionFooter>
                        <PaginationBlock noborder>
                            {
                                hasPrevPage
                                ? <Page onClick={ firstPage }><FakeLink>primeira</FakeLink></Page>
                                : <Page>primeira</Page>
                            }
                            {
                                hasPrevPage
                                ? <Page onClick={ prevPage }><FakeLink>&lt; anterior</FakeLink></Page>
                                : <Page>&lt; anterior</Page>
                            }
                            <Page>{ currentPage } de { pages }</Page>
                            {
                                hasNextPage
                                ? <Page onClick={ nextPage }><FakeLink>próxima &gt;</FakeLink></Page>
                                : <Page>próxima &gt;</Page>
                            }
                            {
                                hasNextPage
                                ? <Page onClick={ lastPage }><FakeLink>última</FakeLink></Page>
                                : <Page>última</Page>
                            }
                        </PaginationBlock>
                    </CommentSectionFooter>

                    <SearchInputContainer noborderright style={{
                        justifyContent: 'flex-start',
                        margin: '1rem 0'
                    }}>
                        <Input
                            placeholder="buscar tópico"
                            value={search}
                            onChange={ ({target}) => setSearch(target.value) }
                            onKeyUp={ handleSearch }
                        />
                        <SearchInputIcon noborderleft>
                            <BsSearch />
                        </SearchInputIcon>
                        { (timeoutState || loadingTopics)
                            && (
                                <div style={{display: 'flex', paddingLeft: '.5rem'}}>
                                    <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                    <span style={{marginLeft: '.5rem', color: 'grey'}}>procurando tópicos...</span>
                                </div>
                            )
                        }
                    </SearchInputContainer>
                </ProfileInfo>

            </Card>

            <Card>
                <ProfileInfo style={{ padding: '0 .8rem .5rem .8rem' }}>
                    <div style={{
                        padding: '.5rem 0'
                    }}>
                        {
                            topics.map(t => (
                                <Link
                                    to={`/comunidades/${community.id}/forum/${t.id}`}
                                    key={ t.id }
                                    style={{borderBottom: '.3px solid #e3e8f5'}}
                                >
                                    <Message style={{borderBottom: '.3px solid #e3e8f5'}}>
                                        <Image size="40" url={ t.TopicCreator.profile_picture } />
                                        <MessageContent>
                                            <MessageHeaderSpaced style={{fontSize: '1.1em'}}>
                                                <FakeLink><strong>{ t.title }</strong></FakeLink>
                                                <IoIosArrowDropdown style={{ color: '#bebebe', fontSize: '1.2em' }} />
                                            </MessageHeaderSpaced>
                                            { t.Comments[0]
                                                ? (<MessageBody>
                                                    <MessageDetails>
                                                        <span>{ t.Comments.length } { t.Comments.length === 1 ? 'resposta' : 'respostas'}. </span>
                                                        <span>Última postagem: { trunc(t.Comments[0].body.replace(/<[^>]*>/g, ''), 40) } </span>
                                                        <span style={{ fontSize: '.9em' }}>
                                                            { moment(t.Comments[0].createdAt).fromNow() }
                                                        </span>
                                                    </MessageDetails>
                                                </MessageBody>)
                                                : (<MessageBody>
                                                        <MessageDetails>
                                                            <span>{ t.Comments.length } respostas. </span>
                                                            <span>Última postagem: { trunc(t.body.replace(/<[^>]*>/g, ''), 40) } </span>
                                                            <span style={{ fontSize: '.9em' }}>
                                                                { moment(t.createdAt).fromNow() }
                                                            </span>
                                                        </MessageDetails>
                                                </MessageBody>)
                                            }
                                        </MessageContent>
                                    </Message>
                                </Link>
                            ))
                        }
                    </div>
                    { topics.length === 0 && <span style={{color: '#afafaf', marginBottom: '.5rem'}}>Nenhum tópico encontrado</span> }
                </ProfileInfo>

                { topics.length > 0 && (
                    <ProfileInfo>
                        <CommentSectionFooter style={{marginBottom: '1.5rem'}}>
                                <PaginationBlock noborder>
                                {
                                    hasPrevPage
                                    ? <Page onClick={ firstPage }><FakeLink>primeira</FakeLink></Page>
                                    : <Page>primeira</Page>
                                }
                                {
                                    hasPrevPage
                                    ? <Page onClick={ prevPage }><FakeLink>&lt; anterior</FakeLink></Page>
                                    : <Page>&lt; anterior</Page>
                                }
                                <Page>{ currentPage } de { pages }</Page>
                                {
                                    hasNextPage
                                    ? <Page onClick={ nextPage }><FakeLink>próxima &gt;</FakeLink></Page>
                                    : <Page>próxima &gt;</Page>
                                }
                                {
                                    hasNextPage
                                    ? <Page onClick={ lastPage }><FakeLink>última</FakeLink></Page>
                                    : <Page>última</Page>
                                }
                                </PaginationBlock>
                            
                        </CommentSectionFooter>
                    </ProfileInfo>
                )}
            </Card>
        </MainColumn>
    )
}

export default ForumMain