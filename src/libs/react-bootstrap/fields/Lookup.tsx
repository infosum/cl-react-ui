import * as React from 'react';
import { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { Icon } from '../../../index';
import { FieldLookup } from '../../../interfaces';

interface IState {
  loading: boolean;
  search: string;
  storeData?: any;
  value: string;
}

export default class Lookup extends Component<FieldLookup, IState> {
  private groupedData: any;

  constructor(props: FieldLookup) {
    super(props);
    this.state = { loading: true, search: '', value: '' };
  }

  public componentDidMount() {
    this.get();
  }

  /**
   * Get the store data
   * @return {Array} option objects
   */
  private get() {
    this.setState({ loading: true });
    try {
      this.getStoreData().then((storeData) => {
        this.setState({ storeData, loading: false });
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * If row props have updated get store state
   * @param {Object} prevProps Previous props
   */
  public componentDidUpdate(prevProps) {
    const { name, onChange, row, field } = this.props;
    const observe = field.options.observe;
    const isObserved = (value, index) => observe.indexOf(index) !== -1;
    if (!observe || observe.length === 0) {
      return;
    }
    if (JSON.stringify(prevProps.row.filter(isObserved)) !== JSON.stringify(row.filter(isObserved))) {
      this.setState({ value: '' });
      onChange(name, '');
      this.get();
    }
  }

  /**
   * Get the relevant part of the store data for the list population
   * @return {Promise} Partial store data to use for list population
   */
  private async getStoreData(): Promise<any> {
    let group;
    this.groupedData = {};
    const { field, row } = this.props;
    if (field.options.optGroup === undefined) {
      group = '';
    } else {
      group = field.options.optGroup;
    }

    const storeData = await field.options.store(row, this.props);
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
    const { field } = this.props;
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

    Object.keys(storeData).forEach((optGroup) => {
      const opts = storeData[optGroup]
        .filter((option) => optionFilter(option))
        .map((option, k) => {
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
  private handleChange(e: MouseEvent) {
    const { onChange, name } = this.props;
    const target = e.target as HTMLInputElement;
    this.setState({ value: target.value });
    onChange(name, target.value);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  public render(): JSX.Element {
    if (this.state.loading) {
      return <Icon icon="spinner" spin label="loading..." />;
    }

    const opts = this.mapDataToOpts(this.state.storeData);
    const { value, onBlur, name } = this.props;

    return (<FormControl componentClass="select"
      value={value}
      onBlur={() => onBlur(name)}
      onChange={(e) => {
        this.handleChange(e);
      }}>
      {opts}
    </FormControl>);
  }
}
