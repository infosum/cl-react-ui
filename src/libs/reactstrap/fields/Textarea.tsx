/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Input} from 'reactstrap';

export default ({value, name, onChange, onBlur, field}: IFormField) =>
  <Input
      type="textarea"
      value={value}
      placeholder={field.placeholder}
      onBlur={() => onBlur(name)}
      onChange={(e) => onChange(name, e.target.value)} />;

