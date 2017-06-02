/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Input} from 'reactstrap';

export default ({value, name, onChange, onBlur, field}: IFormField) => {
  const {placeholder} = field;
  return <Input
            type="email"
            value={value}
            placeholder={placeholder}
            onBlur={() => onBlur(name)}
            onChange={(e) => onChange(name, e.target.value)}
        />;
};
