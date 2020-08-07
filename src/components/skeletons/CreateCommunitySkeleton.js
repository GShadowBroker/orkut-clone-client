import React from 'react'
import {
    RegisterContainer,
    FormRegister,
    RegisterInputGroup,
    LabelControl,
    InputControl
} from '../../styles/auth'
import {
    ButtonGroup
} from '../../styles/layout'

import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

const VerticalRadio = styled.div`
    display: flex;
    flex-direction: column;
    padding: .2rem;
`

const CreateCommunitySkeleton = () => {
    return (
        <div>
            <RegisterContainer>
                <h1><Skeleton width={200} height={25} /></h1>
                <Skeleton width={150} />
                <FormRegister>
                    <RegisterInputGroup>
                        <LabelControl>
                            <label><Skeleton width={80} /></label>
                        </LabelControl>
                        <InputControl>
                            <Skeleton width={180} height={25} />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label><Skeleton width={100} /></label>
                        </LabelControl>
                        <InputControl>
                            <Skeleton width={200} height={25} />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <span><Skeleton width={50} /></span>
                        </LabelControl>
                        <VerticalRadio>
                            <Skeleton width={300} />
                            <Skeleton width={300} />
                        </VerticalRadio>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label><Skeleton width={100} /></label>
                        </LabelControl>
                        <InputControl>
                            <Skeleton width={100} height={25} />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label><Skeleton width={80} /></label>
                        </LabelControl>
                        <InputControl>
                            <Skeleton width={280} height={25} />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label><Skeleton width={100} /></label>
                        </LabelControl>
                        <InputControl>
                            <Skeleton width={250} height={25} />
                        </InputControl>
                    </RegisterInputGroup>

                    <RegisterInputGroup>
                        <LabelControl>
                            <label><Skeleton width={100} /></label>
                        </LabelControl>
                        <InputControl style={{flexDirection: 'column', alignItems: 'end'}}>
                            <Skeleton width={300} height={200} />
                            <p><Skeleton width={150} /></p>
                        </InputControl>
                        
                    </RegisterInputGroup>

                    <ButtonGroup>
                        <Skeleton width={200} height={25} />
                    </ButtonGroup>
                </FormRegister>
            </RegisterContainer>
        </div>
    )
}

export default CreateCommunitySkeleton