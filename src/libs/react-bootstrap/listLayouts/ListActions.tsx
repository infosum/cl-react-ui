import * as React from 'react';
import { Component } from 'react';
import { ButtonGroup } from 'reactstrap';
import { IListActionsProps } from '../../../interfaces';

export default (props: IListActionsProps): JSX.Element => {

  const listActionGroups: JSX.Element[] = [];
  const { user, selected, actions, config, rowClick } = props;
  if (!config.list.actions) {
    return;
  }
  // For each button group
  config.list.actions.forEach((btns, index) => {
    const listActionNames = Object.keys(btns);
    const listActions = listActionNames.map((listAction, key): React.ReactElement<any> | null => {
      const a = btns[listAction];
      const isVisible = a.visible(user, selected);
      return isVisible
        ? <a.render
          {...a}
          key={key}
          {...props}
          {...actions}
          id={a.id}
          open={(e) => rowClick(e, false)}
        />
        : null;
    });
    listActionGroups.push(<ButtonGroup key={index}>
      {listActions}
    </ButtonGroup>);
    listActionGroups.push(<span key={'spacer' + index}> </span>);
  });
  return (<div>{listActionGroups}</div>);
};
