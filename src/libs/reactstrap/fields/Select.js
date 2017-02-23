// @flow
import React, {Component} from 'react';
import {Input} from 'reactstrap';
import {DOMEvent, FieldProps,
  FormFieldOption} from '../../../types';

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
    onChange(name, e.value);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    const {field, value, onBlur, name} = this.props,
      opts = field.options.map((option: FormFieldOption, k: number) =>
        <option key={'select-option-' + k} value={option.value}>
          {option.label}
        </option>
      );

    return (<Input
      type="select"
      value={value}
      onBlur={() => onBlur(name)}
      onChange={e => this.handleChange(e)}>
      {opts}
     </Input>);
  }
}

