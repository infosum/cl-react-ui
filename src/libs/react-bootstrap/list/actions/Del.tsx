import * as React from 'react';
import { Component } from 'react';
import { Button, closeButton, Modal } from 'react-bootstrap';
import Icon from '../../../../components/Icon';
import enhance from '../../../../enhancers/modal';
import { IListRow } from '../../../../interfaces';
interface IProps {
  del: (selected: IListRow[]) => void;
  selected: IListRow[];
  showModal: boolean;
  toggle: (showModal: boolean) => void;
}

/**
 * List row delete button
 */
const Del: React.SFC<IProps> = ({ toggle, del, selected, showModal }) => (
  <span>
    <Button onClick={() => open()} >
      <Icon icon="times" label="Delete" />
    </Button>
    <Modal show={showModal} onHide={() => toggle(showModal)}
      aria-labelledby="del-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="del-modal-title">Delete...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Do you want to delete {selected.length} records</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => toggle(showModal)}>Cancel</Button>
        <Button onClick={(e) => {
          del(selected);
          toggle(showModal);
        }} bsStyle="primary">
          OK
          </Button>
      </Modal.Footer>
    </Modal>
  </span>);

export default enhance(Del);

export {
  IProps,
  Del,
};
