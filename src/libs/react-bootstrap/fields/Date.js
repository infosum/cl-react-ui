import React from 'react';
import {FormControl} from 'react-bootstrap';

export default ({value, name, onChange, placeholder = ''}) => {
  return <FormControl
            type="date"
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)}
        />;
}