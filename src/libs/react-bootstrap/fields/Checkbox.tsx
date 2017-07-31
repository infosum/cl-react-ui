import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { IFormField } from '../../../../index';

export default ({ value, name, onChange, field }: IFormField) => {
  let checked;
  if (typeof value === 'boolean') {
    checked = value === true;
  } else {
    checked = (value === '1' || value === 'true');
  }
  const { label } = field;

  return (<Checkbox
    checked={checked}
    value={value}
    onChange={(e) => onChange(name, e.target.checked)}>
    {label} {value}
  </Checkbox>);
};
