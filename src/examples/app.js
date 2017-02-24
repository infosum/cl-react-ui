import React from 'react';
import ReactDOM from 'react-dom';
import {Form, List} from '../index';
import config from './config';

let data = [
  {drone_id: '1', label: 'label 1'}
]
ReactDOM.render(
  <div>
    <h1>test form</h1>
    <List config={config}
      data={data}
      selected={[]}
      user={{}}
      actions={{
        deselectAllRows: () => {},
        selectAllRows: () => {}
      }} />
    <Form config={config}
      errors={{}}
      onSubmit={e => console.log(e)} />
  </div>,
  document.getElementById('root')
);