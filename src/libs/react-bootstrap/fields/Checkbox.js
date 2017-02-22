import React from 'react';
import {Checkbox} from 'react-bootstrap';

export default ({value, name, handleChange, label}) => {
  let control,
    checked = (value === true || value === '1' || value === 'true');
  return (<Checkbox
            checked={checked}
            value={value}
            onChange={e => handleChange(e, name)}>
              {label} {value}
            </Checkbox>);
}