import React from 'react'

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
    FakeLink
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader
} from '../../styles/profile'

import { Link } from 'react-router-dom'
import trunc from '../../utils/truncate'

const CommunitiesMain = ({ user }) => {
    return (
        <MainColumn>
            <Card>
                <InlineHeader style={{marginTop: '.6rem'}}>
                    <Button><strong>Criar comunidade</strong></Button>
                </InlineHeader>
                <ProfileInfo>
                    <Subtitle2>Minhas comunidades gerenciadas (0)</Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        // borderBottom: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}></div>
                </ProfileInfo>
                <ProfileInfo>
                    <Subtitle2>Minhas comunidades ({ user.Subscriptions.length })</Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        // borderBottom: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}>
                        {
                            user.Subscriptions.map(c => (
                                <Message key={ c.id }>
                                    <Link to={`/comunidades/${c.id}`}>
                                        <Image size="70" url={ c.picture } />
                                    </Link>
                                    <MessageContent>
                                        <MessageHeaderSpaced>
                                            <Link to={`/comunidades/${c.id}`}><strong>{ trunc(c.title, 30) }</strong></Link>
                                            <Time>
                                                28 de Julho (há 2 horas)
                                            </Time>
                                        </MessageHeaderSpaced>
                                        <MessageBody>
                                            <p style={{ marginBottom: '.3rem' }}>Última postagem: 28 de Julho</p>
                                            <FakeLink>(JOGO) O maior nome do mundo (151)</FakeLink>
                                        </MessageBody>
                                    </MessageContent>
                                </Message>
                            ))
                        }
                    </div>
                    
                </ProfileInfo>
                <ProfileInfo style={{ marginBottom: '1rem' }}>
                    <Subtitle2>Comunidades pendentes (0)</Subtitle2>
                    <div style={{
                        borderTop: '.3px solid #e3e8f5',
                        // borderBottom: '.3px solid #e3e8f5',
                        padding: '.5rem 0'
                    }}></div>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default CommunitiesMain