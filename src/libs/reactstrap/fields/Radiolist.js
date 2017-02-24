// @flow
import React from 'react';
import {Input, Label} from 'reactstrap';
import {FormFieldProps, FormFieldOption} from '../../../types';

export default ({field, value, onChange, onBlur, name}: FormFieldProps) => {
    let {options} = field;

    if (!Array.isArray(field.options)) {
      options = Object.keys(options).map(key => (
        {value: key, label: options[key]}
      ))
    }
    const opts = options.map((option: FormFieldOption, k: number) => {
        let active = option.value === value;
        return (
          <Label check>
            <Input
              type="radio"
              key={k}
              name={name}
              active={active}
              value={option.value}
              onBlur={() => onBlur(name)}
              onClick={e => onChange(name, e.target.value)} />
                {' '}{option.label}
          </Label>);
      });

    return (<div>
            {opts}
            </div>);

}
