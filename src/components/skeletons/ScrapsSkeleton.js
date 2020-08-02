import React from 'react'

import { Card, FakeLink, Time } from '../../styles/layout'
import {
    MainColumn, 
    ProfileInfo, 
    CommentSectionHeader,
    CommentSectionFooter,
    PaginationBlock,
    CommentSection,
    Comment,
    CommentBody,
    CommentContent
} from '../../styles/profile'

import Skeleton from 'react-loading-skeleton'

const ScrapsSkeleton = () => {
    return (
        <MainColumn stretched>
            <Card>
                <ProfileInfo style={{ padding: '1rem' }}>
                    <Skeleton height={ 167 } />
                </ProfileInfo>
            </Card>

            <Card style={{ marginTop: '.6rem' }}>
                <ProfileInfo>
                    <h2><Skeleton width={ 200 } /></h2>
                    <p><Skeleton width={ 100 } /></p>
                    <CommentSectionHeader>
                        <span><Skeleton width={ 100 } /></span>
                        <span><Skeleton width={ 100 } /></span>
                    </CommentSectionHeader>
                    <CommentSectionHeader>
                        <span><Skeleton width={ 100 } /></span>
                        <PaginationBlock>
                            <span><Skeleton width={ 200 } /></span>
                        </PaginationBlock>
                    </CommentSectionHeader>

                    <CommentSection>
                        {
                            Array.from(Array(10).keys()).map((scrap, i) => (
                                <Comment key={ i }>
                                    <FakeLink>
                                        <Skeleton height={ 70 } width={ 70 } />
                                    </FakeLink>
                                    <CommentBody>
                                        <CommentSectionHeader style={{ margin: 0 }}>
                                            <FakeLink><Skeleton width={ 80 } /></FakeLink>
                                            <div>
                                                <Time size="1">
                                                    <Skeleton width={ 50 } /> <Skeleton width={ 20 } />
                                                </Time>
                                                <span><Skeleton width={ 80 } /></span>
                                            </div>
                                        </CommentSectionHeader>
                                        <CommentContent>
                                            <p><Skeleton count={ 2 } /></p>
                                        </CommentContent>
                                        <FakeLink><Skeleton width={ 50 } /></FakeLink>
                                    </CommentBody>
                                </Comment>
                            ))
                        }
                    </CommentSection>
                    <CommentSectionFooter>
                        <span><Skeleton width={ 200 } /></span>
                    </CommentSectionFooter>
                </ProfileInfo>
            </Card>
        </MainColumn>
    )
}

export default ScrapsSkeleton