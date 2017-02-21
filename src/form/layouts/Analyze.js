
// @flow
import React, {Component} from 'react';
import {Alert, Row, Col} from 'react-bootstrap';
import {FormLayout} from '../../../../types';

class UiFormLayoutAnalyze extends Component {

  props: FormLayout

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
    const {form, fields} = this.props;

    return (<div>
     <h2>{form.title}</h2>
     {this.errors()}
    <Row className="show-grid">
      <Col md={4} lg={2} sm={3}>
        {fields.dataSources}
      </Col>
      <Col md={8} lg={10} sm={9}>
       <form>
          {fields.selectedDataSources}
          {fields.dataSourceComparison}
      </form>
      </Col>
    </Row>
    </div>);
  }
}

export default UiFormLayoutAnalyze;
