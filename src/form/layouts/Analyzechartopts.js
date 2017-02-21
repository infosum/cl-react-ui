
// @flow
import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import {FormLayout} from '../../../../types';

class UiFormLayoutAnalyze extends Component {

  props: FormLayout

  /**
   * Build error alert
   * @return {Node|null} Dom
   */
  errors(): React$Element<any> | null {
    let alert = null,
      {errors} = this.props;
    if (errors.message) {
      alert = (<Alert bsStyle="danger">
                    <p>{errors.message}</p>
                </Alert>);
    }
    return alert;
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    let ignore = ['dataSources', 'selectedDataSources', 'dataSourceComparison'],
      allFields = [],
      key;
    const {form, fields, actions} = this.props;
    for (key in fields) {
      if (fields.hasOwnProperty(key)) {
        if (ignore.indexOf(key) === -1) {
          allFields.push(fields[key]);
        }
      }
    }

    return (
      <div><div className="pull-right">{actions}</div>
      <h2>{form.title}</h2>
      {this.errors()}
      <form style={{paddingTop: '25px'}}>
          {allFields}
      </form>
    </div>);
  }
}

export default UiFormLayoutAnalyze;
