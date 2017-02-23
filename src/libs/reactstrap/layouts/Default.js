// @flow
import React, {Component} from 'react';
import {Alert, Well} from 'react-bootstrap';
import {Form} from 'reactstrap';
import {FormLayout} from '../../../types';

class UiFormLayoutDefault extends Component {

  props: FormLayout

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    let alert = null;
    const {form, fields, actions, errors, onSubmit} = this.props,
      allFields = Object.keys(fields).map(n => fields[n]);

    if (errors.message) {
      alert = (<Alert color="danger">
                    <p>{errors.message}</p>
                </Alert>);
    }
    return (<Form onSubmit={onSubmit}>
              <h2>{form.title}</h2>
              {alert}
              {allFields}
              {actions}
          </Form>);
  }
}

export default UiFormLayoutDefault;
