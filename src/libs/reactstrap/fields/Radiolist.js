// @flow
import React from 'react';
import {Input, Label} from 'reactstrap';
import {FormFieldProps, FormFieldOption} from '../../../types';

export default ({field, value, onChange, onBlur, name}: FormFieldProps) => {

    const opts = field.options.map((option: FormFieldOption, k: number) => {
        let active = option.value === value;
        return (
          <Label check>
            <Input
              type="radio"
              key={k}
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
