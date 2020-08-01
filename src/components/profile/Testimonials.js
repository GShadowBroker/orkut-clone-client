import React, { useState } from 'react'

import moment from 'moment'
import {
    Card,
    Subtitle,
    Message,
    Image,
    MessageContent,
    MessageHeader,
    MessageBody,
    MessageActions,
    Time,
    Form,
    InputGroup,
    ActionGroup,
    Button,
    FakeLink
} from '../../styles/layout'
import {
    ProfileInfo,
    InlineHeader
} from '../../styles/profile'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { FIND_USER, GET_USER_TESTIMONIALS, SEND_TESTIMONIAL, REMOVE_TESTIMONIAL } from '../../services/queries'

import RichEditor from '../RichEditor'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import Togglable from '../utils/Togglable'
import TestimonialsSkeleton from '../skeletons/TestimonialsSkeleton'

import Spinner from 'react-loading'

const Testimonials = ({ user, loggedUser }) => {
    const { error, loading, data } = useQuery(GET_USER_TESTIMONIALS, {
        variables: { receiverId: user.id }
    })

    let editorState = EditorState.createEmpty()
    const [testimonial, setTestimonial] = useState(editorState)

    const setEditorState = (editorState) => {
        setTestimonial(editorState)
    }

    const [sendTestimonial] = useMutation(SEND_TESTIMONIAL, {
        onError: error => (
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Erro de servidor')
        ),
        refetchQueries: [
            { query: FIND_USER, variables: { userId: user.id } },
            { query: GET_USER_TESTIMONIALS, variables: { receiverId: user.id } }
        ],
        onCompleted: () => setTestimonial(EditorState.createEmpty())
    })
    const [removeTestimonial, {loading: loadingTestimonialRemoval}] = useMutation(REMOVE_TESTIMONIAL, {
        onError: error => (
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Erro de servidor')
        ),
        refetchQueries: [
            { query: FIND_USER, variables: { userId: user.id } },
            { query: GET_USER_TESTIMONIALS, variables: { receiverId: user.id } }
        ]
    })

    const handleSubmit = e => {
        e.preventDefault()
        sendTestimonial({
            variables: {
                userId: user.id,
                body: draftToHtml(convertToRaw(testimonial.getCurrentContent()))
            }
        })
    }

    const handleTestimonialRemoval = (t) => {
        console.log(t)
        removeTestimonial({
            variables: {
                userId: user.id,
                testimonialId: t.id
            }
        })
    }

    if (error) return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileInfo>
                <Subtitle>Depoimentos</Subtitle>
                <Subtitle>Erro ao buscar os depoimentos.</Subtitle>
            </ProfileInfo>
        </Card>    
    )
    
    if (loading) return <TestimonialsSkeleton />

    const testimonials = data ? data.findTestimonials : null
    const timeOptions = {
        month: 'long', 
        day: 'numeric'
    }

    return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileInfo>
                <InlineHeader>
                    <Subtitle>Depoimentos</Subtitle>
                </InlineHeader>
                {   
                    testimonials.map(t => (
                        <Message key={ t.id }>
                            <Link to={`/perfil/${t.Sender.id}`}>
                                <Image size="50" url={ t.Sender.profile_picture } />
                            </Link>
                            <MessageContent>
                                <MessageHeader>
                                    <Link to={`/perfil/${t.Sender.id}`}>{ t.Sender.name }</Link>
                                    <Time>
                                        - { new Date(t.createdAt).toLocaleString('pt-BR', timeOptions) } ({ moment(t.createdAt).fromNow() })
                                    </Time>
                                </MessageHeader>
                                <MessageBody>
                                    <div dangerouslySetInnerHTML={{ __html: t.body }} />
                                </MessageBody>
                            </MessageContent>
                            { (user.id === loggedUser.id || t.Sender.id === loggedUser.id) && (
                                <MessageActions>
                                    { loadingTestimonialRemoval
                                        ? <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                        : <FakeLink onClick={ () => handleTestimonialRemoval(t) }>excluir</FakeLink>
                                    }
                                </MessageActions>
                            )}
                        </Message>
                    ))
                }
            </ProfileInfo>
            { user.id !== loggedUser.id && (
                <ProfileInfo style={{ marginBottom: '1rem' }}>
                    <Togglable viewLabel="enviar depoimento">
                        <Form onSubmit={ handleSubmit }>
                            <InputGroup>
                                <RichEditor
                                    message={ testimonial }
                                    setEditorState={ setEditorState }
                                    user={ user }
                                />
                            </InputGroup>
                            <ActionGroup>
                                <Button type="submit">enviar depoimento</Button>
                                <Button>visualizar</Button>
                                <FakeLink>dicas de depoimentos</FakeLink>
                            </ActionGroup>
                        </Form>
                    </Togglable>
                </ProfileInfo>
            )}
        </Card>
    )
}

export default Testimonials