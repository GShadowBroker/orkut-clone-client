import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import {
    Card,
    Subtitle,
    Image,
    Message,
    MessageContent,
    MessageBody,
    FakeLink,
    Input,
    SearchInputContainer,
    SearchInputIcon,
    MessageHeaderSpaced,
    Time
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
import { useLocation, Link } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_ALL_USERS, GET_ALL_COMMUNITIES } from '../../services/queries'
import Notification from '../utils/Notification'
import trunc from '../../utils/truncate'
import Breadcrumbs from '../utils/Breadcrumbs'
import Spinner from 'react-loading'
import SearchSkeleton from '../skeletons/SearchSkeleton'
import { BsSearch } from 'react-icons/bs'

const Search = ({ loggedUser }) => {
    const location = useLocation()
    const search = location.search && location.search.substring(3)

    const [errors, setErrors] = useState('')

    const [newSearch, setNewSearch] = useState('')
    const [timeoutState, setTimeoutState] = useState(null)

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    const [toggleDisplayMode, setToggleDisplayMode] = useState(false)

    const { loading, error, data } = useQuery(GET_ALL_USERS, {
        variables: { filter: decodeURI(search), limit, offset }
    })
    const {
        loading: loadingCommunities,
        error: errorCommunities,
        data: dataCommunities
    } = useQuery(GET_ALL_COMMUNITIES, {
        variables: { filter: decodeURI(search), limit, offset }
    })
    const [getAllUsers, { loading: loadingNewUsers, data: dataNewUsers }] = useLazyQuery(GET_ALL_USERS)
    const [getAllCommunities, { loading: loadingNewCommunities, data: dataNewCommunities }] = useLazyQuery(GET_ALL_COMMUNITIES)
    
    const onChange = e => {
        e.preventDefault()
        setNewSearch(e.target.value)
    }

    const handleSearch = () => {
        if (!newSearch) {
            clearTimeout(timeoutState)
            setTimeoutState(null)
            return
        }

        let timeoutId
        if (!timeoutState) {
            timeoutId = setTimeout(() => {
                // Action after user stops typing
                console.log('searching for', newSearch) //network request
                setTimeoutState(null)
                getAllUsers({
                    variables: {
                        filter: newSearch,
                        limit,
                        offset
                    }
                })
                getAllCommunities({
                    variables: { filter: newSearch, limit, offset }
                })
            }, 2000)
            setTimeoutState(timeoutId)
        } else {
            clearTimeout(timeoutState)
            setTimeoutState(null)

            timeoutId = setTimeout(() => {
                // Action after user stops typing
                console.log('searching for', newSearch) //network request
                setTimeoutState(null)
                getAllUsers({
                    variables: {
                        filter: newSearch,
                        limit,
                        offset
                    }
                })
                getAllCommunities({
                    variables: { filter: newSearch, limit, offset }
                })
            }, 2000)
            setTimeoutState(timeoutId)
        }
    }

    if (loading || loadingCommunities) return <SearchSkeleton />
    if (error || errorCommunities) return <Notification />

    let users = data && data.allUsers.rows
    let userCount = data && data.allUsers.count

    let communities = dataCommunities && dataCommunities.allCommunities.rows
    let communityCount = dataCommunities && dataCommunities.allCommunities.count

    const hasNextPage = false
    const hasPrevPage = false

    if (dataNewUsers && dataNewUsers.allUsers) {
        users = dataNewUsers && dataNewUsers.allUsers.rows
        userCount = dataNewUsers && dataNewUsers.allUsers.count

        communities = dataNewCommunities && dataNewCommunities.allCommunities.rows
        communityCount = dataNewCommunities && dataNewCommunities.allCommunities.count
    }

    console.log('communities', communities)
    return (
        <MainColumn stretched>
            { errors && <Notification title="Erro" message={ errors } margin={'0 0 .6rem 0'} />}

            <Card>
                <ProfileInfo>
                    <InlineHeader style={{paddingBottom: '0'}}>
                        <Subtitle>Termo pesquisado: { decodeURI(search) || newSearch }</Subtitle>
                    </InlineHeader>
                    <Breadcrumbs user={ loggedUser.name } />
                </ProfileInfo>

                <ProfileInfo>
                    <CommentSectionFooter>
                        <PaginationBlock noborder>
                            {
                                hasPrevPage
                                ? <Page><FakeLink>primeira</FakeLink></Page>
                                : <Page>primeira</Page>
                            }
                            {
                                hasPrevPage
                                ? <Page><FakeLink>&lt; anterior</FakeLink></Page>
                                : <Page>&lt; anterior</Page>
                            }
                            <Page>{ 0 } de { 0 }</Page>
                            {
                                hasNextPage
                                ? <Page><FakeLink>próxima &gt;</FakeLink></Page>
                                : <Page>próxima &gt;</Page>
                            }
                            {
                                hasNextPage
                                ? <Page><FakeLink>última</FakeLink></Page>
                                : <Page>última</Page>
                            }
                        </PaginationBlock>
                    </CommentSectionFooter>

                    <SearchInputContainer noborderright style={{
                        justifyContent: 'flex-start',
                        margin: '1rem 0'
                    }}>
                        <Input
                            placeholder="pesquisar"
                            value={ newSearch }
                            onChange={ onChange }
                            onKeyUp={ handleSearch }
                        />
                        <SearchInputIcon noborderleft>
                            <BsSearch />
                        </SearchInputIcon>
                        { (timeoutState || loadingNewUsers || loadingNewCommunities)
                            && (
                                <div style={{display: 'flex', paddingLeft: '.5rem'}}>
                                    <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                    <span style={{marginLeft: '.5rem', color: 'grey'}}>procurando...</span>
                                </div>
                            )
                        }
                    </SearchInputContainer>
                </ProfileInfo>

                <div style={{margin: '0 .8rem .5rem .8rem'}}>
                    <FakeLink
                        onClick={ () => setToggleDisplayMode(false) }
                        style={{paddingRight: '.5rem', borderRight: '.3px solid #bebebe'}}
                    >
                        Usuários ({ userCount || 0 })
                    </FakeLink>
                    <FakeLink
                        onClick={ () => setToggleDisplayMode(true) }
                        style={{paddingLeft: '.3rem'}}
                    >
                        Comunidades ({ communityCount || 0 })
                    </FakeLink>
                </div>
            </Card>

            { !toggleDisplayMode
                ? <SearchedUsers users={ users } hasNextPage={ hasNextPage } hasPrevPage={ hasPrevPage } />
                : <SearchedCommunities 
                    communities={ communities } 
                    hasNextPage={ hasNextPage } 
                    hasPrevPage={ hasPrevPage } 
                    communityCount={ communityCount }
                />
            }
        </MainColumn>
    )
}

