// @flow
import React, {Component} from 'react';
import {Alert, Modal, closeButton} from 'react-bootstrap';
import {FormLayout} from '../../../../types';

/**
 * Layout for rendering form in a Bootstrap modal
 */
class UiFormLayoutModal extends Component {

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
    let n;
    const {form, fields, actions} = this.props,
      allFields = [];
    for (n in fields) {
      if (fields.hasOwnProperty(n)) {
        allFields.push(fields[n]);
      }
    }

    return (<div>
              <Modal.Header closeButton>
                  <Modal.Title id="add-modal-title">{form.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {this.errors()}
              <form>
                  {allFields}
              </form>
              </Modal.Body>
              <Modal.Footer>
                  {actions}
              </Modal.Footer>
            </div>);
  }
}

export default UiFormLayoutModal;
