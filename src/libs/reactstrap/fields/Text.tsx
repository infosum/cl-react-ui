import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';
import { IFormField } from '../../../interfaces';

const Text: React.SFC<IFormField> = ({ value, name, onChange, onBlur, field }) => {
  const { placeholder, size } = field;
  return <Input
    type="text"
    value={value}
    size={size}
    placeholder={placeholder}
    onBlur={() => onBlur(name)}
    onChange={(e) => onChange(name, e.target.value)}
  />;
};

export default Text;
