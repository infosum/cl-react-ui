/// <reference path="../../../index.d.ts" />
import * as deepEqual from 'deep-equal';
import * as React from 'react';
import { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Icon } from '../../../index';

interface IState {
  rows: any[];
}

/**
 * Grid field
 */
class Grid extends Component<FieldGrid, IState> {

  public static defaultProps: Partial<FieldGrid> = {
    field: {
      columns: [
        { label: 'Min', type: 'text' },
        { label: 'Max', type: 'text' },
      ],
      default: '',
      id: '',
      label: '',
      pristine: true,
      type: 'text',
      value: '',
    },
  };

  /**
   * Constructor
   * @param {Object} props .
   */
  constructor(props: FieldGrid) {
    super(props);
    this.state = {
      rows: this.makeRowsFromValue(props.value),
    };
  }

  /**
   * Make row state from value
   * @param {string|Array} value new value
   * @return {Array} rows
   */
  private makeRowsFromValue(value: string | any[]) {
    let rows;
    if (!value || value === '') {
      rows = [];
    } else {
      rows = Array.isArray(value) ? value : JSON.parse(value);
    }
    return rows;
  }

  /**
   * Will receive new props
   * @param {Object} newProps Props
   */
  public componentWillReceiveProps(newProps: FieldGrid) {
    if (!deepEqual(this.props.value, newProps.value)) {
      this.setState({
        rows: this.makeRowsFromValue(newProps.value),
      });
    }
  }

  /**
   * Add a row
   */
  private add() {
    const { field, name, onChange } = this.props;
    const rows = [...this.state.rows];
    const nextRange = Array(field.columns.length).fill('');
    rows.push(nextRange);
    this.setState({ rows });
    onChange(name, rows);
  }

  /**
   * Remove a row
   * @param {Number} index Array index to remove
   */
  private remove(index: number) {
    const { name, onChange } = this.props;
    const rows = [...this.state.rows]
      .filter((v, i) => i !== index);
    this.setState({ rows });
    onChange(name, rows);
  }

  /**
   * Bin field change
   * @param {Number} rowIndex  Row index to update
   * @param {Number} colIndex Column index
   * @param {String} value Value
   */
  private handleChange(rowIndex: number, colIndex: number, value: string) {
    const { onChange, name } = this.props;
    const rows = [...this.state.rows];
    rows[rowIndex][colIndex] = value;
    this.setState({ rows });
    onChange(name, rows);
  }

  /**
   * Render repeating fields
   * @return {Node[]} Dom nodes
   */
  private fields(): JSX.Element[] {
    const { rows } = this.state;
    const { field } = this.props;

    return rows.map((row: any, rowIndex: number) => <tr key={rowIndex}>
      {
        field.columns.map((col, columnIndex) => {
          const Field = col.type;
          return <td key={columnIndex}>
            <Field value={typeof row === 'string' ? row : row[columnIndex]}
              name=""
              field={{
                ...col,
                placeholder: col.label,
              }}
              onBlur={() => ''}
              onChange={(name, value) => {
                this.handleChange(rowIndex, columnIndex, value);
              }} />
          </td>;
        })
      }

      <td>
        <Button bsStyle="link" onClick={(e) => this.remove(rowIndex)}>
          <Icon icon="times" color="danger" />
        </Button>
      </td>
    </tr>);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  public render(): JSX.Element {
    const { field } = this.props;
    return (<Table>
      <thead>
        <tr>
          {
            field.columns.map((col, i) => <th key={i}>{col.label}</th>)
          }
          <th>
            <Button color="link" onClick={(e) => {
              e.preventDefault();
              this.add();
            }}>
              <Icon icon="plus" label="Add" />
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {this.fields()}
      </tbody>
    </Table>);
  }
}

export default Grid;
