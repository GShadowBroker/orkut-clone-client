import React, { useState } from 'react'

import { Form, InputGroup, ActionGroup, Button, FakeLink } from '../styles/layout'

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
// import draftToHtml from 'draftjs-to-html';

import RichEditor from './RichEditor'

// scrap.getCurrentContent() já é contentState

const ScrapForm = ({ user }) => {

    const content = window.localStorage.getItem('content')

    let editorState
    if (content) {
        editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
        editorState = EditorState.createEmpty()
    }

    const [ scrap, setScrap ] = useState(editorState)

    const setEditorState = (editorState) => {
        setScrap(editorState)
        saveContent(editorState)
        console.log('rawData', convertToRaw(scrap.getCurrentContent()))
    }

    const saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content.getCurrentContent())))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(scrap.getCurrentContent())
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <InputGroup>
                <RichEditor
                    scrap={ scrap }
                    setEditorState={ setEditorState }
                    user={ user } // PASSAR O USUÁRIO ATUAL DA SESSÃO, E NÃO O USUÁRIO DO PERFIL
                />
            </InputGroup>
            <ActionGroup>
                <Button type="submit">enviar scrap</Button>
                <Button>visualizar</Button>
                <Button>adicionar foto</Button>
                <FakeLink>dicas de recados</FakeLink>
            </ActionGroup>
        </Form>
    )
}

export default ScrapForm