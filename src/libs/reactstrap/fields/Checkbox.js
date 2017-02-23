import React from 'react';
import {Input, Label} from 'reactstrap';

export default ({value, name, onChange, field}) => {
  let checked = (value === true || value === '1' || value === 'true'),
    {label} = field;

  return (<Label check>
            <Input
              type="checkbox"
              checked={checked}
              value={'1'}
              onClick={e => onChange(name, e.target.checked)} />{' '}
                {label}
          </Label>);
}