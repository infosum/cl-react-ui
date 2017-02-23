import React from 'react';
import {Input} from 'reactstrap';

export default ({value, name, onChange, onBlur, placeholder = ''}) => {
  return <Input
            type="text"
            value={value}
            placeholder={placeholder}
            onBlur={() => onBlur(name)}
            onChange={e => onChange(name, e.target.value)}
        />;
}
