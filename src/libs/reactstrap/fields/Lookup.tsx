/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Input} from 'reactstrap';

interface IState {
  search?: string;
  storeData?: any;
  value?: string;
}
export default class Lookup extends Component<FieldLookup, IState> {

  // handleChange: (e: MouseEvent) => {}
  private groupedData: any;

  constructor(props: FieldLookup) {
    super(props);
    const storeData = this.getStoreData();
    // this.handleChange = this.handleChange.bind(this);
    this.state = {storeData, search: '', value: ''};
  }

  /**
   * Get the relevant part of the store data for the list population
   * @return {Object} Partial store data to use for list population
   */
  private getStoreData(): Object {
    let group;
    this.groupedData = {};

    const {field, row} = this.props;
    const storeData = field.options.store(row);

    if (field.options.optGroup === undefined) {
      group = '';
    } else {
      group = field.options.optGroup;
    }
    storeData.forEach((data) => {
      const thisGroup = data[group];
      if (this.groupedData[thisGroup] === undefined) {
        this.groupedData[thisGroup] = [];
      }
      this.groupedData[thisGroup].push(data);
    });
    return this.groupedData;
  }

  /**
   * Convert the data into <options>
   * @param {Object} storeData List data
   * @return {Array.Node} Dom nodes
   */
  private mapDataToOpts(storeData: Object): JSX.Element[] {
    const {field} = this.props;
    const key = field.options.key;
    const label = field.options.label;
    let optionFilter;
    const ok = (row) => true;
    const allOpts = [<option key="lookup-option-sel" value="">
        Please select
      </option>];

    if (field.options.optionFitler === undefined) {
      optionFilter = ok;
    } else {
      optionFilter = field.options.optionFitler;
    }

    Object.keys(storeData).forEach((optGroup: string) => {
      const opts = storeData[optGroup]
      .filter((option) => optionFilter(option))
      .map((option: IFieldOption, k: number) => {
        const ref = 'lookup-option-' + k;
        const thisLabel = typeof label === 'function'
          ? label(option)
          : option[label];
        return <option key={ref} value={option[key]}>
          {thisLabel}
        </option>;
      });

      if (optGroup === 'undefined') {
        allOpts.push(opts);
      } else {
        allOpts.push(<optgroup key={'lookup-optgroup-' + optGroup}
          label={optGroup}>
            {opts}
          </optgroup>);
      }
    });

    return allOpts;
  }

  /**
   * Handle change
   * @param {Event} e .
   */
  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {onChange, name} = this.props;
    const target = e.target as HTMLInputElement;
    this.setState({value: target.value});
    onChange(name, target.value);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  public render(): JSX.Element {
    const storeData = this.getStoreData();
    const opts = this.mapDataToOpts(storeData);
    const {value, onBlur, name} = this.props;

    return (<Input type="select"
        value={value}
        onBlur={() => onBlur(name)}
        onChange={(e) => {
          this.handleChange(e);
        }}>
        {opts}
      </Input>);
  }
}
