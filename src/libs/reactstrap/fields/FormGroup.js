import React from 'react';
import {FormFeedback, FormGroup, FormText, Label} from 'reactstrap';

export default (props) => {
  const {FieldComponent, errors, field, validationState} = props,
    noLabels = ['checkbox', 'hidden'];
  let {type, id, help, label} = field,
    check = type === 'checkbox',
    controlLabel = noLabels.indexOf(type) !== -1 || label === '' ?
    null : <Label>
      {label}
    </Label>,
    color = validationState;
    console.log('type =- ', type, controlLabel, check);

    if (color === 'error') {
      color = 'danger';
    }
  return <FormGroup
          check={check}
          color={color}
          key= {id}>
            {controlLabel}
            <FieldComponent
              state={color}
              {...props} />
            <FormText>{help}</FormText>
            {
              errors.map((error, i) =>
              <FormFeedback key={'help-' + name + '-' + i}>
                {error}
              </FormFeedback>)
            }
        </FormGroup>
}
