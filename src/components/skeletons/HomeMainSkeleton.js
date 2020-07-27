import React from 'react'

import {
    Card,
    Subtitle2,
    Message,
    MessageContent,
    MessageHeader,
    MessageBody,
} from '../../styles/layout'
import {
    MainColumn,
    ProfileInfo,
    InlineHeader,
} from '../../styles/profile'

import Skeleton from 'react-loading-skeleton'

const HomeMainSkeleton = () => {
    return (
        <MainColumn>
            <Card>
                <ProfileInfo style={{ marginTop: '.6rem' }}>
                    <Skeleton height={ 100 } />
                </ProfileInfo>
                <ProfileInfo>
                    <InlineHeader>
                        <h2><Skeleton width={ 150 } /></h2>
                        <Skeleton width={ 100 } />
                    </InlineHeader>
                </ProfileInfo>
                { Array.from(Array(10).keys()).map((i, index) =>
                    (<ProfileInfo key={ index } borderbottom>
                        <Message>
                            <div style={{ marginTop: 15 }}>
                                <Skeleton height={ 50 } width={ 50 } />
                            </div>
                            <MessageContent>
                                <MessageHeader>
                                    <Subtitle2><strong><Skeleton width={ 200 } /></strong></Subtitle2>
                                </MessageHeader>
                                <MessageBody>
                                    <p><Skeleton count={ 2 } /></p>
                                </MessageBody>
                            </MessageContent>
                        </Message>
                    </ProfileInfo>))
                }
            </Card>
        </MainColumn>
    )
}

export default HomeMainSkeleton