
import * as React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Icon from '../../../../components/Icon';
import enhance from '../../../../enhancers/modal';
import { IListRow, IUser } from '../../../../interfaces';

interface IProps {
  del: (selected: IListRow[]) => void;
  selected: IListRow[];
  showModal: boolean;
  toggle: (showModal: boolean) => void;
}

const Del: React.SFC<IProps> = ({ toggle, del, selected, showModal }) => <span>
  <Button onClick={() => toggle(showModal)} >
    <Icon icon="times" label="Delete" />
  </Button>
  <Modal isOpen={showModal}
    toggle={() => toggle(showModal)}
    aria-labelledby="del-modal-title">
    <ModalHeader>
      Delete...
  </ModalHeader>
    <ModalBody>
      <h4>Do you want to delete {selected.length} records</h4>
    </ModalBody>
    <ModalFooter>
      <Button onClick={(e) => toggle(showModal)}>Cancel</Button>
      <Button onClick={(e) => {
        del(selected);
        toggle(showModal);
      }}
        color="primary">
        OK
      </Button>
    </ModalFooter>
  </Modal>
</span>;

export default enhance(Del);

export {
  IProps,
  Del,
};
