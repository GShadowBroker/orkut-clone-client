import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import moment from 'moment'

import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { FIND_USER, GET_USER_SCRAPS, REMOVE_SCRAP } from '../services/queries'

import { Card, Button, Select, Image, FakeLink, Time } from '../styles/layout'
import { 
    Main,
    MainColumn, 
    ProfileInfo, 
    CommentSectionHeader,
    CommentSectionFooter,
    PaginationBlock,
    CommentSection,
    Comment,
    CommentBody,
    CommentContent,
    CommentCheckbox
} from '../styles/profile'

import ProfileLeft from '../components/profile/ProfileLeft'
import ScrapForm from '../components/ScrapForm'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import Notification from '../components/utils/Notification'

// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

const Scraps = ({ crumbs, loggedUser }) => {
    const { userId } = useParams()
    const [selected, setSelected] = useState([])
    const [offset, setOffset] = useState(0)

    const [ removeScrap, { loading: removeLoading } ] = useMutation(REMOVE_SCRAP, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [
            {
                query: FIND_USER,
                variables: { userId }
            },
            {
                query: GET_USER_SCRAPS,
                variables: { receiverId: userId }
            }
        ]
    })

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })
    // const { error: errorScraps, loading: loadingScraps, data: dataScraps } = useQuery(GET_USER_SCRAPS, {
    //     variables: { receiverId: userId }
    // })
    const { error: errorScraps, loading: loadingScraps, data: dataScraps, fetchMore } = useQuery(GET_USER_SCRAPS, {
        variables: {
            receiverId: userId,
            limit: 10,
            offset
        },
        fetchPolicy: "cache-and-network"
    })

    if (error || errorScraps) return <Notification />

    if (loading || loadingScraps) return (
        <h1>loading...</h1>
    )

    const user = data && data.findUser
    const scraps = dataScraps && dataScraps.findScraps

    const deleteScrap = (scrap) => {
        removeScrap({
            variables: {
                userId: loggedUser.id,
                scrapId: scrap.id
            }
        })
    }

    const selectAll = () => {
        let newSelected = [...selected]
        scraps.forEach(s => newSelected.push(s.id))
        console.log('new selected', newSelected)

        const checkboxes = document.querySelectorAll('.comment-checkbox')
        checkboxes.forEach(c => c.checked = true)

        setSelected(newSelected)
    }

    const resetSelect = () => {
        const checkboxes = document.querySelectorAll('.comment-checkbox')
        checkboxes.forEach(c => c.checked = false)

        setSelected([])
    }

    const toggleSelected = (scrapId) => {
        if (selected.find(s => s === scrapId)) {
            let newSelected = [...selected]
            let updatedSelected = newSelected.filter(s => s !== scrapId)
            setSelected(updatedSelected)
            return
        }
        let newSelected = [...selected]
        newSelected.push(scrapId)
        setSelected(newSelected)
    }

    const removeSelected = () => {
        if (!selected.length) return

        selected.forEach(i => {
            removeScrap({
                variables: {
                    userId: loggedUser.id,
                    scrapId: i
                }
            })
        })
    }

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric'
    }

    return (
        <Main>
            <ProfileLeft user={ user } loggedUser={ loggedUser } />

            <MainColumn stretched>
                <Card>
                    <ProfileInfo>
                        <ScrapForm user={ user } loggedUser={ loggedUser } />
                    </ProfileInfo>
                </Card>

                <Card style={{ marginTop: '.6rem' }}>
                    <ProfileInfo>
                        <h2>{ user.id === loggedUser.id ? 'Minha página de scraps' : `Página de scraps de ${user.name}`} ({ user.Scraps.length })</h2>
                        <Breadcrumbs crumbs={ crumbs } />
                        <CommentSectionHeader>
                            {
                                user.id === loggedUser.id
                                ? <Button onClick={ removeSelected } disabled={ removeLoading }>
                                    { removeLoading ? 'excluindo scraps ...' : 'excluir scraps selecionados' }
                                </Button>
                                : <span></span>
                            }
                            <Select>
                                <option value="ver10">Ver 10 scraps</option>
                                <option value="ver20">Ver 20 scraps</option>
                            </Select>
                        </CommentSectionHeader>
                        <CommentSectionHeader>
                            {
                                user.id === loggedUser.id
                                ? <span>Selecionar: <FakeLink onClick={ selectAll }>Todos</FakeLink>, <FakeLink onClick={ resetSelect } >Nenhum</FakeLink></span>
                                : <span></span>
                            }
                            <PaginationBlock>
                                <span 
                                    onClick={ () => fetchMore({
                                        variables: {
                                            offset: 0
                                        }
                                    }) }
                                ><FakeLink>primeira</FakeLink></span>
                                <span>&lt; anterior</span>
                                <span
                                    onClick={() => {
                                        fetchMore({
                                            variables: {
                                                offset: offset + 10,
                                            },
                                            // No need for an updateQuery function, since the
                                            // field policy handles all Query.search updates.
                                        })
                                        setOffset(10)
                                    }}
                                ><FakeLink>próxima &gt;</FakeLink></span>
                                <span>última</span>
                            </PaginationBlock>
                        </CommentSectionHeader>

                        <CommentSection>
                            {
                                scraps.map(scrap => (
                                    <Comment key={ scrap.id }>
                                        { loggedUser.id === user.id && (
                                            <CommentCheckbox>
                                                <input 
                                                    className="comment-checkbox" 
                                                    id={`scrapid_${scrap.id}`} 
                                                    type="checkbox" onChange={ ({ target }) => toggleSelected(scrap.id) } 
                                                />
                                            </CommentCheckbox>)}
                                        <Link to={`/perfil/${scrap.Sender.id}`}>
                                            <Image
                                                url={ scrap.Sender.profile_picture } 
                                                size="80"
                                            />
                                        </Link>
                                        <CommentBody>
                                            <CommentSectionHeader style={{ margin: 0 }}>
                                                <Link to={`/perfil/${scrap.Sender.id}`}>{ scrap.Sender.name }:</Link>
                                                <div>
                                                    <Time size="1">
                                                        { new Date(scrap.createdAt).toLocaleString('pt-BR', timeOptions) } (
                                                            { moment(scrap.createdAt).fromNow() })
                                                    </Time>
                                                    {
                                                        user.id === loggedUser.id || scrap.Sender.id === loggedUser.id
                                                            ? <Button onClick={ () => deleteScrap(scrap) }>apagar</Button>
                                                            : null
                                                    }
                                                </div>
                                            </CommentSectionHeader>
                                            <CommentContent>
                                                <div dangerouslySetInnerHTML={{ __html: draftToHtml(scrap.body) }} />
                                            </CommentContent>
                                            <FakeLink>Responder</FakeLink>
                                        </CommentBody>
                                    </Comment>
                                ))
                            }
                        </CommentSection>
                        <CommentSectionFooter>
                            { scraps.length > 0 && (
                                <PaginationBlock>
                                    <span>primeira</span>
                                    <span>&lt; anterior</span>
                                    <span>próxima &gt;</span>
                                    <span>última</span>
                                </PaginationBlock>
                            )}
                        </CommentSectionFooter>
                    </ProfileInfo>
                </Card>
                
            </MainColumn>
        </Main>
    )
}

export default Scraps