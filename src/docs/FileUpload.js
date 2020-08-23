import React from 'react';
import FileUpload from '../library/components/form/inputs/FileUpload';

const FileUploadPage = () => {
  return (
    <div>
      <FileUpload onChange={(e) => console.log(e)}/>
    </div>
  );
};

export default FileUploadPage;
