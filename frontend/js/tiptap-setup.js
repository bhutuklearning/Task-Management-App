import { Editor } from 'https://esm.sh/@tiptap/core@2.0.3'
import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2.0.3'
import Placeholder from 'https://esm.sh/@tiptap/extension-placeholder@2.0.3'

let editor;

window.addEventListener('DOMContentLoaded', () => {
    editor = new Editor({
        element: document.querySelector('#tiptap'),
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your todo description here...',
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert focus:outline-none w-full min-h-[10rem] px-4 py-2',
            },
        },
        onUpdate({ editor }) {
            document.getElementById('description').value = editor.getHTML();
        },
    });

    // Toolbar actions
    document.getElementById('bold-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleBold().run();
    });

    document.getElementById('italic-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleItalic().run();
    });
});
