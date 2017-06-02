/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Input, Label} from 'reactstrap';

export default ({value, name, onChange, field}: IFormField) => {
  const checked = (value === true || value === '1' || value === 'true');
  const {label} = field;

  return (<Label check>
            <Input
              type="checkbox"
              checked={checked}
              value={'1'}
              onClick={(e) => onChange(name, e.target.checked)} />{' '}
                {label}
          </Label>);
};
