import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { IFormField } from '../../../interfaces';

export default ({ value, name, onChange, field }: IFormField) => {
  let checked;
  if (typeof value === 'boolean') {
    checked = value === true;
  } else {
    checked = (value === '1' || value === 'true');
  }
  const { label, size } = field;

  return (<Label check>
    <Input
      type="checkbox"
      checked={checked}
      size={size}
      value={'1'}
      onClick={(e) => {
        const target = e.target as HTMLInputElement;
        return onChange(name, target.checked);
      }} />{' '}
    {label}
  </Label>);
};
