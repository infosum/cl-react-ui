import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';
import { IFormField } from '../../../interfaces';

export default ({ value, name, onChange, onBlur, field }: IFormField) => {
  const { placeholder, size } = field;
  return <Input
    type="password"
    size={size}
    value={value}
    placeholder={placeholder}
    onBlur={() => onBlur(name)}
    onChange={(e) => onChange(name, e.target.value)}
  />;
};
