import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../../../../components/Icon';
import { IListRow, IUser } from '../../../../interfaces';

interface IProps {
  update: (userSelected: IListRow[]) => void;
  selected: IListRow[];
  icon?: string;
  label?: string;
  user?: IUser;
  filter: (user: IUser, selected: IListRow[]) => IListRow[];
}

/**
 * Toggle properties on a list's rows
 */
export default class Toggle extends Component<IProps, {}> {

  /**
   * Update selected rows
   * @param {Event} e .
   */
  private handleClick(e: Event) {
    e.preventDefault();
    const { update, selected, user, filter } = this.props;
    const selectedByUser = filter(user, selected);

    update(selectedByUser);
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
