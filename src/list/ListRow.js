// @flow
import React, {Component} from 'react';
import ListCell from './ListCell';
import Tip from '../decorators/Tip';
import {Checkbox} from 'react-bootstrap';
import {ListActions, ListColumns,
  ListRow as ListRowType} from '../../../types';

type Props = {
  actions: ListActions,
  columns: ListColumns,
  onClick: Function,
  row: ListRowType,
  selected: boolean,
  view: string
};

type State = {
  editing: boolean,
  toggled: boolean
};

/**
 * Render a row in a list
 */
export default class ListRow extends Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props);
    this.state = {
      editing: false,
      toggled: props.selected
    };
  }

  /**
   * Toggle a row
   * @param {Event} e event
   */
  toggleRow(e: Event) {
    const {actions, row, view} = this.props;
    this.setState({toggled: !this.state.toggled});
    if (e.target.checked) {
      actions.selectRow(view, row);
    } else {
      actions.deselectRow(view, row);
    }
  }

  cells(): React$Element<any>[] {
    const {row, columns, actions, selected, onClick} = this.props;
    let columnNames = Object.keys(columns),
      cells = columnNames.map((columnName: string, key: number) => {
        let th = columns[columnName],
          cell;

        if (th.render) {
          cell = <th.render column={columnName} row={row}
            config={th.config} {...actions} />;
        } else {
          cell = <ListCell key={'listcell-' + key}
            data={row[columnName]} {...actions} />;
        }
        if (th.tip) {
          cell = <Tip config={th.tip} row={row}>{cell}</Tip>;
        }
        return (<td key={'list-td-' + key} onClick={onClick}
          key={th.id} className={th.class}>
            {cell}
          </td>);
      });

    cells.unshift(<td key="list-td-check">
      <Checkbox checked={selected} onClick={e => this.toggleRow(e)} />
    </td>);

    return cells;
  }

  /**
   * Render
   * @return {Dom} Nodes
   */
  render(): React$Element<any> {
    return (<tr>
        {this.cells()}
      </tr>);
  }
}
