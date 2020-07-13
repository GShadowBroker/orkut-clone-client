import React from 'react'
import { Editor } from 'react-draft-wysiwyg'

const RichEditor = ({ scrap, setEditorState, user }) => {
    return (
        <Editor
            placeholder="digite o texto"
            editorState={ scrap }
            onEditorStateChange={ setEditorState }

            localization={{
                locale: 'pt',
            }}

            wrapperClassName="rich-editor demo-wrapper"
            editorClassName="demo-editor"

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