import React from 'react'

import {
    Card,
    Subtitle,
    Message,
    MessageContent,
    MessageHeader,
    MessageBody,
    Time,
    FakeLink
} from '../../styles/layout'
import {
    ProfileInfo,
    InlineHeader
} from '../../styles/profile'

import Skeleton from 'react-loading-skeleton'

const TestimonialsSkeleton = () => {
    return (
        <Card style={{ marginTop: '.6em' }}>
            <ProfileInfo>
                <InlineHeader>
                    <Subtitle><Skeleton width={ 150 } /></Subtitle>
                </InlineHeader>
                {   
                    Array.from(Array(2).keys()).map((t, i) => (
                        <Message key={ i }>
                            <FakeLink>
                                <Skeleton height={ 50 } width={ 50 } />
                            </FakeLink>
                            <MessageContent>
                                <MessageHeader>
                                    <FakeLink><Skeleton width={ 100 } /></FakeLink>
                                    <Time>
                                        <Skeleton width={ 50 } /> <Skeleton width={ 20 } />
                                    </Time>
                                </MessageHeader>
                                <MessageBody>
                                    <Skeleton count={ 4 } />
                                </MessageBody>
                            </MessageContent>
                        </Message>
                    ))
                }
            </ProfileInfo>
        </Card>
    )
}

export default TestimonialsSkeleton