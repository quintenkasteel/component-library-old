import React from 'react';
import FileUpload from '../Library/components/Form/Inputs/FileUpload';

const FileUploadPage = () => {
  return (
    <div>
      <FileUpload onChange={(e) => console.log(e)}/>
    </div>
  );
};

export default FileUploadPage;
