/// <reference path="../../../index.d.ts" />
import * as React from 'react';
import { Component } from 'react';
import { ButtonGroup } from 'reactstrap';
import * as listActions from '../list/actions';

interface IButtonProps {
  id: string;
}
export default (props: IListActionsProps): JSX.Element => {

  const { user, selected, actions, config, rowClick } = props;
  const listActionGroups: JSX.Element[] = [];

  // For each button group
  config.list.actions.forEach((btns, index) => {
    const listActionNames = Object.keys(btns);
    const listActions = listActionNames.map((listAction, key) => {
      const a = btns[listAction];
      const isVisible = a.visible(user, selected);
      if (!isVisible) {
        return null;
      }
      const b: JSX.Element = <a.render
        key={key}
        {...props}
        {...actions}
        {...a}
        open={(e) => rowClick(e, false)}
      />;
      return b;
    });
    listActionGroups.push(<ButtonGroup key={index}>
      {listActions}
    </ButtonGroup>);
    listActionGroups.push(<span key={'spacer' + index}> </span>);
  });
  return (<div>{listActionGroups}</div>);
};
