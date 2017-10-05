import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { compose, withHandlers, withState } from 'recompose';
import { FieldSelect, IFieldOption } from '../../../interfaces';

type Props = FieldSelect & {
  setValue: (s: string) => void;
  valueState: string;
};

const ReactSelect: React.SFC<Props> = ({ field, value, onBlur, onChange, name, setValue, valueState }) => {
  const { options, size } = field;
  return (<Select
    value={valueState}
    options={options}
    onChange={(v) => {
      const newValue = v === null
        ? ''
        : v.value;
      setValue(newValue);
      onChange(name, newValue);
    }} />
  );

};

export default compose(
  withState('valueState', 'setValue', (props) => props.value),
  withHandlers({
    setValue: ({ setValue }) => (value) => setValue(value),
  }),
)(ReactSelect);
