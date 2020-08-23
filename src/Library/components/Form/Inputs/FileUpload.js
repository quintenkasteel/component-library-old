import React, { useState, useRef } from 'react';
import Label from '../../../styles/Label.js';
import {
  StyledFileUploadInput,
  StyledFileUploadContainer,
} from '../../../styles/FileUpload.js';
import Error from "../../../styles/Error.js";

const FileUpload = ({
  accepts = ['png'],
  limitFileSelect,
  label,
  errorMessageNotSupported = 'File type $ is not supported',
  onChange = () => {},
}) => {
  // state that will hold the Array of objects
  // initialized with empty array
  const [state, setState] = useState({
    file: undefined,
    name: undefined,
    type: undefined,
    error: undefined,
  });
  // onChange function that reads files on uploading them
  // files read are encoded as Base64
  function onFileUpload(e) {
    e.preventDefault();
    // Create an instance of FileReader API
    const file_reader = new FileReader();
    // Get the actual file itself
    const file = e.target.files[0];
    const value = e.target.value.split(`\\`).pop();
    const type = e.target.value.split(`.`).pop();
    const error = (!accepts.includes(type) && 'not-supported') || undefined;

    file_reader.onload = () => {
      const prepareState = {
        name: value,
        file: file_reader.result,
        type: type,
        error: error,
      };
      // After uploading the file
      // appending the file to our state array
      // set the object keys and values accordingly
      setState(prepareState);
      onChange(prepareState);
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
  const PrepareError = () => {
    if (!state.error) return null;
    switch (state.error) {
      case 'not-supported' :
        return <Error>{errorMessageNotSupported.replace('$', `.${state.type}`)}</Error>;
      case 'not' : 
        return <Error>{errorMessageNotSupported.replace('$', `.${state.type}`)}</Error>;
      default:
        null;
    }
  };

  return (
    <>
      <StyledFileUploadContainer>
        <Label>{label}</Label>
        <StyledFileUploadInput
          content={state.name ? state.name : 'Upload'}
          onChange={onFileUpload}
          accept={accepts && limitFileSelect}
          type={'file'}
        />
        <PrepareError />
      </StyledFileUploadContainer>
    </>
  );
};

export default FileUpload;
