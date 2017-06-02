/// <reference path="../../../interfaces.d.ts" />
import React, {Component} from 'react';
import {Radio} from 'react-bootstrap';

export default ({value, name, onChange, field}: IFormField) => {

    let {options} = field;

    if (!Array.isArray(field.options)) {
      options = Object.keys(options).map((key) => (
        {value: key, label: options[key]}
      ));
    }

    const opts = options.map((option: FormFieldOption, k: number) => {
        const active = option.value === value;
        return (<Radio
                  key={k}
                  active={active}
                  value={option.value}
                  onClick={(e) => onChange(name, e.target.value)}>
                    {option.label}
                </Radio>);
      });

    return (<div>
              {opts}
            </div>);
};
