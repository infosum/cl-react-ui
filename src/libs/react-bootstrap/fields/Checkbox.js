// @flow
import React from 'react';
import {Checkbox} from 'react-bootstrap';
import {FormFieldProps} from '../../../types';

export default ({value, name, onChange, field}: FormFieldProps) => {
  let checked = (value === true || value === '1' || value === 'true'),
    {label} = field;

  return (<Checkbox
            checked={checked}
            value={value}
            onChange={e => onChange(name, e.target.checked)}>
              {label} {value}
          </Checkbox>);
}