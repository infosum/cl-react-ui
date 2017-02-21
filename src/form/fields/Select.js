// @flow
import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import {DOMEvent, FieldProps,
  FormFieldOption} from '../../../../types';

export default class Select extends Component {
  props: FieldProps

  state: {
    value: string
  }
  handleChange: (e: DOMEvent) => {}

  /**
   * Constructor
   * @param {Object} props .
   */
  constructor(props: FieldProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  /**
   * Handle change
   * @param {Event} e .
   */
  handleChange(e: DOMEvent) {
    const {onChange, name} = this.props;
    this.state.value = e.value;
    onChange(e, name);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    const {field, value} = this.props,
      opts = field.options.map((option: FormFieldOption, k: number) => {
        let key = 'select-option-' + k;
        return <option key={key} value={option.value}>{option.label}</option>;
      });

    return (<FormControl componentClass="select"
      value={value}
      onChange={e => this.handleChange(e)}>
      {opts}
    </FormControl>);
  }
}

