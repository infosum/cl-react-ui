import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import Icon from '../../../../components/Icon';
import { IListRow, IUser } from '../../../../interfaces';

interface IProps {
  update: (userSelected: IListRow[]) => void;
  selected: IListRow[];
  icon?: string;
  label?: string;
  user?: IUser;
  filter?: (user: IUser, selected: IListRow[]) => IListRow[];
}

/**
 * Toggle properties on a list's rows
 */
export default class Toggle extends Component<IProps, {}> {

  /**
   * Update selected rows
   * @param {Event} e .
   */
  private handleClick(e) {
    e.preventDefault();
    const { update, selected, user, filter } = this.props;
    const userSelected = filter !== undefined
      ? filter(user, selected)
      : selected;

    update(userSelected);
  }

  /**
   * Render
   * @return {Dom} node
   */
  public render() {
    const { icon, label } = this.props;
    return (<Button onClick={(e) => this.handleClick(e)} >
      <Icon icon={icon} label={label} />
    </Button>);
  }
}
