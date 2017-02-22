import React from 'react';
import {FormControl} from 'react-bootstrap';

export default ({value, name, onChange, onBlur, placeholder = ''}) => {
  return <FormControl
            type="text"
            value={value}
            placeholder={placeholder}
            onBlur={() => onBlur(name)}
            onChange={e => onChange(e, name)}
        />;
}