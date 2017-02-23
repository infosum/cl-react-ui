// @flow
import React from 'react';
import {FormControl} from 'react-bootstrap';
import {FormFieldProps} from '../../../types';

export default ({value, name, onChange, field}: FormFieldProps) => {
  const {placeholder} = field;
  return <FormControl
            type="hidden"
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)}
        />;
}