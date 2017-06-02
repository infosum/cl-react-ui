/// <reference path="../../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Button} from 'react-bootstrap';

interface IProps {
  update: () => {};
  selected: IListRow[];
  config: Object;
  user: User;
  isVisible: boolean;
  filter: () => {};
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
  private handleClick(e: Event) {
    e.preventDefault();
    const {update, selected, config, user, filter} = this.props;
    selectedByUser = filter(user, selected);

    this.setState(config.update);
    update(selectedByUser, config.update);
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
