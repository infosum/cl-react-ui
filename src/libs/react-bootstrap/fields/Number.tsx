/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {FormControl} from 'react-bootstrap';

export default ({value, name, onChange, onBlur, field}: IFormField) => {
  const {placeholder} = field;
  return <FormControl
            type="number"
            value={value}
            placeholder={placeholder}
            onBlur={() => onBlur(name)}
            onChange={(e) => onChange(name, e.target.value)}
        />;
};
