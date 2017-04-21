// @flow
import React from 'react';
import {Input} from 'reactstrap';
import {FormFieldProps} from '../../../types';

export default ({value, name, onChange, onBlur, field}: FormFieldProps) => {
  const {placeholder} = field;
  return <Input
            type="number"
            value={value}
            placeholder={placeholder}
            onBlur={() => onBlur(name)}
            onChange={e => onChange(name, e.target.value)}
        />;
}
