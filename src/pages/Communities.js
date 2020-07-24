import React from 'react'
import { Container, Card } from '../styles/layout'
import { GET_ALL_COMMUNITIES, GET_ALL_USERS, JOIN_COMMUNITY, LEAVE_COMMUNITY } from '../services/queries'
import { useQuery, useMutation } from '@apollo/client'

import 'moment/locale/pt-br'

const Communities = ({ loggedUser }) => {
    const { loading, error, data } = useQuery(GET_ALL_COMMUNITIES)
    const [joinCommunity] = useMutation(JOIN_COMMUNITY, {
        onError: error => {
            if (!error.graphQLErrors) {
                alert('Erro de servidor')
                return
            }
            alert(error.graphQLErrors[0].message)
        },
        refetchQueries: [{ query: GET_ALL_COMMUNITIES }, { query: GET_ALL_USERS }]
    })
    const [leaveCommunity] = useMutation(LEAVE_COMMUNITY, {
        onError: error => {
            if (!error.graphQLErrors) {
                alert('Erro de servidor')
                return
            }
            alert(error.graphQLErrors[0].message)
        },
        refetchQueries: [{ query: GET_ALL_COMMUNITIES }, { query: GET_ALL_USERS }]
    })

    if (error) return (
        <Container>
            <h2>There was an ERROR</h2>
            <p>Please refresh page or try again later</p>
        </Container>
    )

    if (loading) return (
        <Container>
            <h2>loading...</h2>
        </Container>
    )

    const handleJoinCommunity = (community) => {
        console.log('entrando na comunidade', community.title)
        joinCommunity({
            variables: {
                communityId: community.id
            }
        })
    }

    const handleLeaveCommunity = (community) => {
        console.log('entrando na comunidade', community.title)
        leaveCommunity({
            variables: {
                communityId: community.id
            }
        })
    }

    return (
        <Card>
            <h2>Comunidades</h2>
            <ul>
                { data.allCommunities.map(c =>
                    <li key={ c.id }>
                        <h3>
                            <img src={ c.picture } alt={ c.title } width="50" height="50" />
                            <strong>{ c.title } </strong>({ c.Members.length })
                        </h3>
                        {
                            c.Members.find(m => m.id.toString() === loggedUser.id)
                            ? <button onClick={ () => handleLeaveCommunity(c) }>deixar comunidade</button>
                            : <button onClick={ () => handleJoinCommunity(c) }>participar da comunidade</button>
                        }
                        <p>{ c.description }</p>
                        <ul>
                            <li><strong>criada em: </strong>{ c.createdAt }</li>
                            <li><strong>criada por: </strong>{ c.Creator.name }</li>
                            <li><strong>categoria: </strong>{ c.Category.title }</li>
                            <li><strong>idioma: </strong>{ c.language }</li>
                            <li><strong>tipo: </strong>{ c.type }</li>
                        </ul>
                        <p><strong>tópicos</strong></p>
                        <ul>
                            {
                                c.Topics.map(t => (
                                    <li key={ t.id }>
                                        <h3>{ t.title }</h3>
                                        <p>por { t.TopicCreator.name }</p>
                                        <p>{ t.body }</p>
                                        <ul>
                                            {
                                                t.Comments.map(comment => (
                                                    <li key={ comment.id }>
                                                        <p>por { comment.Sender.name }</p>
                                                        <p>{ comment.body }</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                        <p><strong>membros ({ c.Members.length })</strong></p>
                        <ul>
                            { c.Members.map(m => (
                                <li key={ m.id }>{ m.id }</li>
                            )) }
                        </ul>
                        <hr />
                    </li>
                ) }
            </ul>
        </Card>
    )
}

export default Communities