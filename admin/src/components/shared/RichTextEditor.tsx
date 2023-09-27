import { forwardRef } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type RichTextEditorProps = ReactQuillProps

export type RichTextEditorRef = ReactQuill

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
    (props, ref) => {
        return (
            <div className="rich-text-editor">
                <ReactQuill ref={ref} {...props} modules={modules} />
            </div>
        )
    }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
