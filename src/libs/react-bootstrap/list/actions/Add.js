// @flow
import React, {Element, Component} from 'react';
import {Button} from 'react-bootstrap';

type PropType = {
  open: (e: Event) => {},
  isVisible: boolean
};

export default class Add extends Component {

  state: {
    open: boolean
  }

  constructor(props: PropType) {
    super(props);
    this.state = {open: false};
  }

  /**
   * Handle click
   * @param {Event} e .
   */
  handleClick(e: Event) {
    const {open} = this.props;
    this.state.open = !this.state.open;
    open(e);
  }

  /**
   * Render
   * @return {Dom} node
   */
  render(): Element<Button> | null {
    const {isVisible} = this.props;
    if (!isVisible) {
      return null;
    }

    return (<Button onClick={e => this.handleClick(e)}>
        <i className="fa fa-plus"></i> Add
      </Button>);
  }
}
