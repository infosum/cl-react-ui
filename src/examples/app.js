import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../index';
import config from './config';

ReactDOM.render(
  <div>
    <h1>test form</h1>
    <Form config={config}
      errors={{}}
      onSubmit={e => console.log(e)} />
  </div>,
  document.getElementById('root')
);