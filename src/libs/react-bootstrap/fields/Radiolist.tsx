import * as React from 'react';
import { Component } from 'react';
import { Radio } from 'react-bootstrap';
import { FieldRadio, IFieldOption } from '../../../interfaces';

export default ({ value, name, onChange, field }: FieldRadio) => {

  let { options } = field;

  if (!Array.isArray(field.options)) {
    options = Object.keys(options).map((key) => (
      { value: key, label: options[key] }
    ));
  }

  const opts = options.map((option: IFieldOption, k: number) => {
    const active = option.value === value;
    return (<Radio
      key={k}
      active={active}
      value={option.value}
      onClick={(e) => {
        console.log('on click a radio.....');
        onChange(name, e.target.value);
      }}>
      {option.label}
    </Radio>);
  });

  return (<div>
    {opts}
  </div>);
};
