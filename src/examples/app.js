import React from 'react';
import ReactDOM from 'react-dom';
import {Form, List} from '../index';
import config from './config';
import CustomLayout from './CustomLayout';

console.log('customlayout = ', CustomLayout);
let data = [
  {drone_id: '1', label: 'label 1'}
]
ReactDOM.render(
  <div>
    <h1>test form</h1>

    <Form config={config}
      layout={CustomLayout}
      errors={{}}
      onSubmit={e => console.log(e)} />
  </div>,
  document.getElementById('root')
);