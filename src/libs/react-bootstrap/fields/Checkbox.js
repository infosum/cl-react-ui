import React from 'react';
import {Checkbox} from 'react-bootstrap';

export default ({value, name, handleChange, field}) => {
  let checked = (value === true || value === '1' || value === 'true'),
    {label} = field;

  return (<Checkbox
            checked={checked}
            value={value}
            onChange={e => handleChange(name, e.target.checked)}>
              {label} {value}
            </Checkbox>);
}