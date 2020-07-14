import React from 'react'
import {
    Card,
    Subtitle,
    Message,
    Image,
    MessageContent,
    MessageHeader,
    MessageBody,
    Time
} from '../../styles/layout'
import {
    ProfileInfo,
    InlineHeader
} from '../../styles/profile'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER_TESTIMONIALS } from '../../services/queries'

const Testimonials = ({ user }) => {
    const { error, loading, data } = useQuery(GET_USER_TESTIMONIALS, {
        variables: { receiverId: user.id }
    })

    if (error) return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileInfo>
                <Subtitle>Depoimentos</Subtitle>
                <Subtitle>Erro ao buscar os depoimentos.</Subtitle>
            </ProfileInfo>
        </Card>    
    )
    if (loading) return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileInfo>
                <Subtitle>Depoimentos</Subtitle>
                <Subtitle>loading...</Subtitle>
            </ProfileInfo>
        </Card> 
    )

    const testimonials = data ? data.findTestimonials : null

    return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileInfo>
                <InlineHeader>
                    <Subtitle>Depoimentos</Subtitle>
                </InlineHeader>
                {/*** depoimentos ***/}
                {   
                    testimonials.map(t => (
                        <Message key={ t.id }>
                            <Image size="50" url={ t.Sender.profile_picture }></Image>
                            <MessageContent>
                                <MessageHeader>
                                    <Link to={`/perfil/${t.Sender.id}`}>{ t.Sender.name }</Link>
                                    <Time>{ new Date(t.createdAt).toLocaleString() }</Time>
                                </MessageHeader>
                                <MessageBody>
                                    { t.body }
                                </MessageBody>
                            </MessageContent>
                        </Message>
                    ))
                }
            </ProfileInfo>
        </Card>
    )
}

export default Testimonials