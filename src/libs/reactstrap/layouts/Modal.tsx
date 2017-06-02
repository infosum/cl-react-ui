/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Alert, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

/**
 * Layout for rendering form in a reactstrap modal
 */
class UiFormLayoutModal extends Component<IFormLayout, {}> {

  private errors(): JSX.Element | null {
    const {errors} = this.props;
    if (errors.message) {
      return (<Alert color="danger">
                    <p>{errors.message}</p>
                </Alert>);
    }
    return null;
  }
  /**
   * Render
   * @return {Node} Dom
   */
  public render(): JSX.Element {
    const {form, fields, actions} = this.props;
    const allFields = Object.keys(fields).map((n) => fields[n]);

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
