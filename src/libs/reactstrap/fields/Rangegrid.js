// @flow
import React, {Component, Element} from 'react';
import {Table, Button, Input} from 'reactstrap';


type Props = {
  value: string,
  name: string,
  onChange: (name: string, data: [number, number][]) => {}
};

/**
 * Explicit bins:
 * Define each bin's min and max values
 */
class Rangegrid extends Component {

  props: Props
  state: {
    ranges: [number, number][]
  }

  /**
   * Constructor
   * @param {Object} props .
   */
  constructor(props: Props) {
    let ranges;
    if (!props.value || props.value === '') {
      ranges = [];
    } else {
      ranges = JSON.parse(props.value);
    }
    super(props);
    this.state = {
      ranges
    };
  }

  /**
   * Add a range
   */
  add() {
    const {name, onChange} = this.props;
    let ranges = [...this.state.ranges],
      lastRange =  [0, 0],
      nextRange = [0, 0],
      lastMin = -1,
      lastMax = -1;
    if (ranges.length > 0) {
      lastRange = ranges[ranges.length - 1];
      lastMin = parseInt(lastRange[0], 10);
      lastMax = parseInt(lastRange[1], 10);
      nextRange = [
        lastMax + 1,
        lastMax + (lastMax - lastMin)
      ];
    }

    ranges.push(nextRange);
    this.setState({ranges});
    onChange(name, ranges);
  }

  /**
   * Remove a range
   * @param {Number} index Array index to remove
   */
  remove(index: number) {
    const {name, onChange} = this.props;
    let ranges = [...this.state.ranges]
      .filter((v, i) => i !== index);
    this.setState({ranges});
    onChange(name, ranges);
  }

  /**
   * Bin field change
   * @param {Number} i Index to update
   * @param {Number} key Option index to update 0: min, 1: max
   * @param {String} value Value
   */
  handleChange(i: number, key: 0 | 1, value: string) {
    const {onChange, name} = this.props;
    let ranges = [...this.state.ranges];
    ranges[i][key] = parseFloat(value);
    this.setState({ranges});
    onChange(name, ranges);
  }

  /**
   * Render repeating fields
   * @return {Node[]} Dom nodes
   */
  fields(): Element<any>[] {
    const {ranges} = this.state;

    return ranges.map((range: [number, number], i: number) => <tr>
      <td>
        <Input
          type="number"
          value={range[0]}
          placeholder="Min"
          onChange={e => {
            e.preventDefault();
            this.handleChange(i, 0, e.target.value);
          }}
        />
      </td>
      <td>
        <Input
          type="number"
          value={range[1]}
          placeholder="Max"
          onChange={e => {
            e.preventDefault();
            this.handleChange(i, 1, e.target.value);
          }}
        />
      </td>
      <td>
        <Button color="link" onClick={e => this.remove(i)}>
          <i className="fa fa-times text-danger"></i>
        </Button>
      </td>
    </tr>);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    return (<Table>
      <thead>
        <tr>
          <th>Min</th>
          <th>Max</th>
          <th>
            <Button color="link" onClick={e => {
                e.preventDefault();
                this.add();
              }}>
              <i className="fa fa-plus"></i>Add
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

export default Rangegrid;
