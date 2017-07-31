import * as React from 'react';
import { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FieldButtonGroup, IFieldOption } from '../../../interfaces';

interface IState {
  value: string;
}

export default class UiButtonGroup extends Component<FieldButtonGroup, IState> {

  constructor(props: FieldButtonGroup) {
    super(props);
    this.state = { value: '' };
  }

  /**
   * Create buttons
   * @param {Object} field Field config
   * @return {Array} Nodes (buttons)
   */
  private buttons(field): JSX.Element[] {
    const { value, name } = this.props;
    return field.options.map((option: IFieldOption, k: number) => {
      const fakeE = {
        altKey: false,
        target: { value: option.value },
      };
      const key = 'button-group-' + name + '-' + k;
      const active = value === option.value;
      let icon;

      if (option.icon) {
        const i = 'fa fa-' + option.icon;
        icon = <span><i className={i} /> </span>;
      }

      return <Button key={key}
        onClick={(e) => this.handleChange(fakeE as any)} active={active}>
        {icon}{option.label}
      </Button>;
    });
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
    const { field } = this.props;

    return (<div className="form-group has-feedback">
      <ButtonGroup>
        {this.buttons(field)}
      </ButtonGroup>
    </div>);
  }
}
