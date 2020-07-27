import React, { useState } from 'react'
import {
    Card,
    Subtitle2,
    Image,
    FakeLink,
    CloseButton
} from '../../styles/layout'
import {
    ProfileInfo,
    FriendSuggestionGrid,
    SuggestionContainer,
    SuggestionImageContainer,
    SuggestionBody,
    InlineHeader
} from '../../styles/profile'
import { Link } from 'react-router-dom'

import Spinner from 'react-loading'

const FriendSuggestions = ({ user, suggestions, handleSendRequest, refetchSuggestions }) => {
    const [loading, setLoading] = useState(false)

    const handleAddFriend = (requestee) => {
        setLoading(true)
        handleSendRequest(requestee)
        setTimeout(() => {
            refetchSuggestions()
            setLoading(false)
        }, 1000)
    }

    if (suggestions.length === 0) return null

    return (
        <Card style={{ marginBottom: '.6em' }}>
            <ProfileInfo style={{ marginBottom: '.6rem' }}>
                <InlineHeader>
                    <Subtitle2>pessoas que você talvez conheça no Orkut</Subtitle2>
                </InlineHeader>
                <FriendSuggestionGrid>
                    { suggestions.map(s =>
                        (<SuggestionContainer id={ `suggestionid_${s.id}` } key={ s.id }>
                            <SuggestionImageContainer>
                                <Link to={`/perfil/${s.id}`}>
                                    <Image size="45" url={ s.profile_picture } />
                                </Link>
                            </SuggestionImageContainer>
                            <SuggestionBody>
                                <span>{ s.name }</span>
                                { loading
                                    ? <Spinner type="spokes" color="#3c88cf" height='15px' width='15px' />
                                    : (<FakeLink
                                            onClick={ () => handleAddFriend(s) }
                                        >adicionar</FakeLink>)}
                            </SuggestionBody>
                            <CloseButton onClick={ () => document.getElementById(`suggestionid_${s.id}`).style.display = 'none' }>
                                <span>&times;</span>
                            </CloseButton>
                        </SuggestionContainer>))
                    }
                </FriendSuggestionGrid>
            </ProfileInfo>
        </Card>
    )
}

export default FriendSuggestions