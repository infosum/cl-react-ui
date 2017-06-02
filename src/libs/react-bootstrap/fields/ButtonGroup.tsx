/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

interface IState {
  value: string;
}

export default class UiButtonGroup extends Component<IFormField, IState> {

 // handleChange: (e: MouseEvent) => {}

  constructor(props: IFormField) {
    super(props);
    this.state = {value: ''};
  }

  /**
   * Create buttons
   * @param {Object} field Field config
   * @return {Array} Nodes (buttons)
   */
  private buttons(field: IFieldConfig): JSX.Element[] {
    const {value, name} = this.props;
    return field.options.map((option: FormFieldOption, k: number) => {
      const fakeE = {
          altKey: false,
          target: {value: option.value},
        };
      const key = 'button-group-' + name + '-' + k;
      const active = value === option.value;
      let icon;

      if (option.icon) {
        const i = 'fa fa-' + option.icon;
        icon = <span><i className={i} /> </span>;
      }

      return <Button key={key}
        onClick={(e) => this.handleChange(fakeE as MouseEvent)} active={active}>
        {icon}{option.label}
      </Button>;
    });
  }

  /**
   * Handle change
   * @param {Event} e .
   */
  private handleChange(e: MouseEvent) {
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
    const {field} = this.props;

    return (<div className="form-group has-feedback">
      <ButtonGroup>
        {this.buttons(field)}
      </ButtonGroup>
    </div>);
  }
}
