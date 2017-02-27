// @flow
import React, {Component} from 'react';
import {Input} from 'reactstrap';
import {DOMEvent, FormFieldProps,
  FormFieldOption} from '../../../types';

export default ({field, value, onBlur, onChange, name}: FormFieldProps) => {
  const {options} = field;
  let opts;
  if (Array.isArray(options)) {
    opts = options.map((option: FormFieldOption, k: number) =>
        <option key={'select-option-' + k} value={option.value}>
          {option.label}
        </option>
      )
  } else {
    // Tmp whilst we fix stuff
    opts = Object.keys(options).map((key) =>
      <option key={'select-option-' + key} value={key}>
          {options[key]}
        </option>
    )
  }

    return (<Input
      type="select"
      value={value}
      onBlur={() => onBlur(name)}
      onChange={e => {
        onChange(name, e.target.value)}
      }>
      {opts}
     </Input>);

}

