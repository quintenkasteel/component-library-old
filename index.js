import ReactDOM from '@hot-loader/react-dom';
import React from 'react';
require("babel-core/register");
require("babel-polyfill");
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './src/App.js';
import AccordionPage from './src/docs/Accordion.js';
import ButtonPage from './src/docs/Button.js';
import CheckBoxPage from './src/docs/Checkbox.js';
import ColorPickerPage from './src/docs/ColorPicker.js';
import ColumnPage from './src/docs/Column.js';
import ContainerPage from './src/docs/Container.js';
import DatePickerPage from './src/docs/DatePicker.js';
import DividerPage from './src/docs/Divider.js';
import FileUploadPage from './src/docs/FileUpload.js';
import FormPage from './src/docs/Form.js';
import GridPage from './src/docs/Grid.js';
import HeadingPage from './src/docs/Heading.js';
import IconPage from './src/docs/Icon.js';
import ImagePage from './src/docs/Image.js';
import InputPage from './src/docs/Input.js';
import LinkPage from './src/docs/Link.js';
import MasonryGridPage from './src/docs/MasonryGrid.js';
import ModalPage from './src/docs/Modal.js';
import PageProgressPage from './src/docs/PageProgress.js';
import ProgressPage from './src/docs/Progress.js';
import RadioPage from './src/docs/Radio.js';
import RangeSliderPage from './src/docs/RangeSlider.js';
import ResetPage from './src/docs/Reset.js';
import RowPage from './src/docs/Row.js';
import SearchPage from './src/docs/Search.js';
import SelectPage from './src/docs/Select.js';
import SliderPage from './src/docs/Slider.js';
import SubmitPage from './src/docs/Submit.js';
import TabsPage from './src/docs/Tabs.js';
import TelPage from './src/docs/Tel.js';
import TextPage from './src/docs/Text.js';
import TextAreaPage from './src/docs/TextArea.js';
import TimePage from './src/docs/Time.js';
import VideoPage from './src/docs/Video.js';
import styled from 'styled-components';
import DragAndDropPage from './src/docs/DragAndDrop.js';

const BodyContainer = styled.div`
  margin-left: 120px;
  padding: 20px;
`
const MenuContainer = styled.div`
  position: fixed;
  width: 100px;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  display: flex;
  flex-flow: column nowrap;
  z-index: 100;
`
const menu = () => {
  return (
    <MenuContainer>
      <Link to="/">Home</Link>
      <Link to="/accordion">Accordion</Link>
      <Link to="/button">Button</Link>
      <Link to="/checkbox">Checkbox</Link>
      <Link to="/colorpicker">Colorpicker</Link>
      <Link to="/column">Column</Link>
      <Link to="/container">Container</Link>
      <Link to="/datepicker">DatePicker</Link>
      <Link to="/divider">Divider</Link>
      <Link to="/file-upload">File Upload</Link>
      <Link to="/form">Form</Link>
      <Link to="/grid">Grid</Link>
      <Link to="/heading">Heading</Link>
      <Link to="/icon">Icon</Link>
      <Link to="/image">Image</Link>
      <Link to="/input">Input</Link>
      <Link to="/link">Link</Link>
      <Link to="/masonry-grid">Masonry Grid</Link>
      <Link to="/modal">Modal</Link>
      <Link to="/page-progress">Page Progress</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/radio">Radio</Link>
      <Link to="/range-slider">Range Slider</Link>
      <Link to="/reset">Reset</Link>
      <Link to="/row">Row</Link>
      <Link to="/search">search</Link>
      <Link to="/select">Select</Link>
      <Link to="/slider">Slider</Link>
      <Link to="/submit">Submit</Link>
      <Link to="/tabs">Tabs</Link>
      <Link to="/tel">Tel</Link>
      <Link to="/text">Text</Link>
      <Link to="/text-area">Text Area</Link>
      <Link to="/time">Time</Link>
      <Link to="/video">Video</Link>
    </MenuContainer>
  );
};
const App = () => {
  return (
    <Router>
      <BodyContainer>
        {menu()}
        <Switch>
          <Route path="/accordion">
            <AccordionPage />
          </Route>
          <Route path="/button">
            <ButtonPage />
          </Route>
          <Route path="/checkbox">
            <CheckBoxPage />
          </Route>
          <Route path="/colorpicker">
            <ColorPickerPage />
          </Route>
          <Route path="/column">
            <ColumnPage />
          </Route>
          <Route path="/container">
            <ContainerPage />
          </Route>
          <Route path="/datepicker">
            <DatePickerPage />
          </Route>
          <Route path="/divider">
            <DividerPage />
          </Route>
          <Route path="/file-upload">
            <FileUploadPage />
          </Route>
          <Route path="/form">
            <FormPage />
          </Route>
          <Route path="/grid">
            <GridPage />
          </Route>
          <Route path="/heading">
            <HeadingPage />
          </Route>
          <Route path="/icon">
            <IconPage />
          </Route>
          <Route path="/image">
            <ImagePage />
          </Route>
          <Route path="/input">
            <InputPage />
          </Route>
          <Route path="/link">
            <LinkPage />
          </Route>
          <Route path="/masonry-grid">
            <MasonryGridPage />
          </Route>
          <Route path="/modal">
            <ModalPage />
          </Route>
          <Route path="/page-progress">
            <PageProgressPage />
          </Route>
          <Route path="/progress">
            <ProgressPage />
          </Route>
          <Route path="/radio">
            <RadioPage />
          </Route>
          <Route path="/range-slider">
            <RangeSliderPage />
          </Route>
          <Route path="/reset">
            <ResetPage />
          </Route>
          <Route path="/row">
            <RowPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/select">
            <SelectPage />
          </Route>
          <Route path="/slider">
            <SliderPage />
          </Route>
          <Route path="/submit">
            <SubmitPage />
          </Route>
          <Route path="/tabs">
            <TabsPage />
          </Route>
          <Route path="/tel">
            <TelPage />
          </Route>
          <Route path="/text">
            <TextPage />
          </Route>
          <Route path="/text-area">
            <TextAreaPage />
          </Route>
          <Route path="/time">
            <TimePage />
          </Route>
          <Route path="/video">
            <VideoPage />
          </Route>
          <Route path="/">
            <DragAndDropPage />
          </Route>
        </Switch>
      </BodyContainer>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
