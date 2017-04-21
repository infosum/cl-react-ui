// @flow
import React, {Component} from 'react';
import {Radio} from 'react-bootstrap';
import {FormFieldProps, FormFieldOption} from '../../../types';


export default ({value, name, onChange, field}: FormFieldProps) => {

    let {options} = field;

    if (!Array.isArray(field.options)) {
      options = Object.keys(options).map(key => (
        {value: key, label: options[key]}
      ))
    }

    const opts = options.map((option: FormFieldOption, k: number) => {
        let active = option.value === value;
        return (<Radio
                  key={k}
                  active={active}
                  value={option.value}
                  onClick={e => onChange(name, e.target.value)}>
                    {option.label}
                </Radio>);
      });

    return (<div>
              {opts}
            </div>);
}
