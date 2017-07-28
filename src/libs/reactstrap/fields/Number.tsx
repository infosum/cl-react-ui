/// <reference path="../../../index.d.ts" />
import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';

export default ({ value, name, onChange, onBlur, field }: IFormField) => {
  const { placeholder } = field;
  return <Input
    type="number"
    value={value}
    placeholder={placeholder}
    onBlur={() => onBlur(name)}
    onChange={(e) => onChange(name, e.target.value)}
  />;
};
