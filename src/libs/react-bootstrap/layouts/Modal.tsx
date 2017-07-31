import * as React from 'react';
import { Component } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { IFormLayout } from '../../../interfaces';

/**
 * Layout for rendering form in a Bootstrap modal
 */
class UiFormLayoutModal extends Component<IFormLayout, {}> {

  private errors(): JSX.Element | null {
    let alert = null;
    const { errors } = this.props;
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
  public render(): JSX.Element {
    const { form, fields, actions } = this.props;
    const allFields = Object.keys(fields).map((n) => fields[n]);

    return (<div>
      <Modal.Header>
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
