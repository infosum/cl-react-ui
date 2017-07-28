/// <reference path="../../../../index.d.ts" />
import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';

interface IProps {
  open: (e: MouseEvent) => void;
  isVisible: boolean;
}

interface IState {
  isOpen: boolean;
}

export default class Add extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isOpen: false };
  }

  /**
   * Handle click
   * @param {Event} e .
   */
  private handleClick(e) {
    const { open } = this.props;
    this.setState({ isOpen: !this.state.isOpen });
    open(e);
  }

  /**
   * Render
   * @return {Dom} node
   */
  public render(): JSX.Element | null {
    const { isVisible } = this.props;
    if (!isVisible) {
      return null;
    }

    return (<Button onClick={(e) => this.handleClick(e)}>
      <i className="fa fa-plus"></i> Add
      </Button>);
  }
}
