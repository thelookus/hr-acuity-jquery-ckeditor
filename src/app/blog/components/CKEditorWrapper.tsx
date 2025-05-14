import React, { useEffect, useRef } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './CKEditorWrapper.scss';

// Props we need for the editor
interface CKEditorWrapperProps {
    initialData: string;
    onChange: (data: string) => void;
}

export const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({ initialData, onChange }) => {
    // Keep track of the editor instance
    const editorRef = useRef<any>(null);

    // Clean up when we're done
    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ height: '300px' }}>
            <CKEditor
                editor={ClassicEditor}
                data={initialData}
                config={{
                    licenseKey: 'GPL',
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'bulletedList',
                        'numberedList'
                    ]
                }}
                onReady={editor => {
                    editorRef.current = editor;
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </div>
    );
};
