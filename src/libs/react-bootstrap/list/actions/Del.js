// @flow
import React, {Component} from 'react';
import {Button, Modal, closeButton} from 'react-bootstrap';

type PropType = {
  del: (type: string, selected: Array<any>,
    user: Object, token: string) => Function,
  user: Object,
  isVisible: boolean,
  selected: Array<any>
};

/**
 * List row delete button
 */
export default class Del extends Component {

  state: {
    showModal: boolean
  }

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: PropType) {
    super(props);
    this.state = {showModal: false};
  }

  /**
   * Close the modal
   * @param {Event} e .
   */
  close(e: Event) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  /**
   * Open the modal
   * @param {Event} e .
   */
  open(e: Event) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  /**
   * Handle the modal form's submission
   * @param {Event} e .
   */
  handleSubmit(e: Event) {
    e.preventDefault();
    let {del, user, selected} = this.props;
    del('user', selected, user);
    this.close(e);
  }

  /**
   * Render delete button
   * @return {Dom} node
   */
  render(): React$Element<any> | null {
    const {selected, isVisible} = this.props;

    if (!isVisible) {
      return null;
    }
    return (
      <span>
        <Button onClick={e => this.open(e)} >
          <i className="fa fa-times"></i> Delete
        </Button>
        <Modal show={this.state.showModal} onHide={e => this.close(e)}
          container={this}
          aria-labelledby="del-modal-title">
          <Modal.Header closeButton>
              <Modal.Title id="del-modal-title">Delete...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4>Do you want to delete {selected.length} records</h4>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={e => this.close(e)}>Cancel</Button>
              <Button onClick={e => this.handleSubmit(e)} bsStyle="primary">
                OK
              </Button>
          </Modal.Footer>
        </Modal>
      </span>);
  }
}
