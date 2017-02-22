import React from 'react';
import {FormControl} from 'react-bootstrap';

export default ({value, name, onChange, placeholder = ''}) => {
  return <FormControl
            componentClass="textarea"
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e, name)}
        />;
}