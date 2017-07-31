import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import { IListRow, IUser } from '../../../../../index';

interface IProps {
  update: (userSelected: IListRow[], update: { [key: string]: any }) => void;
  selected: IListRow[];
  config: {
    icon?: string;
    label?: string;
    update: { [key: string]: any };
  };
  user: IUser;
  filter: (user: IUser, selected: IListRow[]) => IListRow[];
}

/**
 * Toggle properties on a list's rows
 */
export default class Toggle extends Component<IProps, {}> {

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  /**
   * Update selected rows
   * @param {Event} e .
   */
  private handleClick(e) {
    e.preventDefault();
    const { update, selected, config, user, filter } = this.props;
    const userSelected = filter !== undefined
      ? filter(user, selected)
      : selected;

    this.setState(config.update);
    update(userSelected, config.update);
  }

  /**
   * Render
   * @return {Dom} node
   */
  public render(): JSX.Element | null {
    const { config } = this.props;
    return (<Button onClick={(e) => this.handleClick(e)} >
      <i className={config.icon}></i> {config.label}
    </Button>);
  }
}
