import React from 'react'
import {
    Card,
    FakeLink,
    Subtitle,
    Message,
    MessageContent,
    MessageHeaderSpaced,
    MessageBody,
    MessageDetails,
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    ProfileSection
} from '../../styles/profile'
import { IoIosArrowDropdown } from 'react-icons/io'
import Skeleton from 'react-loading-skeleton'

const CommunityMainSkeleton = () => {
    return (
        <MainColumn>
            <Card>
                <ProfileInfo>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Subtitle><Skeleton width={ 250 } /></Subtitle>
                        <Skeleton width={100} height={25} />
                    </div>
                    <ProfileSection  border style={{ paddingBottom: '.5rem' }}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{marginLeft: '.5rem', minWidth: '46%'}}>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                            </div>
                            <div style={{marginLeft: '.5rem', minWidth: '46%'}}>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                                <p><strong><Skeleton width={80} /> </strong><Skeleton width={80} /></p>
                            </div>
                        </div>
                    </ProfileSection>
                    <ProfileSection border>
                        <div style={{lineHeight: '1.6'}}>
                            <p><Skeleton count={ 5 } /></p>
                        </div>
                    </ProfileSection>
                </ProfileInfo>
            </Card>

            <Card style={{ marginTop: '.6em' }}>
                <ProfileInfo>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{maxWidth: '40%'}}>
                            <Subtitle style={{paddingBottom: '0'}}><Skeleton width={80} /></Subtitle>
                        </div>
                        <div style={{
                            alignSelf: 'start', 
                            marginTop: '.6rem',
                            textAlign: 'right'
                        }}>
                            <Skeleton width={100} height={25} />
                        </div>
                    </div>

                    <div style={{
                        padding: '.5rem 0'
                    }}>
                        {
                            Array.from(Array(5).keys()).map((t, index) => (
                                <FakeLink
                                    key={ index }
                                    style={{borderBottom: '.3px solid #e3e8f5'}}
                                >
                                    <Message style={{borderBottom: '.3px solid #e3e8f5'}}>
                                        <Skeleton width={40} height={40} />
                                        <MessageContent>
                                            <MessageHeaderSpaced style={{fontSize: '1.1em'}}>
                                                <FakeLink><strong><Skeleton width={150} /></strong></FakeLink>
                                                <IoIosArrowDropdown style={{ color: '#bebebe', fontSize: '1.2em' }} />
                                            </MessageHeaderSpaced>
                                                <MessageBody>
                                                    <MessageDetails>
                                                        <span><Skeleton width={100} /></span>
                                                        <span><Skeleton width={150} /></span>
                                                        <span style={{ fontSize: '.9em' }}>
                                                            <Skeleton width={80} />
                                                        </span>
                                                    </MessageDetails>
                                                </MessageBody>
                                        </MessageContent>
                                    </Message>
                                </FakeLink>
                            ))
                        }
                    </div>
                </ProfileInfo>
                <ProfileInfo style={{paddingBottom: '1.2rem'}}>
                    <FakeLink><Skeleton width={100} /></FakeLink>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default CommunityMainSkeleton