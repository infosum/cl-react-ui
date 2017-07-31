import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { IFormField } from '../../../../index';

export default ({ value, name, onChange, onBlur, field }: IFormField) => {
  const { placeholder } = field;
  return <FormControl
    type="number"
    value={value}
    placeholder={placeholder}
    onBlur={() => onBlur(name)}
    onChange={(e) => onChange(name, e.target.value)}
  />;
};
