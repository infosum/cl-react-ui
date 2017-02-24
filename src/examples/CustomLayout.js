import React from 'react';
import {Alert, Form} from 'reactstrap';

export default ({form, fields, actions, errors, onSubmit}) => {

    let alert = null,
      allFields = Object.keys(fields).map(n => fields[n]);

    if (errors.message) {
      alert = (<Alert color="danger">
                    <p>{errors.message}</p>
                </Alert>);
    }
    return (<Form onSubmit={onSubmit}>
              <h2>Custom:  {form.title}</h2>
              {alert}
              {allFields}
              {actions}
          </Form>);

}
