//@flow
import React from 'react';
import {FormControl} from 'react-bootstrap';
import {FormFieldOption} from '../../../types';

export default ({value, name, onChange, onBlur, field}: FormFieldOption) => {
  const {placeholder} = field;
  return <FormControl
            type="password"
            value={value}
            placeholder={placeholder}
            onBlur={() => onBlur(name)}
            onChange={e => onChange(name, e.target.value)}
        />;
}