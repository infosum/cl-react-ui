import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';
import { IFormField } from '../../../interfaces';

export default ({ value, name, onChange, onBlur, field }: IFormField) => {
  const { size, placeholder } = field;
  return <Input
    type="textarea"
    size={size}
    placeholder={placeholder}
    value={value}
    onBlur={() => onBlur(name)}
    onChange={(e) => onChange(name, e.target.value)} />;
};
