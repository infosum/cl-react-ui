import React from 'react';
import ReactDOM from 'react-dom';
import {Icon, Form, List, validations} from '../index';
import config from './config';
import CustomLayout from './CustomLayout';
console.log('validations', validations);

let data = [
  {drone_id: '1', label: 'label 1'}
],
row = {
  label: 'hi'
};

ReactDOM.render(
  <div>
    <h1>test form</h1>
    <Icon icon="leaf"
      color="info"
      label="leaf"
      pull="right"
      size={3}
      spin={true} />

    <List config={config}
      data={data}/>

    <Form config={config}
      layout={CustomLayout}
      data={row}
      errors={{}}
      onSubmit={e => console.log(e)} />

  </div>,
  document.getElementById('root')
);