// @flow
import React from 'react';
import {Input} from 'reactstrap';
import {FormFieldProps} from '../../../types';

export default ({value, name, onChange, field}: FormFieldProps) => {
  const {placeholder} = field;
  return <Input
            type="hidden"
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)}
        />;
}