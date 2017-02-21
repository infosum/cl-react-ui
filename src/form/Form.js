// @flow
import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel,
  FormControl, HelpBlock, Checkbox} from 'react-bootstrap';
import * as fieldComponents from './fields';
import * as layouts from './layouts';
import uuid from 'node-uuid';
import {DOMEvent, FormActions, FormConfig,
  FormErrors, FormField, FormFields, ListRow} from '../types';

type Props = {
  actions: FormActions,
  className?: string,
  config: {
    view: string,
    form: FormConfig
  },
  data: ListRow,
  errors: FormErrors,
  formUpdate: Function,
  layout: string,
  onSubmit: Function
};

/**
 * Create a form
 */
class UiForm extends Component {
  props: Props

  state: {
    form: Object,
    data: Object
  }
  fields: FormFields
  actions: FormActions
  handleChange: (e: DOMEvent, name: string) => {}
  onSubmit: (e: DOMEvent, data: Object) => {}

  /**
   * Constructor
   * @param {Object} props props
   */
  constructor(props: Props) {
    super(props);
    const {config, onSubmit} = this.props;
    this.state = {
      form: config.form,
      data: {}
    };

    this.fields = config.form.fields;
    this.actions = config.form.actions;

    this.makeState();

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = onSubmit.bind(this);
    this.applyDataToForm(this.state.data);
  }

  /**
   * Build the form state, using this.props.data, then field value
   * for data.
   */
  makeState() {
    const {data} = this.props;
    let name;
    for (name in this.fields) {
      if (data && data[name]) {
        this.state.data[name] = data[name];
      } else if (this.fields[name].value === undefined) {
        this.state.data[name] = '';
      } else {
        this.state.data[name] = this.fields[name].value;
      }
    }
  }

  /**
   * Update the form's properties so that any config value that is a function is
   * run and the current record's data applied.
   * @param {Object} row Form state
   */
  applyDataToForm(row: ListRow) {
    let name,
      form = this.state.form;
    if (typeof (form._title) === 'function') {
      this.state.form.title = form._title(row);
    }
    for (name in form.actions) {
      if (typeof (form.actions[name]._label) === 'function') {
        this.state.form.actions[name].label = form.actions[name]._label(row);
      }
    }
  }

  /**
   * Get validation state
   * @param {string} name column name
   * @return {string | voild}
   */
  getValidationState(name: string): string | void {
    let field = this.fields[name],
      {errors} = this.props,
      i = 0,
      value = this.state.data[name],
      res = [],
      serverError = (errors[name] && errors[name].length > 0),
      serverSuccess = (errors[name] && errors[name].length === 0);

    if (field.validate !== undefined) {
      for (i === 0; i < field.validate.length; i++) {
        res.push(field.validate[i](value));
      }
    }
    if (!field.pristine) {
      if (res.indexOf('error') !== -1 || serverError) {
        return 'error';
      }
      if (res.indexOf('warning') !== -1) {
        return 'warning';
      }
      return 'success';
    }
    if (serverError) {
      return 'error';
    }
    if (serverSuccess) {
      return 'success';
    }
  }

  /**
   * Build form buttons
   * @return {Array} Buttons
   */
  buttons(): React$Element<any>[] {
    const {actions, className} = this.props;

    // Merge property actions (if any) with the form config actions
    if (actions) {
      this.actions = {...actions, ...this.actions};
    }

    let keys = Object.keys(this.actions),
      buttons = keys.map((k: string, index: number) => {
        let action = this.actions[k],
          evnt = '',
          handle;

        if (action.action) {
          evnt = action.action;
        }
        if (action.type === 'submit') {
          handle = (e: DOMEvent) => {
            this.onSubmit(e, this.state.data);
          };
        } else {
          handle = e => evnt(e, this);
        }

        return (<Button key={action.id}
          key={'form-button-' + index}
          bsStyle={action.style}
          className={className}
          onClick={handle}
          type={action.type ? action.type : 'button'}>
            {action.label}
        </Button>);
      });

    return buttons;
  }

