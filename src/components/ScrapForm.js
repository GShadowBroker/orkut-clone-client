import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { SEND_SCRAP, GET_USER_SCRAPS, FIND_USER } from '../services/queries'

import { Form, InputGroup, ActionGroup, Button, FakeLink } from '../styles/layout'

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js'

import RichEditor from './RichEditor'

// scrap.getCurrentContent() já é contentState

const ScrapForm = ({ user, loggedUser }) => {

    const [sendScrap, { loading }] = useMutation(SEND_SCRAP, {
        onError: error => {
            error.graphQLErrors
                ? alert(error.graphQLErrors[0].message)
                : alert('Server timeout')
        },
        refetchQueries: [
            {
                query: FIND_USER,
                variables: { userId: user.id }
            },
            {
                query: GET_USER_SCRAPS,
                variables: { receiverId: user.id, limit: 10, offset: 0 }
            }
        ]
    })

    let editorState = EditorState.createEmpty()

    const [ scrap, setScrap ] = useState(editorState)

    const setEditorState = (editorState) => {
        setScrap(editorState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendScrap({
            variables: {
                body: convertToRaw(scrap.getCurrentContent()),
                senderId: loggedUser.id,
                userId: user.id
            }
        })
        setScrap(EditorState.createEmpty())
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <InputGroup>
                <RichEditor
                    scrap={ scrap }
                    setEditorState={ setEditorState }
                    user={ loggedUser } // PASSAR O USUÁRIO ATUAL DA SESSÃO, E NÃO O USUÁRIO DO PERFIL
                />
            </InputGroup>
            <ActionGroup>
                <Button type="submit">{ loading ? 'enviando...' : 'enviar scrap' }</Button>
                <Button>visualizar</Button>
                <FakeLink>dicas de recados</FakeLink>
            </ActionGroup>
        </Form>
    )
}

export default ScrapForm