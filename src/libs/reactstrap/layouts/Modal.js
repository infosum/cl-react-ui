// @flow
import React, {Component} from 'react';
import {Alert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {FormLayout} from '../../../types';

/**
 * Layout for rendering form in a reactstrap modal
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
    const {form, fields, actions} = this.props,
      allFields = Object.keys(fields).map(n => fields[n])

    return (<div>
              <ModalHeader>
                {form.title}
              </ModalHeader>
              <ModalBody>
                {this.errors()}
                <form>
                  {allFields}
                </form>
              </ModalBody>
              <ModalFooter>
                {actions}
              </ModalFooter>
            </div>);
  }
}

export default UiFormLayoutModal;
