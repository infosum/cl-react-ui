/// <reference path="../../../index.d.ts" />
import * as React from 'react';
import { FormFeedback, FormGroup, FormText, Label } from 'reactstrap';

export default (props: IFormGroupProps & IFormField) => {
  const { FieldComponent, errors, field, onChange, onBlur, name, row, validationState, value } = props;
  const noLabels = ['checkbox', 'hidden'];

  const { type, id, help, label } = field;
  const check = type === 'checkbox';
  const controlLabel = noLabels.indexOf(type) !== -1 || label === '' ?
    null : <Label>
      {label}
    </Label>;
  let color = validationState;

  if (color === 'error') {
    color = 'danger';
  }
  if (field.pristine) {
    color = '';
  }

  return <FormGroup
    check={check}
    color={color}
    key={id}>
    {controlLabel}
    <FieldComponent
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      row={row}
      state={color}
      field={field} />

    <FormText>{help}</FormText>
    {
      errors.map((error, i) =>
        <FormFeedback key={'help-' + name + '-' + i}>
          {error}
        </FormFeedback>)
    }
  </FormGroup>;
};
