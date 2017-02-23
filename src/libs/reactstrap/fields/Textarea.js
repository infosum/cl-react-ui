// @flow
import React from 'react';
import {Input} from 'reactstrap';
import {FormFieldProps} from '../../../types';

export default ({value, name, onChange, onBlur, field}: FormFieldProps) =>
  <Input
      type="textarea"
      value={value}
      placeholder={field.placeholder}
      onBlur={() => onBlur(name)}
      onChange={e => onChange(name, e.target.value)}
  />;