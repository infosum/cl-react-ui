/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Button, Modal, closeButton} from 'react-bootstrap';

interface IProps {
  del: (type: string, selected: any[],  user: Object, token: string) => Function;
  user: Object;
  isVisible: boolean;
  selected: any[];
}

interface IState {
  showModal: boolean;
}
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
    this.state = {showModal: false};
  }

  /**
   * Close the modal
   * @param {Event} e .
   */
  private close(e: Event) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  /**
   * Open the modal
   * @param {Event} e .
   */
  private open(e: Event) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  /**
   * Handle the modal form's submission
   * @param {Event} e .
   */
  private handleSubmit(e: Event) {
    e.preventDefault();
    const {del, user, selected} = this.props;
    del('user', selected, user);
    this.close(e);
  }

  /**
   * Render delete button
   * @return {Dom} node
   */
  public render(): JSX.Element | null {
    const {selected, isVisible} = this.props;

    if (!isVisible) {
      return null;
    }
    return (
      <span>
        <Button onClick={(e) => this.open(e)} >
          <i className="fa fa-times"></i> Delete
        </Button>
        <Modal show={this.state.showModal} onHide={(e) => this.close(e)}
          container={this}
          aria-labelledby="del-modal-title">
          <Modal.Header closeButton>
              <Modal.Title id="del-modal-title">Delete...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4>Do you want to delete {selected.length} records</h4>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={(e) => this.close(e)}>Cancel</Button>
              <Button onClick={(e) => this.handleSubmit(e)} bsStyle="primary">
                OK
              </Button>
          </Modal.Footer>
        </Modal>
      </span>);
  }
}
