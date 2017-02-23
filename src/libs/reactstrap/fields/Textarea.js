import React from 'react';
import {Input} from 'reactstrap';

export default ({value, name, onChange, onBlur, placeholder = ''}) =>
  <Input
      type="textarea"
      value={value}
      placeholder={placeholder}
      onBlur={() => onBlur(name)}
      onChange={e => onChange(name, e.target.value)}
  />;