import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';
import { IFieldOption, IFilterProps } from '../../../../../index';

export default ({ field, value, onBlur, name }: IFilterProps) => {
  const { options } = field;
  const opts = options.map((option: IFieldOption, k) =>
    <option key={k} value={option.value}>
      {option.label}
    </option>,
  );

  return (<Input
    type="select"
    value={value}
    onBlur={() => onBlur(name, value)}>
    {opts}
  </Input>);

};
