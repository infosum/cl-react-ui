// @flow
import React, {Component} from 'react';
import {Radio} from 'react-bootstrap';
import {DOMEvent, FieldProps,
  FormFieldOption} from '../../../../types';

declare type FakeEvent = {
  target: {
    value: string
  }
}
export default class Select extends Component {
  props: FieldProps
  state: {
    value: string
  }
  handleChange: (e: DOMEvent) => {}

  constructor(props: FieldProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  /**
   * Handle change
   * @param {Event} e .
   */
  handleChange(e: DOMEvent | FakeEvent) {
    const {onChange, name} = this.props;
    this.state.value = e.target.value;
    onChange(e, name);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    const {field, value} = this.props,
      opts = field.options.map((option: FormFieldOption, k: number) => {
        let active = option.value === value,
          fakeE: FakeEvent = {
            target: {value: option.value}
          };
        return (<Radio key={k} active={active} value={option.value}
          onClick={e => this.handleChange(fakeE)}>
          {option.label}
          </Radio>);
      });

    return (<div>
            {opts}
            </div>);
  }
}

