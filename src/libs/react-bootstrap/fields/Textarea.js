//@flow
import React from 'react';
import {FormControl} from 'react-bootstrap';
import {FormFieldOption} from '../../../types';

export default ({value, name, onChange, field}: FormFieldOption) => {
  const {placeholder} = field;
  return <FormControl
            componentClass="textarea"
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)}
        />;
}