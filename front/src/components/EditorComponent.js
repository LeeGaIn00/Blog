import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

// styles
import "../assets/scss/writepost.scss"

class EditorComponent extends Component {
    constructor(props) {
        super(props);
    }

    modules = {
        toolbar:  {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['image'],
                [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                ['clean']
            ],
            // handlers: {
            //     image: () => {
                
            //     },
        }
    }
        
       
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background',        
      ]

    render() {
        const { value, onChange } = this.props;
        return (
            <div 
                className="editor-main"
            >
                <ReactQuill 
                    className="quill"
                    theme="snow"
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''} 
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                    placeholder="내용을 입력하세요"
                />
            </div>
        );
    }
}

export default EditorComponent;