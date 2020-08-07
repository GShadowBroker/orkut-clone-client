import React, { useState } from 'react'
import {
    Card,
    FakeLink,
    Button,
    Subtitle,
    Image
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
    ProfileSection,
    LastImages
} from '../../styles/profile'
import { TiPlusOutline, TiMinusOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import Testimonials from './Testimonials'

const ProfileMain = ({ user, loggedUser, handleSendRequest, handleUnfriend }) => {
    const [viewFullProfile, setViewFullProfile] = useState(false)

    const timeOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }

    return (
        <MainColumn>
            <Card>
                <ProfileInfo>
                    <InlineHeader>
                        <div style={{maxWidth: '40%'}}>
                            <Subtitle>{ user.name }</Subtitle>
                        </div>
                        <div style={{
                            alignSelf: 'start', 
                            marginTop: '.6rem',
                            textAlign: 'right'
                        }}>
                            {
                                user.Friends.find(u => u.id === loggedUser.id)
                                ? <Button onClick={ () => handleUnfriend(user) }><TiMinusOutline className="icenter" style={{ color: '#bebebe' }} /> desfazer amizade</Button>
                                : (user.Requesters.find(u => u.id === loggedUser.id))
                                    ? <Button disabled>solicitação enviada</Button>
                                    : <Button onClick={ () => handleSendRequest(user) }><TiPlusOutline className="icenter" style={{ color: '#bebebe' }} /> adicionar como amigo</Button>
                            }
                            <FakeLink>ignorar</FakeLink>
                            <FakeLink>reportar</FakeLink>
                        </div>
                    </InlineHeader>
                    <ProfileSection border>
                        <div>
                            { user.city
                                ? (<p><strong>localização: </strong>{ user.city }, { user.country }</p>)
                                : (<p><strong>localização: </strong>{ user.country }</p>)}
                        </div>
                        {
                            viewFullProfile ? (
                                <div>
                                    <p><strong>sexo: </strong>{ user.sex }</p>
                                    <p><strong>idade: </strong>{ user.age }</p>
                                    <p><strong>aniversário: </strong>{ new Date(user.born).toLocaleString('pt-BR', timeOptions) }</p>
                                    <p><strong>e-mail: </strong>{ user.email }</p>
                                    <p><strong>interesses em: </strong>{ user.interests }</p>
                                </div>
                            ) : null
                        }
                        <FakeLink onClick={ () => setViewFullProfile(!viewFullProfile) }>
                                { viewFullProfile
                                    ? 'ocultar perfil'
                                    : 'ver perfil completo'
                                }
                        </FakeLink>
                    </ProfileSection>
                    <ProfileSection border>
                        <div>
                            <InlineHeader>
                                <Subtitle>Sobre { user.name }</Subtitle>
                            </InlineHeader>
                            
                            <p>{ user.about ? user.about : 'Sem informações.' }</p>
                        </div>
                    </ProfileSection>
                    <ProfileSection border>
                        <div>
                            <InlineHeader>
                                <Subtitle>Últimas Fotos</Subtitle>
                            </InlineHeader>
                            <LastImages>
                                {
                                    [...user.Photos].reverse().slice(0, 5).map(p => (
                                        <Link key={ p.id } to={`/perfil/${user.id}/albuns/${p.folderId}/fotos/${p.id}`} >
                                            <Image url={ p.url } size="85" />
                                        </Link>
                                    ))
                                }
                            </LastImages>
                            { user.Photos.length > 0 && <Link to={`/perfil/${user.id}/albuns`}><p>ver todas as fotos</p></Link>}
                        </div>
                    </ProfileSection>
                    <ProfileSection>
                        <div>
                            <InlineHeader>
                                <Subtitle>Vídeos Recentes</Subtitle>
                            </InlineHeader>
                        </div>
                    </ProfileSection>
                </ProfileInfo>
            </Card>
            <Testimonials user={ user } loggedUser={ loggedUser } />
        </MainColumn>
    )
}

export default ProfileMain