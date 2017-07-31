import * as React from 'react';
import { ControlLabel, Feedback, FormGroup, HelpBlock } from 'react-bootstrap';
import { IFormField, IFormGroupProps } from '../../../interfaces';

export default (props: IFormGroupProps & IFormField) => {
  const { FieldComponent, errors, field, onChange, onBlur, name, row, validationState, value } = props;
  const label = field.type === 'hidden' || field.label === ''
    ? null
    : <ControlLabel>{field.label}</ControlLabel>;

  return <FormGroup
    key={field.id}
    controlId={field.id}
    validationState={validationState}
  >
    {label}
    <FieldComponent
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      field={field}
      row={row} />

    <HelpBlock>{field.help}</HelpBlock>
    {
      errors.map((error, i) =>
        <HelpBlock key={'help-' + name + '-' + i}>
          {error}
        </HelpBlock>)
    }
  </FormGroup>;
};
