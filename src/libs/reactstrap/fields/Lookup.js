// @flow
import React, {Component} from 'react';
import {Input} from 'reactstrap';
import {DOMEvent, FormFieldProps,
  FormFieldOption} from '../../../types';

export default class Lookup extends Component {
  props: FormFieldProps
  state: {
    search?: string,
    storeData?: Object,
    value?: string
  }

  handleChange: (e: DOMEvent) => {}
  groupedData: Object;

  constructor(props: FormFieldProps) {
    super(props);
    let storeData = this.getStoreData();
    // this.handleChange = this.handleChange.bind(this);
    this.state = {storeData, search: '', value: ''};
  }

  /**
   * Get the relevant part of the store data for the list population
   * @return {Object} Partial store data to use for list population
   */
  getStoreData(): Object {
    let group;
    this.groupedData = {};

    const {field, row} = this.props,
      storeData = field.options.store(row);

    if (field.options.optGroup === undefined) {
      group = '';
    } else {
      group = field.options.optGroup;
    }
    storeData.forEach(data => {
      let thisGroup = data[group];
      if (this.groupedData[thisGroup] === undefined) {
        this.groupedData[thisGroup] = [];
      }
      this.groupedData[thisGroup].push(data);
    })
    return this.groupedData;
  }

  /**
   * Convert the data into <options>
   * @param {Object} storeData List data
   * @return {Array.Node} Dom nodes
   */
  mapDataToOpts(storeData: Object): React$Element<any>[] {
    const {field} = this.props;
    let key = field.options.key,
      label = field.options.label,
      optionFilter,
      ok = row => true,
      allOpts = [<option key="lookup-option-sel" value="">
        Please select
      </option>];

    if (field.options.optionFitler === undefined) {
      optionFilter = ok;
    } else {
      optionFilter = field.options.optionFitler;
    }

    Object.keys(storeData).forEach((optGroup: string) => {
      let opts = storeData[optGroup]
      .filter((option) => optionFilter(option))
      .map((option: FormFieldOption, k: number) => {
        let ref = 'lookup-option-' + k;
        const label = typeof (option[label]) === 'function'
          ? option[label](option)
          : option[label];
        return <option key={ref} value={option[key]}>
          label
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
  handleChange(e: DOMEvent) {
    const {onChange, name} = this.props;
    this.state.value = e.target.value;
    onChange(name, e.target.value);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    let storeData = this.getStoreData(),
      opts = this.mapDataToOpts(storeData);
    const {value, onBlur, name} = this.props;

    return (<Input type="select"
        value={value}
        onBlur={() => onBlur(name)}
        onChange={(e: DOMEvent) => {
          this.handleChange(e);
        }}>
        {opts}
      </Input>);
  }
}
