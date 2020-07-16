import React from 'react'

import { Link } from 'react-router-dom'

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

const Scraps = ({ crumbs, loggedUser }) => {
    const { userId } = useParams()

    const [ removeScrap ] = useMutation(REMOVE_SCRAP, {
        onError: (error) => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [
            {
                query: FIND_USER,
                variables: { userId: loggedUser.id }
            },
            {
                query: GET_USER_SCRAPS,
                variables: { receiverId: loggedUser.id }
            }
        ]
    })

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })
    const { error: errorScraps, loading: loadingScraps, data: dataScraps } = useQuery(GET_USER_SCRAPS, {
        variables: { receiverId: userId }
    })

    if (error || errorScraps) return (
        <h1>Woops! There was an error.</h1>
    )
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

    const timeOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    return (
        <Main>
            <ProfileLeft user={ user } loggedUser={ loggedUser } />

            <MainColumn stretched>
                <Card>
                    <ProfileInfo>
                        <ScrapForm user={ user } />
                    </ProfileInfo>
                </Card>

                <Card style={{ marginTop: '.6rem' }}>
                    <ProfileInfo>
                        <h2>{ user.id === loggedUser.id ? 'Minha página de scraps' : `Página de scraps de ${user.name}`} ({ user.Scraps.length })</h2>
                        <Breadcrumbs crumbs={ crumbs } />
                        <CommentSectionHeader>
                            { user.id === loggedUser.id ? <Button>excluir scraps selecionados</Button> : <span></span> }
                            <Select>
                                <option value="ver10">Ver 10 scraps</option>
                                <option value="ver20">Ver 20 scraps</option>
                            </Select>
                        </CommentSectionHeader>
                        <CommentSectionHeader>
                            {
                                user.id === loggedUser.id
                                ? <span>Selecionar: <FakeLink>Todos</FakeLink>, <FakeLink>Nenhum</FakeLink></span>
                                : <span></span>
                            }
                            <PaginationBlock>
                                <span>primeira</span>
                                <span>&lt; anterior</span>
                                <span>próxima &gt;</span>
                                <span>última</span>
                            </PaginationBlock>
                        </CommentSectionHeader>

                        <CommentSection>
                            {
                                scraps.map(scrap => (
                                    <Comment key={ scrap.id }>
                                        { loggedUser.id === user.id && (
                                            <CommentCheckbox>
                                                <input type="checkbox" />
                                            </CommentCheckbox>)}
                                        <Image
                                            url={ scrap.Sender.profile_picture } 
                                            size="80"
                                        />
                                        <CommentBody>
                                            <CommentSectionHeader style={{ margin: 0 }}>
                                                <Link to="/perfil/3">{ scrap.Sender.name }:</Link>
                                                <div>
                                                    <Time size="1">{ new Date(scrap.createdAt).toLocaleString('pt-BR', timeOptions) } ('Usar moment.js' minutos atrás)</Time>
                                                    { user.id === loggedUser.id && <Button onClick={ () => deleteScrap(scrap) }>apagar</Button>}
                                                </div>
                                            </CommentSectionHeader>
                                            <CommentContent>
                                                { scrap.body }
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