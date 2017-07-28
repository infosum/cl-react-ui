/// <reference path="../../../../index.d.ts" />
import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';

interface IFilterProps {
  field: any;
  name: string;
  onBlur: (name: string, value: any) => void;
  value: any;
}

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
