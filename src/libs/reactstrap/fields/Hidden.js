import React from 'react';
import {Input} from 'reactstrap';

export default ({value, name, onChange, placeholder = ''}) => {
  return <Input
            type="hidden"
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)}
        />;
}