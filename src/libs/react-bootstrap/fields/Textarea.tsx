import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { IFormField } from '../../../../index';

export default ({ value, name, onChange, field }: IFormField) => {
  const { placeholder } = field;
  return <FormControl
    componentClass="textarea"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(name, e.target.value)}
  />;
};
