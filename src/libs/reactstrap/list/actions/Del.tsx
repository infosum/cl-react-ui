
import * as React from 'react';
import { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IListRow, IUser } from '../../../../interfaces';

interface IProps {
  del: (type: string, selected: IListRow[], user: any, token?: string) => any;
  user: any;
  isVisible: boolean;
  selected: IListRow[];
}

interface IState {
  showModal: boolean;
}

const c = {} as IUser;
/**
 * List row delete button
 */
export default class Del extends Component<IProps, IState> {

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: IProps) {
    super(props);
    this.state = { showModal: false };
  }

  /**
   * Close the modal
   */
  private close() {
    this.setState({ showModal: false });
  }

  /**
   * Open the modal
   * @param {Event} e .
   */
  private open(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  /**
   * Handle the modal form's submission
   * @param {Event} e .
   */
  private handleSubmit(e) {
    e.preventDefault();
    const { del, user, selected } = this.props;
    del('user', selected, user);
    this.close();
  }

  /**
   * Render delete button
   * @return {Dom} node
   */
  public render(): JSX.Element | null {
    const { selected, isVisible } = this.props;

    if (!isVisible) {
      return null;
    }
    return (
      <span>
        <Button onClick={(e) => this.open(e)} >
          <i className="fa fa-times"></i> Delete
        </Button>
        <Modal isOpen={this.state.showModal}
          toggle={() => this.close()}
          aria-labelledby="del-modal-title">
          <ModalHeader>
            Delete...
          </ModalHeader>
          <ModalBody>
            <h4>Do you want to delete {selected.length} records</h4>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(e) => this.close()}>Cancel</Button>
            <Button onClick={(e) => this.handleSubmit(e)} color="primary">
              OK
              </Button>
          </ModalFooter>
        </Modal>
      </span>);
  }
}
