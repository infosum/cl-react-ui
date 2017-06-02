/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Button} from 'react-bootstrap';

interface IPropType {
  open: (e: Event) => void;
  isVisible: boolean;
}

interface IState {
  open: boolean;
}

export default class Add extends Component<IProps, IState> {

  constructor(props: PropType) {
    super(props);
    this.state = {open: false};
  }

  /**
   * Handle click
   * @param {Event} e .
   */
  private handleClick(e: Event) {
    const {open} = this.props;
    this.state.open = !this.state.open;
    open(e);
  }

  /**
   * Render
   * @return {Dom} node
   */
  public render(): JSX.Element | null {
    const {isVisible} = this.props;
    if (!isVisible) {
      return null;
    }

    return (<Button onClick={(e) => this.handleClick(e)}>
        <i className="fa fa-plus"></i> Add
      </Button>);
  }
}
