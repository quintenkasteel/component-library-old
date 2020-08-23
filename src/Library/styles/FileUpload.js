import styled from 'styled-components';

const StyledFileUploadContainer = styled.div`
  width: auto;
  display: flex;
  flex-flow: column nowrap;
`;
const StyledFileUploadInput = styled.input`
color: transparent;
user-select: none;
overflow: hidden;
margin-bottom: 10px;

&:focus,
&:active,
&:hover {
  outline: 0;
}

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

&:before {
  content: '${props => (props.content ? `${props.content}` : `upload`)}';
  display: inline-block;
  color: white;
  background: blue;
  overflow: hidden;
  border-radius: 3px;
  padding: 10px 15px;
  outline: none;
  user-select: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
}
`;

export { StyledFileUploadContainer, StyledFileUploadInput };
