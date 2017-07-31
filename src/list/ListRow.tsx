import * as React from 'react';
import { Component } from 'react';
import { IListRow, IListRowProps } from '../../index';
import Tip from '../components/Tip';
import ListCell from './ListCell';

interface IState {
  editing: boolean;
}

/**
 * Render a row in a list
 */
export default class ListRow extends Component<IListRowProps, IState> {

  constructor(props: IListRowProps) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  /**
   * Toggle a row
   * @param {Event} e event
   */
  private toggleRow(e: MouseEvent) {
    const { actions, row, selectRow, deselectRow } = this.props;
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      selectRow(row);
    } else {
      deselectRow(row);
    }
  }

  private canSelect() {
    return this.props.canSelect(this.props.row);
  }

  /**
   * Render row cells
   * @return {Array} Dom nodes
   */
  private cells(): JSX.Element[] {
    const { row, columns, Checkbox, actions, selected, onClick } = this.props;
    const columnNames = Object.keys(columns);
    const cells = columnNames.map((columnName: string, key: number) => {
      const th = columns[columnName];
      let cell;

      if (th.render) {
        cell = <th.render column={columnName} row={row}
          rowClick={this.props.rowClick}
          config={th.config} {...actions} />;
      } else {
        cell = <ListCell key={'listcell-' + key}
          rowClick={this.props.rowClick}
          data={row[columnName]} {...actions} />;
      }
      if (th.tip) {
        cell = <Tip config={th.tip} row={row}>{cell}</Tip>;
      }
      return (<td onClick={onClick} key={th.id} className={th.class}>
        {cell}
      </td>);
    });

    if (this.canSelect()) {
      cells.unshift(<td key="list-td-check">
        <Checkbox checked={selected} onClick={(e) => this.toggleRow(e)} />
      </td>);
    }
    return cells;
  }

  /**
   * Render
   * @return {Dom} Nodes
   */
  public render(): JSX.Element {
    return (<tr>
      {this.cells()}
    </tr>);
  }
}
