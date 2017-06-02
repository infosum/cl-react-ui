/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Button} from 'react-bootstrap';

interface IProps {
  update: () => {};
  selected: IListRow[];
  config: any;
  user: any;
  isVisible: boolean;
  filter: () => void;
}

/**
 * Toggle properties on a list's rows
 */
export default class Toggle extends Component<IProps, {}> {

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: PropType) {
    super(props);
    this.state = {};
  }

  /**
   * Update selected rows
   * @param {Event} e .
   */
  private handleClick(e: MouseEvent) {
    e.preventDefault();
    const {update, selected, config, user, filter} = this.props;
    const userSelected = filter(user, selected);

    this.setState(config.update);
    update(userSelected, config.update);
  }

  /**
   * Render
   * @return {Dom} node
   */
  public render(): JSX.Element | null {
    const {isVisible, config} = this.props;
    if (!isVisible) {
      return null;
    }
    return (<Button onClick={(e) => this.handleClick(e)} >
        <i className={config.icon}></i> {config.label}
      </Button>);
  }
}
