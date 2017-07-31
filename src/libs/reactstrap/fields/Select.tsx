import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';
import { FieldSelect, IFieldOption } from '../../../../index';

export default ({ field, value, onBlur, onChange, name }: FieldSelect) => {
  const { options } = field;
  let opts;
  if (Array.isArray(options)) {
    opts = options.map((option: IFieldOption, k) =>
      <option key={k} value={option.value}>
        {option.label}
      </option>,
    );
  } else {
    // Tmp whilst we fix stuff
    opts = Object.keys(options).map((key) =>
      <option key={key} value={key}>
        {options[key]}
      </option>,
    );
  }

  return (<Input
    type="select"
    value={value}
    onBlur={() => onBlur(name)}
    onChange={(e) => {
      onChange(name, e.target.value);
    }}>
    {opts}
  </Input>);

};
