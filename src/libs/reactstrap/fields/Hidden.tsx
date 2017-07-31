import * as React from 'react';
import { Input } from 'reactstrap';
import { IFormField } from '../../../../index';

export default ({ value, name, onChange, field }: IFormField) => {
  const { placeholder } = field;
  return <Input
    type="hidden"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(name, e.target.value)}
  />;
};
