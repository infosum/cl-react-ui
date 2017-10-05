import * as React from 'react';
import ReactSelect from '../src/libs/reactstrap/fields/ReactSelect';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';

const ReactSelectFieldStory = () => {
  
  return <ReactSelect 
  name="react-select"
  field={{
    options: [
      {value: '', label: 'Please select'},
      {value: '1', label: 'One'},
      {value: '2', label: 'Two'},
    ]
  }}
    onChange={(name, value) => {
      console.log(name + ' changed to ' + value);
      }} />;
}

export default ReactSelectFieldStory;
