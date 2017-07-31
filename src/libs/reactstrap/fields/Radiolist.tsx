import * as React from 'react';
import { Component } from 'react';
import { Input, Label } from 'reactstrap';
import { FieldRadio, IFieldOption } from '../../../interfaces';

export default ({ field, value, onChange, onBlur, name }: FieldRadio) => {
  let { options } = field;

  if (!Array.isArray(field.options)) {
    options = Object.keys(options).map((key) => (
      { value: key, label: options[key] }
    ));
  }
  const opts = options.map((option: IFieldOption, k: number) => {
    const active = option.value === value;
    return (
      <Label check
        key={k}>
        <Input
          type="radio"
          key={k}
          name={name}
          defaultChecked={active}
          value={option.value}
          onBlur={() => onBlur(name)}
          onClick={(e) => {
            const target = e.target as HTMLInputElement;
            onChange(name, target.value);
          }} />
        {' '}{option.label}
      </Label>);
  });

  return (<div>
    {opts}
  </div>);

};
