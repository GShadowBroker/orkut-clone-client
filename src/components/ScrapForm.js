import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { SEND_SCRAP, GET_USER_SCRAPS, FIND_USER } from '../services/queries'

import { Form, InputGroup, ActionGroup, Button, FakeLink } from '../styles/layout'

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

import RichEditor from './RichEditor'

// scrap.getCurrentContent() já é contentState

const ScrapForm = ({ user, loggedUser, limit, offset }) => {

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
                variables: { receiverId: user.id, limit, offset }
            },
        ],
        onCompleted: () => setScrap(EditorState.createEmpty()), // Clears input after submission
        // update: (store, response) => {
        //     const userInStore = store.readQuery({ query: FIND_USER, variables: { userId: user.id } })
        //     store.writeQuery({
        //         query: FIND_USER,
        //         data: {
        //             ...userInStore,
        //             findUser: { ...userInStore.findUser, Scraps: [
        //                 ...userInStore.findUser.Scraps,
        //                 response.data.sendScrap
        //             ]}
        //         }
        //     })
        // }
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
                body: draftToHtml(convertToRaw(scrap.getCurrentContent())),
                userId: user.id
            }
        })
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <InputGroup>
                <RichEditor
                    message={ scrap }
                    setEditorState={ setEditorState }
                    user={ loggedUser }
                />
            </InputGroup>
            <ActionGroup>
                <Button type="submit" disabled={ loading }>{ loading ? 'enviando...' : 'enviar scrap' }</Button>
                <Button>visualizar</Button>
                <FakeLink>dicas de recados</FakeLink>
            </ActionGroup>
        </Form>
    )
}

export default ScrapForm