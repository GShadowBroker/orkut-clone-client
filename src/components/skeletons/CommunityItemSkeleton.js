import React from 'react'
import {
    Message,
    MessageContent,
    MessageHeaderSpaced,
    MessageBody,
    Time,
    FakeLink
} from '../../styles/layout'

import Skeleton from 'react-loading-skeleton'

const CommunityItemSkeleton = () => {
    return (
        <Message>
            <FakeLink>
                <Skeleton width={70} height={70} />
            </FakeLink>
            <MessageContent>
                <MessageHeaderSpaced>
                    <FakeLink><strong><Skeleton width={150} /></strong></FakeLink>
                    <Time>
                        <Skeleton width={100} />
                    </Time>
                </MessageHeaderSpaced>
                <MessageBody>
                    <p style={{ marginBottom: '.3rem' }}><Skeleton width={200} /></p>
                    <FakeLink><Skeleton width={150} /></FakeLink>
                </MessageBody>
            </MessageContent>
        </Message>
    )
}

export default CommunityItemSkeleton