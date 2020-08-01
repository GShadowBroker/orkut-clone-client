import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichEditor = ({ message, setEditorState, user, onBlur }) => {
    return (
        <Editor
            placeholder="digite o texto"
            editorState={ message }
            onEditorStateChange={ setEditorState }
            onBlur={ onBlur }

            localization={{
                locale: 'pt',
            }}
            spellCheck

            wrapperClassName="rich-editor editor-wrapper"
            editorClassName="rich-editor-input"

            toolbar={{
                options: ['inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                emoji: {
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    emojis: [
                        '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😡', '😫', '😴', '😌', '😥', '😭', '🤓',
                        '😛', '😜', '😠', '😇', '😷', '😱', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                        '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                        '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💐', '❤', '💚', '💛', '💔', '💘', '👀', '💪', '👈', '👉', '👉', '👆', '🖕',
                        '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                        '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                        '🍺', '🌍', '🚑',  '🚒', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                        '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                        '✅', '❎', '💯', '🏳‍🌈', '🌈'
                    ],
                },
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