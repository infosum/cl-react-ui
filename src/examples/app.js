import React from 'react';
import ReactDOM from 'react-dom';
import {Form, List} from '../index';
import config from './config';
import CustomLayout from './CustomLayout';

let data = [
  {drone_id: '1', label: 'label 1'}
],
row = {
  label: 'hi'
};

ReactDOM.render(
  <div>
    <h1>test form</h1>

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