const SearchedUsers = ({ users, hasNextPage, hasPrevPage }) => {
    return (
        <Card>
            <ProfileInfo style={{ padding: '0 .8rem .5rem .8rem' }}>
                { users.map(m =>
                    (<Message key={ m.id } style={{borderTop: '.3px solid #e3e8f5', margin: '0 0 .5rem 0'}}>
                        <Link to={`/perfil/${m.id}`}>
                            <Image size="70" url={ m.profile_picture } />
                        </Link>
                        <MessageContent>
                            <CommentSectionHeader style={{margin: 0}}>
                                <div>
                                    <Link to={`/perfil/${m.id}`}><strong>{ trunc(m.name, 50) }</strong></Link>
                                </div>
                            </CommentSectionHeader>
                            <MessageBody>
                                { m.country && <p style={{color: '#afafaf', margin: '.2rem 0'}}>{ m.country }</p>}
                                { m.city && <p style={{color: '#afafaf', margin: '.2rem 0'}}>{ m.city }</p>}
                                { m.age && <p style={{color: '#afafaf', margin: '.2rem 0'}}>{ m.age } anos</p>}
                            </MessageBody>
                        </MessageContent>
                    </Message>))}
                { users.length === 0 && <span style={{color: '#afafaf', marginBottom: '.5rem'}}>Nenhum usuário encontrado</span> }
            </ProfileInfo>

            { users.length > 0 && (
                <ProfileInfo>
                    <CommentSectionFooter style={{marginBottom: '1.5rem'}}>
                        <PaginationBlock noborder>
                            {
                                hasPrevPage
                                ? <Page><FakeLink>primeira</FakeLink></Page>
                                : <Page>primeira</Page>
                            }
                            {
                                hasPrevPage
                                ? <Page><FakeLink>&lt; anterior</FakeLink></Page>
                                : <Page>&lt; anterior</Page>
                            }
                            <Page>{ 0 } de { 0 }</Page>
                            {
                                hasNextPage
                                ? <Page><FakeLink>próxima &gt;</FakeLink></Page>
                                : <Page>próxima &gt;</Page>
                            }
                            {
                                hasNextPage
                                ? <Page><FakeLink>última</FakeLink></Page>
                                : <Page>última</Page>
                            }
                        </PaginationBlock>
                        
                    </CommentSectionFooter>
                </ProfileInfo>
            )}
        </Card>
    )
}

const SearchedCommunities = ({ communities, hasNextPage, hasPrevPage }) => {
    const timeOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }
    return (
        <Card>
            <ProfileInfo style={{ padding: '0 .8rem .5rem .8rem' }}>
                { communities.map(community =>
                    (<Message>
                        <Link to={`/comunidades/${community.id}`}>
                            <Image size="70" url={ community.picture } />
                        </Link>
                        <MessageContent>
                            <MessageHeaderSpaced>
                                <Link to={`/comunidades/${community.id}`}><strong>{ trunc(community.title, 30) }</strong></Link>
                                
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
                    </Message>))}
                { communities.length === 0 && <span style={{color: '#afafaf', marginBottom: '.5rem'}}>Nenhuma comunidade encontrada</span> }
            </ProfileInfo>

            { communities.length > 0 && (
                <ProfileInfo>
                    <CommentSectionFooter style={{marginBottom: '1.5rem'}}>
                        <PaginationBlock noborder>
                            {
                                hasPrevPage
                                ? <Page><FakeLink>primeira</FakeLink></Page>
                                : <Page>primeira</Page>
                            }
                            {
                                hasPrevPage
                                ? <Page><FakeLink>&lt; anterior</FakeLink></Page>
                                : <Page>&lt; anterior</Page>
                            }
                            <Page>{ 0 } de { 0 }</Page>
                            {
                                hasNextPage
                                ? <Page><FakeLink>próxima &gt;</FakeLink></Page>
                                : <Page>próxima &gt;</Page>
                            }
                            {
                                hasNextPage
                                ? <Page><FakeLink>última</FakeLink></Page>
                                : <Page>última</Page>
                            }
                        </PaginationBlock>
                        
                    </CommentSectionFooter>
                </ProfileInfo>
            )}
        </Card>
    )
}

export default Search