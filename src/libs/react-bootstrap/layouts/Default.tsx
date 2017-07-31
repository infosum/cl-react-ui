import * as React from 'react';
import { Component } from 'react';
import { Alert, Well } from 'react-bootstrap';
import { IFormLayout } from '../../../interfaces';

class UiFormLayoutDefault extends Component<IFormLayout, {}> {

  /**
   * Render
   * @return {Node} Dom
   */
  public render(): JSX.Element {
    let alert = null;
    const { form, fields, actions, errors, onSubmit } = this.props;
    const allFields = Object.keys(fields).map((n) => fields[n]);

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
