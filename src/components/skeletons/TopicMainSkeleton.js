import React from 'react'
import {
    Card,
    Subtitle,
    Message,
    MessageContent,
    MessageBody,
    Time,
    FakeLink,
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    CommentSectionFooter,
    CommentSectionHeader
} from '../../styles/profile'

import Skeleton from 'react-loading-skeleton'

const TopicMainSkeleton = () => {
    return (
        <MainColumn stretched>
            <Card style={{marginBottom: '.6rem'}}>
                <ProfileInfo>
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '0'}}>
                        <div style={{maxWidth: '80%'}}>
                            <FakeLink>
                                <Subtitle><Skeleton width={ 200 } />
                                    <span style={{border: 'none', fontSize: '.8em', color: 'grey', marginLeft: '.5rem'}}>
                                        <Skeleton width={ 100 } />
                                    </span>
                                </Subtitle>
                            </FakeLink>
                        </div>
                        <div style={{
                            alignSelf: 'start', 
                            marginTop: '.6rem',
                            textAlign: 'right'
                        }}>
                            <Skeleton width={ 150 } height={25} />
                        </div>
                    </div>
                    <Skeleton width={ 200 } />
                </ProfileInfo>

                <ProfileInfo>
                    <CommentSectionFooter>
                        <Skeleton width={200} />
                    </CommentSectionFooter>
                </ProfileInfo>

                <ProfileInfo style={{ padding: '.5rem .8rem' }}>
                    <Message style={{borderTop: '.3px solid #e3e8f5'}}>
                        <FakeLink>
                            <Skeleton width={ 60 } height={ 60 } />
                        </FakeLink>
                        <MessageContent>
                            <CommentSectionHeader style={{margin: 0}}>
                                <div>
                                    <FakeLink><strong><Skeleton width={ 80 } /></strong></FakeLink>
                                    <Time style={{paddingLeft: '.5rem'}}>
                                        <Skeleton width={ 80 } />
                                    </Time>
                                </div>
                            </CommentSectionHeader>
                            <MessageBody>
                            <Skeleton count={ 3 } />
                            </MessageBody>
                        </MessageContent>
                    </Message>
                </ProfileInfo>
            </Card>

            <Card>
                <ProfileInfo style={{ padding: '0 .8rem .5rem .8rem' }}>
                    { Array.from(Array(9).keys()).map((c, index) =>
                        (<Message key={ index } style={{borderTop: '.3px solid #e3e8f5'}}>
                            <FakeLink>
                                <Skeleton width={ 60 } height={ 60 } />
                            </FakeLink>
                            <MessageContent>
                                <CommentSectionHeader style={{margin: 0}}>
                                    <div>
                                        <FakeLink><strong><Skeleton width={ 80 } /></strong></FakeLink>
                                        <Time style={{paddingLeft: '.5rem'}}>
                                            <Skeleton width={ 80 } />
                                        </Time>
                                    </div>
                                </CommentSectionHeader>
                                <MessageBody>
                                <Skeleton count={ 3 } />
                                </MessageBody>
                            </MessageContent>
                        </Message>))}
                </ProfileInfo>

                <ProfileInfo>
                    <CommentSectionFooter>
                        <Skeleton width={200} />
                    </CommentSectionFooter>
                </ProfileInfo>

                <ProfileInfo style={{ marginBottom: '1rem' }}>
                    <Skeleton width={100} />
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default TopicMainSkeleton