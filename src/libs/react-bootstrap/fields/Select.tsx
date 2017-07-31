import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { FieldSelect, IFieldOption } from '../../../../index';

export default ({ field, name, onChange, value }: FieldSelect) => {
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

  return (<FormControl
    componentClass="select"
    value={value}
    onChange={(e) => onChange(name, e.target.value)}>
    {opts}
  </FormControl>);
};
