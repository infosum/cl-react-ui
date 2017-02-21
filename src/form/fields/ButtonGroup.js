// @flow
import React, {Component} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {DOMEvent, FieldProps, FormField,
  FormFieldOption} from '../../types';

export default class UiButtonGroup extends Component {
  props: FieldProps

  state: {
    value: string
  }
  handleChange: (e: DOMEvent) => {}

  constructor(props: FieldProps) {
    super(props);
    this.state = {value: ''};
  }

  /**
   * Create buttons
   * @param {Object} field Field config
   * @return {Array} Nodes (buttons)
   */
  buttons(field: FormField): React$Element<any>[] {
    const {value, name} = this.props;
    return field.options.map((option: FormFieldOption, k: number) => {
      let fakeE = {
          target: {value: option.value}
        },
        key = 'button-group-' + name + '-' + k,
        active = value === option.value,
        icon = '';

      if (option.icon) {
        let i = 'fa fa-' + option.icon;
        icon = <span><i className={i} /> </span>;
      }

      return <Button key={key}
        onClick={e => this.handleChange(fakeE)} active={active}>
        {icon}{option.label}
      </Button>;
    });
  }

  /**
   * Handle change
   * @param {Event} e .
   */
  handleChange(e: DOMEvent) {
    const {onChange, name} = this.props;
    this.state.value = e.target.value;
    onChange(e, name);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    const {field} = this.props;

    return (<div className="form-group has-feedback">
      <ButtonGroup>
        {this.buttons(field)}
      </ButtonGroup>
    </div>);
  }
}

