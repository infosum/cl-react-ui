/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {FormControl} from 'react-bootstrap';

export default ({field, name, onChange, value}: IFormField) => {
  const {options} = field;
  let opts;
  if (Array.isArray(options)) {
    opts = options.map((option: FormFieldOption, k: number) =>
        <option key={'select-option-' + k} value={option.value}>
          {option.label}
        </option>,
      );
  } else {
    // Tmp whilst we fix stuff
    opts = Object.keys(options).map((key) =>
      <option key={'select-option-' + key} value={key}>
          {options[key]}
        </option>,
    );
  }

  return (<FormControl
              componentClass="select"
              value={value}
              onChange={(e) => onChange(name, e.target.value)}>
              {opts}
            </FormControl>);
};