  /**
   * Check field access, if no access property then return true
   * Otherwise it should be an object with functions keyed on edit or new
   * @param {Object} field To render
   * @return {Bool} Can access field
   */
  access(field: FormField): boolean {
    const mode = this.state.data.id === '' ? 'new' : 'edit';

    if (!field.access) {
      return true;
    }

    if (field.access[mode]) {
      return field.access[mode](field, this.state.data);
    }

    return true;
  }

  /**
   * Update the form's state
   * @param {Event} e . (or mock event)
   * @param {String} name Field name
   */
  handleChange(e: DOMEvent, name: string) {
    const {formUpdate, config} = this.props,
      field = this.fields[name];
    this.fields[name].pristine = false;
    formUpdate(config.view, field, name, e.target.value);

    if (field.onChange) {
      field.onChange(this);
    }
  }

  /**
   * Get the form's layout
   * @return {Dom} Dom node
   */
  formLayout() {
    const {layout} = this.props,
      layoutName = layout && layout[0].toUpperCase() + layout.slice(1);
    return layouts[layoutName] ? layouts[layoutName] : layouts.Default;
  }

  /**
   * Build field help blocks
   * @param {String} name Field name
   * @return {Array.Node} HelpBlock nodes
   */
  makeHelp(name: string): React$Element<any>[] {
    const {errors} = this.props;
    let hi,
      help = [];
    if (errors && errors[name]) {
      for (hi = 0; hi < errors[name].length; hi++) {
        let key = 'help-' + name + '-' + hi;
        help.push(<HelpBlock key={key}>{errors[name][hi]}</HelpBlock>);
      }
    }
    return help;
  }

  /**
   * Build a field
   * @param {String} name Field name
   * @param {Object} field Field
   * @return {Node} FormGroup - field, help and label
   */
  makeField(name: string, field: FormField): React$Element<any> {
    // Ucase first the name
    const value = this.state.data[name];
    let control, iType, checked, type,
      label = field.type === 'hidden' || field.label === '' ?
        null : <ControlLabel>{field.label}</ControlLabel>;

    if (typeof field.type === 'function') {
      // React component....
      type = uuid.v4();
      fieldComponents[type] = field.type;
    } else {
      type = field.type && field.type[0].toUpperCase()
      + field.type.slice(1);
    }
    if (fieldComponents[type]) {
      let FieldComponent = fieldComponents[type];
      control = <FieldComponent
                  value={value}
                  field={field}
                  name={name}
                  row={this.state.data}
                  onChange={e => this.handleChange(e, name)}></FieldComponent>;
    } else {
      iType = field.type ? field.type : 'text';
      switch (iType) {
      case 'checkbox':
        checked = (value === true || value === '1' || value === 'true');
        if (checked) {
          control = (<Checkbox checked
            value={value}
            onChange={e => this.handleChange(e, name)}>
              {field.label} {value}
            </Checkbox>);
        } else {
          control = (<Checkbox
            value={value}
            onChange={e => this.handleChange(e, name)}>
              {field.label} {value}
            </Checkbox>);
        }

        break;
      default:
        control = <FormControl
                type={iType}
                value={value}
                placeholder={field.placeholder}
                onChange={e => this.handleChange(e, name)}
            />;
        break;
      }
    }

    return (<FormGroup
        key= {field.id}
        controlId={field.id}
        validationState={this.getValidationState(name)}
        >
        {label}
        {control}
        <FormControl.Feedback />
        <HelpBlock>{field.help}</HelpBlock>
        {this.makeHelp(name)}
    </FormGroup>);
  }

  /**
   * Render
   * @return {Node} Dom node
   */
  render(): React$Element<any> {
    this.makeState();
    const {errors} = this.props,
      buttons = this.buttons(),
      FormLayout = this.formLayout();

    let fields = {},
      name, field;

    for (name in this.fields) {
      if (this.fields.hasOwnProperty(name)) {
        field = this.fields[name];

        if (!this.access(field)) {
          break;
        }

        fields[name] = this.makeField(name, field);
      }
    }

    return (<FormLayout form={this.state.form}
      fields={fields} actions={buttons}
      errors={errors} onSubmit={this.onSubmit} />);
  }
}

export default UiForm;
