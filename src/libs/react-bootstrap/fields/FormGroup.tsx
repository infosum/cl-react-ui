/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {ControlLabel, Feedback, FormGroup, HelpBlock} from 'react-bootstrap';

export default (props: IFormGroupProps & IFormField) => {
  const {FieldComponent, errors, field, onChange, onBlur, name, validationState, value} = props;
  const label = field.type === 'hidden' || field.label === ''
    ? null
    : <ControlLabel>{field.label}</ControlLabel>;

  return <FormGroup
          key= {field.id}
          controlId={field.id}
          validationState={validationState}
          >
            {label}
            <FieldComponent
              value={value}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              field={field} />

            <HelpBlock>{field.help}</HelpBlock>
            {
              errors.map((error, i) =>
              <HelpBlock key={'help-' + name + '-' + i}>
                {error}
              </HelpBlock>)
            }
        </FormGroup>;
};
