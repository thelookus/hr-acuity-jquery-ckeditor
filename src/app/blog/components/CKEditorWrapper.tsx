import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CKEditorWrapper.scss';

interface CKEditorWrapperProps {
  value: string;
  onChange: (data: string) => void;
}

const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        licenseKey: 'GPL'
      }}
      onChange={(_event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default CKEditorWrapper;
