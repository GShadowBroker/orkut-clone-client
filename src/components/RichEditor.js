import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichEditor = ({ message, setEditorState, user }) => {
    return (
        <Editor
            placeholder="digite o texto"
            editorState={ message }
            onEditorStateChange={ setEditorState }

            localization={{
                locale: 'pt',
            }}

            wrapperClassName="rich-editor editor-wrapper"
            editorClassName="rich-editor-input"

            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
            }}

            mention={{
                separator: ' ',
                trigger: '@',
                suggestions: user.Friends.map(friend => ({
                    text: friend.name,
                    value: friend.name,
                    url: `/perfil/${friend.id}`
                })),
            }}
        />
    )
}

export default RichEditor