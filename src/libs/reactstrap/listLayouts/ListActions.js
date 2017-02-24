// @flow
import React, {Component} from 'react';
import {ButtonGroup} from 'reactstrap';
import {CrudConfig, ListActions as ListActionsType,
  ListRow, User} from '../../../types';

type Props = {
  actions: ListActionsType[],
  user: User,
  selected: ListRow[],
  config: CrudConfig,
  rowClick: Function
};

export default (props: Props) => {

    const {user, selected, actions, config, rowClick} = props
    let listActionGroups = [];

    // For each button group
    config.list.actions.forEach((btns: ListActionsType, index: number) => {
      let listActionNames = Object.keys(btns),
        btnGroupKey = 'button-group-' + index,
        listActions = listActionNames.map((listAction: string, key: number) => {
          let a = btns[listAction],
            isVisible = a.visible(user, selected);
          return <a.render key={a.id} {...props} {...actions} id={a.id}
             open={e => rowClick(e, false)} isVisible={isVisible} {...a} />;
        });
      listActionGroups.push(<ButtonGroup key={btnGroupKey}>
          {listActions}
        </ButtonGroup>);
      listActionGroups.push(<span key={'spacer' + index}> </span>);
    });
    return (<div>{listActionGroups}</div>);
}
