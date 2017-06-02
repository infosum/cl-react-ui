/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Input, Label} from 'reactstrap';

export default ({field, value, onChange, onBlur, name}: IFormField) => {
    let {options} = field;

    if (!Array.isArray(field.options)) {
      options = Object.keys(options).map((key) => (
        {value: key, label: options[key]}
      ));
    }
    const opts = options.map((option: FormFieldOption, k: number) => {
        const active = option.value === value;
        return (
          <Label check
            key={`radiolist-${field.name}-${k}`}>
            <Input
              type="radio"
              key={k}
              name={name}
              defaultChecked={active}
              value={option.value}
              onBlur={() => onBlur(name)}
              onClick={(e) => onChange(name, e.target.value)} />
                {' '}{option.label}
          </Label>);
      });

    return (<div>
            {opts}
            </div>);

};
