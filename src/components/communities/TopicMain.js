import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'
import {
    Card,
    Button,
    Subtitle,
    Image,
    Message,
    MessageContent,
    MessageBody,
    MessageActions,
    Time,
    FakeLink,
    Form,
    InputGroup,
    ActionGroup
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    CommentSectionFooter,
    PaginationBlock,
    Page,
    CommentSectionHeader
} from '../../styles/profile'

import { useQuery, useMutation } from '@apollo/client'
import { 
    FETCH_TOPICS, 
    FETCH_COMMENTS, 
    REMOVE_TOPIC, 
    SEND_COMMENT, 
    REMOVE_COMMENT 
} from '../../services/queries'
import Notification from '../utils/Notification'
import trunc from '../../utils/truncate'
import Error404 from '../../pages/404Error'
import Breadcrumbs from '../utils/Breadcrumbs'
import Togglable from '../utils/Togglable'

import Editor from '../RichEditor'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import errorHandler from '../../utils/errorHandler'

import Spinner from 'react-loading'
import TopicMainSkeleton from '../skeletons/TopicMainSkeleton'

const TopicMain = ({ user, community, topics }) => {
    const { communityId, topicId } = useParams()
    const history = useHistory()
    const [errors, setErrors] = useState('')
    const [offset, setOffset] = useState(0)
    const [limit] = useState(10)

    const [comment, setComment] = useState(EditorState.createEmpty())

    const { error, loading, data, fetchMore } = useQuery(FETCH_COMMENTS, {
        variables: {
            topicId,
            order: 'ASC',
            limit,
            offset
        }
    })
    
    const [sendComment, { loading: loadingCommentSubmission }] = useMutation(SEND_COMMENT, {
        onError: error => errorHandler(error, setErrors),
        refetchQueries: [
            { query: FETCH_COMMENTS, variables: {
                topicId,
                order: 'ASC',
                limit,
                offset
            }}
        ],
        onCompleted: () => setComment(EditorState.createEmpty())
    })

    const [removeComment, { loading: loadingCommentRemoval }] = useMutation(REMOVE_COMMENT, {
        onError: error => errorHandler(error, setErrors),
        refetchQueries: [
            { query: FETCH_COMMENTS, variables: {
                topicId,
                order: 'ASC',
                limit,
                offset
            }}
        ]
    })

    const [removeTopic, { loading: loadingTopicRemoval }] = useMutation(REMOVE_TOPIC, {
        onError: error => errorHandler(error, setErrors),
        refetchQueries: [
            { query: FETCH_TOPICS, variables: { communityId, limit: 5, offset: 0, limitComment: 1 }}
        ],
        onCompleted: () => history.push(`/comunidades/${communityId}`)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        sendComment({
            variables: {
                topicId,
                body: draftToHtml(convertToRaw(comment.getCurrentContent()))
            }
        })
    }

    const handleCommentDelete = (comment) => {
        removeComment({
            variables: {
                topicCommentId: comment.id
            }
        })
    }

    const handleTopicDelete = (topic) => {
        removeTopic({
            variables: {
                topicId: topic.id
            }
        })
    }

    const setEditorState = (editorState) => {
        setComment(editorState)
    }

    if (error) return <Notification />
    if (loading) return <TopicMainSkeleton />

    const topic = topics.find(t => t.id === topicId)
    const comments = data && data.findTopicComments.rows
    const commentCount = data && data.findTopicComments.count

    const pages = Math.ceil(commentCount / limit) || 1
    const currentPage = (offset / limit) + 1

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

    const hasNextPage = limit < commentCount && offset !== (pages - 1) * limit
    const hasPrevPage = offset >= limit

    const timeOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }

    if (!topic) return <Error404 />

    return (
        <MainColumn stretched>
            { errors && <Notification title="Erro" message={ errors } margin={'0 0 .6rem 0'} />}

            <Card style={{marginBottom: '.6rem'}}>
                <ProfileInfo>
                    <InlineHeader style={{paddingBottom: '0'}}>
                        <div style={{maxWidth: '80%'}}>
                            <Link to={`/comunidades/${communityId}/forum/${topicId}`}>
                                <Subtitle>{ topic.title }
                                    <span style={{border: 'none', fontSize: '.8em', color: 'grey'}}>
                                        { commentCount === 1 ? `- ${commentCount} resposta` : `- ${commentCount} respostas` }
                                    </span>
                                </Subtitle>
                            </Link>
                        </div>
                        <div style={{
                            alignSelf: 'start', 
                            marginTop: '.6rem',
                            textAlign: 'right'
                        }}>
                            <Button>Denunciar spam</Button>
                        </div>
                    </InlineHeader>
                    <Breadcrumbs community={ community.title } topic={ topic.title } />
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
                </ProfileInfo>

                <ProfileInfo style={{ padding: '.5rem .8rem' }}>
                    <Message style={{borderTop: '.3px solid #e3e8f5'}}>
                        <Link to={`/perfil/${topic.TopicCreator.id}`}>
                            <Image size="60" url={ topic.TopicCreator.profile_picture } />
                        </Link>
                        <MessageContent>
                            <CommentSectionHeader style={{margin: 0}}>
                                <div>
                                    <Link to={`/perfil/${topic.TopicCreator.id}`}><strong>{ trunc(topic.TopicCreator.name, 50) }</strong></Link>
                                    <Time>
                                        - { new Date(topic.createdAt).toLocaleString('pt-BR', timeOptions) } ({ moment(topic.createdAt).fromNow() })
                                    </Time>
                                </div>

                                { user.id === topic.TopicCreator.id && comments.length === 0
                                    ? (<MessageActions>
                                        { loadingTopicRemoval
                                            ? <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                            : <FakeLink onClick={ () => handleTopicDelete(topic) }>excluir tópico</FakeLink>
                                        }
                                    </MessageActions>)
                                    : null
                                }

                            </CommentSectionHeader>
                            <MessageBody>
                                <div dangerouslySetInnerHTML={{ __html: topic.body }} style={{ lineHeight: '1.6' }} />
                            </MessageBody>
                        </MessageContent>
                    </Message>
                </ProfileInfo>
            </Card>

            <Card>
                <ProfileInfo style={{ padding: '0 .8rem .5rem .8rem' }}>
                    { comments.map(c =>
                        (<Message key={ c.id } style={{borderTop: '.3px solid #e3e8f5', margin: '0 0 .5rem 0'}}>
                            <Link to={`/perfil/${c.Sender.id}`}>
                                <Image size="60" url={ c.Sender.profile_picture } />
                            </Link>
                            <MessageContent>
                                <CommentSectionHeader style={{margin: 0}}>
                                    <div>
                                        <Link to={`/perfil/${c.Sender.id}`}><strong>{ trunc(c.Sender.name, 50) }</strong></Link>
                                        <Time>
                                            - { new Date(c.createdAt).toLocaleString('pt-BR', timeOptions) } ({ moment(c.createdAt).fromNow() })
                                        </Time>
                                    </div>
                                    
                                    { user.id === c.Sender.id
                                        && (<MessageActions>
                                            {
                                                loadingCommentRemoval
                                                ? <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                                : <FakeLink onClick={ () => handleCommentDelete(c) }>excluir</FakeLink>
                                            }
                                        </MessageActions>)
                                    }

                                </CommentSectionHeader>
                                <MessageBody>
                                    <div dangerouslySetInnerHTML={{ __html: c.body }} style={{ lineHeight: '1.6' }} />
                                </MessageBody>
                            </MessageContent>
                        </Message>))}
                </ProfileInfo>

                { comments.length > 0 && (
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

                <ProfileInfo style={ comments.length > 0 ? { marginBottom: '1rem' } : { margin: '.6rem 0 1rem 0' }}>
                    <Togglable viewLabel={ comments.length > 0 ? 'enviar comentário' : 'seja o primeiro a comentar' }>
                        <Form onSubmit={ handleSubmit }>
                            <InputGroup>
                                <Editor
                                    message={ comment }
                                    setEditorState={ setEditorState }
                                    user={ user }
                                />
                            </InputGroup>
                            <ActionGroup>
                                <Button type="submit">{ loadingCommentSubmission ? 'enviando...' : 'enviar comentário'}</Button>
                                <Button>visualizar</Button>
                                <FakeLink>Termos de Uso e Conduta</FakeLink>
                            </ActionGroup>
                        </Form>
                    </Togglable>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default TopicMain