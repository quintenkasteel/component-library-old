import React, { useState, useRef } from 'react';
import Label from '../../../styles/Label.js';
import {
  StyledFileUploadInput,
  StyledFileUploadContainer,
} from '../../../styles/FileUpload.js';


const FileUpload = ({ accepts, label, onChange = () => {} }) => {
  // state that will hold the Array of objects
  // initialized with empty array
  const [state, setState] = useState({ file: '', name: '' });
  const btnRef = useRef(null);
  // onChange function that reads files on uploading them
  // files read are encoded as Base64
  function onFileUpload(e) {
    e.preventDefault();
    // Create an instance of FileReader API
    const file_reader = new FileReader();
    // Get the actual file itself
    const file = e.target.files[0];
    const value = e.target.value.split(`\\`).pop();

    file_reader.onload = () => {
      // After uploading the file
      // appending the file to our state array
      // set the object keys and values accordingly
      setState({ name: value, file: file_reader.result });
      onChange({ name: value, file: file_reader.result })
    };
    // reading the actual uploaded file
    file_reader.readAsDataURL(file);
  }
  // handle submit button for form
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(state);
  // }
  // using useEffect we can detect if user uploaded any file,
  // so enable submit button
  return (
    <>
      <StyledFileUploadContainer>
        <Label>{label}</Label>
        <StyledFileUploadInput
          content={state.name !== '' ? state.name : 'Upload'}
          onChange={onFileUpload}
          accept={accepts}
          type={'file'}
        />
      </StyledFileUploadContainer>
    </>
  );
};

export default FileUpload;
