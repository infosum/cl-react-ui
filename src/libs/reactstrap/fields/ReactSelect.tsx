import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FieldSelect, IFieldOption } from '../../../interfaces';

type Props = FieldSelect;

const ReactSelect: React.SFC<Props> = ({ field, value, onBlur, onChange, name }) => {
  const { options, size } = field;
  return (<Select
    value={value}
    options={options}
    onChange={(v) => {
      const newValue = v === null
        ? ''
        : v.value;
      onChange(name, newValue);
    }} />
  );

};

export default ReactSelect;
