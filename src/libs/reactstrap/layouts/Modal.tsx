import * as React from 'react';
import { Component } from 'react';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IFormLayout } from '../../../interfaces';

/**
 * Layout for rendering form in a reactstrap modal
 */
export default ({ errors, form, fields, actions }: IFormLayout) => {
  let alert;
  const allFields = Object.keys(fields).map((n) => fields[n]);
  if (errors.message) {
    alert = (<Alert color="danger">
      <p>{errors.message}</p>
    </Alert>);
  }

  return (<div>
    <ModalHeader>
      {form.title}
    </ModalHeader>
    <ModalBody>
      {alert}
      <form>
        {allFields}
      </form>
    </ModalBody>
    <ModalFooter>
      {actions}
    </ModalFooter>
  </div>);
};
