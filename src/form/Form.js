// @flow
import React, {Component} from 'react';
import * as libs from '../libs';
import * as layouts from './layouts';
import uuid from 'node-uuid';
import type {DOMEvent, FormActions, FormConfig,
  FormErrors, FormField, FormFields, ListRow} from '../types';

let libType = 'reactBootstrap',
  lib = libs[libType],
  fields = lib.fields,
  FormControl = lib.FormControl,
  Button = lib.Button;

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
    data: Object,
    state: Object
  }
  fields: FormFields
  actions: FormActions
  handleChange: (e: DOMEvent, name: string) => {}
  handleBlur: (name) => {}
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
      data: {},
      state: {}
    };

    this.fields = config.form.fields;
    this.actions = config.form.actions;

    this.makeState();

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = onSubmit.bind(this);
    this.applyFieldFunctions();
    this.applyDataToForm(this.state.data);
  }

  componentWillReceiveProps(newProps: Props) {
    const {config} = newProps;
    this.fields = config.form.fields;
    this.applyFieldFunctions();
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
      state = this.state.state,
      i = 0,
      value = this.state.data[name],
      res = [],
      serverError = (errors[name] && errors[name].length > 0),
      serverSuccess = (errors[name] && errors[name].length === 0);

    if (field.validate !== undefined) {
      res = field.validate.map(v => v(value))
      // for (i === 0; i < field.validate.length; i++) {
      //   res.push(field.validate[i](value));
      // }
    }
    if (!field.pristine) {
      if (res.indexOf('error') !== -1 || serverError) {
         state[name] = 'error';
      }
      else if (res.indexOf('warning') !== -1) {
        state[name] = 'warning';
      } else {
        state[name] = 'success';
      }
    } else {
       if (serverError) {
      state[name] = 'error';
    }
      if (serverSuccess) {
        state[name] = 'success';
      }
    }

    this.setState(state);
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
          evnt = () => {},
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
    if (typeof formUpdate === 'function') {
      formUpdate(config.view, field, name, e.target.value);
    }
    let data = this.state.data;
    data[name] = e.target.value;
    this.setState({data});
    console.log('state.data', data);
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
    let help = [];
    if (errors && errors[name]) {
      help = errors[name].map((error, i) => {
        let key = 'help-' + name + '-' + i,
        HelpBlock = lib.HelpBlock;
        return <HelpBlock key={key}>
            {error}
          </HelpBlock>;
      });
    }
    return help;
  }

  /**
   * Handle field blur - check validation state
   */
  handleBlur(name: string) {
    this.fields[name].pristine = false;
    this.getValidationState(name);
  }

  /**
   * Build a field
   * @param {String} name Field name
   * @param {Object} field Field
   * @return {Node} FormGroup - field, help and label
   */
  makeField(name: string, field: FormField): React$Element<any> | null {
    // Ucase first the name
    const value = this.state.data[name];
    let control, iType, checked,
      {ControlLabel, FormGroup, HelpBlock} = lib,
      type = field.type && field.type[0].toUpperCase()
      + field.type.slice(1),
      label = field.type === 'hidden' || field.label === '' ?
        null : <ControlLabel>{field.label}</ControlLabel>;


    if (!fields[type]) {
      console.warn('no field type: ' + type);
      return null;
    }
    let FieldComponent = fields[type];

    return (<FormGroup
        key= {field.id}
        controlId={field.id}
        validationState={this.state.state[name]}
        >
        {label}
        <FieldComponent
          value={value}
          field={field}
          name={name}
          row={this.state.data}
          onBlur={this.handleBlur}
          onChange={e => this.handleChange(e, name)} />
        <FormControl.Feedback />
        <HelpBlock>{field.help}</HelpBlock>
        {this.makeHelp(name)}
    </FormGroup>);
  }

  /**
   * If a field type is a function then its a react element
   * Create a uuid for it and assign it to the list of field
   * renderers
   */
  applyFieldFunctions() {
    Object.keys(this.fields).forEach(name => {
        let type,
          field = this.fields[name];
        if (typeof field.type === 'function') {
          // React component....
          type = uuid.v4();
          this.fields[type] = field.type;
        }
    });
  }

  /**
   * Render
   * @return {Node} Dom node
   */
  render(): React$Element<any> {
    const {errors} = this.props,
      buttons = this.buttons(),
      FormLayout = this.formLayout();

    let fields = {};

    Object.keys(this.fields)
      .filter(name => this.access(this.fields[name]))
      .forEach(name => {
        let field = this.fields[name];
        fields[name] = this.makeField(name, field);
    });

    return (<FormLayout
              actions={buttons}
              errors={errors}
              fields={fields}
              form={this.state.form}
              onSubmit={this.onSubmit} />);
  }
}

export default UiForm;
