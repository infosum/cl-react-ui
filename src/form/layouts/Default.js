// @flow

import React, {Component} from 'react';
import {Alert, Well} from 'react-bootstrap';
import {FormLayout} from '../../types';

class UiFormLayoutDefault extends Component {

  props: FormLayout

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    let alert = null,
      n;
    const {form, fields, actions, errors, onSubmit} = this.props,
      allFields = [];
    for (n in fields) {
      if (fields.hasOwnProperty(n)) {
        allFields.push(fields[n]);
      }
    }
    if (errors.message) {
      alert = (<Alert bsStyle="danger">
                    <p>{errors.message}</p>
                </Alert>);
    }
    return (<div className="row">
              <div className="col-xs-6">
                <h2 className="topBar">{form.title}</h2>
                {alert}
                <Well>
                  <form onSubmit={onSubmit}>
                      {allFields}
                      {actions}
                  </form>
                </Well>
            </div>
        </div>);
  }
}

export default UiFormLayoutDefault;
