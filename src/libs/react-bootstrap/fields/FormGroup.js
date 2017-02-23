import React from 'react';
import {Feedback, FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';

export default (props) => {
  const {FieldComponent, errors, field, validationState} = props;
  let label = field.type === 'hidden' || field.label === '' ?
    null : <ControlLabel>{field.label}</ControlLabel>;

  return <FormGroup
          key= {field.id}
          controlId={field.id}
          validationState={validationState}
          >
            {label}
            <FieldComponent
              {...props} />
            <HelpBlock>{field.help}</HelpBlock>
            {
              errors.map((error, i) =>
              <HelpBlock key={'help-' + name + '-' + i}>
                {error}
              </HelpBlock>)
            }
        </FormGroup>
}
