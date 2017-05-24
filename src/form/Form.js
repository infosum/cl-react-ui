// @flow
import React, {Component, Element} from 'react';
import * as libs from '../libs';
import uuid from 'uuid';
import type {DOMEvent, FormActions, FormConfig,
  FormErrors, FormField, FormFields, ListRow} from '../types';
import deepEqual from 'deep-equal';
import validate from 'validate-promise';

let lib, fields, FormControl, layouts, Button;

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
  library?: 'reactstrap' | 'reactBootstrap',
  onSubmit: Function
};

/**
 * Create a form
 */
class UiForm extends Component {
  props: Props

  state: {
    errors: Object,
    form: Object,
    data: Object,
    state: Object
  }
  fields: FormFields
  actions: FormActions
  handleChange: (e: DOMEvent, name: string) => {}
  handleBlur: (name: string) => {}
  onSubmit: (e: DOMEvent, data: Object) => {}

  /**
   * Constructor
   * @param {Object} props props
   */
  constructor(props: Props) {
    super(props);
    const {config, library, onSubmit} = this.props;
    let state = {};
    Object.keys(props.errors).forEach(key => state[key] = 'error');
    this.state = {
      errors: props.errors,
      form: config.form,
      data: props.data || {},
      state
    };
    this.setLib(props);

    this.fields = config.form.fields;
    Object.keys(this.fields).forEach(k => {
      this.fields[k].pristine = true;
    })
    this.actions = config.form.actions;

    this.state.data = this.makeState(props.data);

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = onSubmit.bind(this);
    this.applyDataToForm(this.state.data);
  }

  /**
   * Will receive new props
   * @param {Object} newProps Props
   */
  componentWillReceiveProps(newProps: Props) {
    const {config, errors} = newProps;
    this.fields = config.form.fields;
    let state = {},
      newState = {};
    Object.keys(errors).forEach(key => state[key] = 'error');

    if (!deepEqual(this.props.data, newProps.data)) {
      newState.data = this.makeState(newProps.data);
      this.applyDataToForm(newState.data);
    }
    this.setLib(newProps);
    this.setState({...newState, state, errors});
  }

  /**
   * Set component names based on the supplied library name
   * @param {Object} newProps props
   */
  setLib(newProps) {
    const {config, library} = newProps;
    let libType = config.lib || library || 'reactBootstrap';
    lib = libs[libType];
    fields = lib.fields;
    layouts = lib.layouts;
    FormControl = lib.FormControl;
    Button = lib.Button;
  }

  /**
   * Build the form state, using this.props.data, then field default value
   * for data.
   * @param {Object} data Props
   * @return {Object} list row
   */
  makeState(data: Props): ListRow {
    let name, state = {};
    
    Object.keys(this.fields).forEach(name => {
      const field = this.fields[name],
        def = field.default;
      if (data && data[name]) {
        state[name] = data[name];
      } else if (def === undefined) {
        state[name] = '';
      } else {
        state[name] = typeof def === 'function'
        ? def(data, field)
        : def;
      }
    });

    return state;
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
   * Validate a single field
   * @param {Object} field Field
   * @param {String} value Field value
   * @param {Object} data Form data
   * @return {Promise}
   */
  validateOne(field: FormField, value: string, data: ListRow = {}): Promise<string> {
    if (field.validate === undefined || field.validate.promises === undefined) {
      return Promise.resolve('');
    }
    const validate = (p) => {
      const msg = p.msg || field.validate.msg;
      return p.rule(value, data, msg, p.arg);
    };

    let promises = field.validate.promises
      .map(validate);

    return new Promise((resolve: Function, reject: Function) => {
      return Promise.all(promises)
        .then(() => resolve('success'))
        .catch(e =>
          reject(e)
        );
    })
  }

  /**
   * Get validation state
   * @param {string} name column name
   * @return {Object} validation state
   */
  getValidationState(name: string): Object {
    let field = this.fields[name],
      {errors} = this.state,
      state = {...this.state.state},
      i = 0,
      value = this.state.data[name],
      res = [],
      serverError = (errors[name] && errors[name].length > 0),
      serverSuccess = (errors[name] && errors[name].length === 0);

    if (!field.pristine) {
      this.validateOne(field, value, this.state.data)
      .then(ok => {
        state[name] = 'success';
        errors[name] = []
        this.setState({state, errors});
      })
      .catch((err: string) => {
        errors[name] = [err];
        state[name] = 'error';
        this.setState({state, errors});
      })
    } else {
       if (serverError) {
         state[name] = [serverError];
        state[name] = 'error';
      }
      if (serverSuccess) {
        state[name] = [];
        state[name] = 'success';
      }
    }

    this.setState({state, errors});
    return state;
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
   * @param {String} name Field name
   * @param {String|number} value Field value
   */
  handleChange(name: string, value: string | number) {
    const {formUpdate, config} = this.props,
      field = this.fields[name];
    this.fields[name].pristine = false;
    if (typeof formUpdate === 'function') {
      formUpdate(config.view, field, name, value);
    }
    let data = this.state.data;
    data[name] = value;
    this.setState({data});

    if (field.onChange) {
      field.onChange(this);
    }
  }

  /**
   * Get the form's layout
   * @return {Dom} Dom node
   */
  formLayout() {
    const {layout} = this.props;
    if (typeof layout === 'function') {
      return layout;
    }
    let layoutName = layout && layout[0].toUpperCase() + layout.slice(1);
    return layouts[layoutName] ? layouts[layoutName] : layouts.Default;
  }

  /**
   * Handle field blur - check validation state
   */
  handleBlur(name: string) {
    this.fields[name].pristine = false;
    let state = this.getValidationState(name);
  }

  /**
   * Buid the react class for the field
   * @param {Object} field Field
   * @return {Element}
   */
  getReactField(field: FormField): Element<*> | null {
    let FieldComponent = null,
      type;
    if (typeof field === 'function') {
      FieldComponent = field;
    } else {
      switch (typeof field.type) {
      case 'string':
        // Ucase first the name
        type = field.type && field.type[0].toUpperCase()
          + field.type.slice(1);
        if (fields[type]) {
           FieldComponent = fields[type];
        }
        break;
      case 'function':
        FieldComponent = field.type;
        break;
      }
    }

    return FieldComponent;
  }
  /**
   * Build a field
   * @param {String} name Field name
   * @param {Object} field Field
   * @return {Node} FormGroup - field, help and label
   */
  makeField(name: string, field: FormField): Element<any> | null {
    let {errors} = this.state,
      error = errors[name] || [],
      FormGroup = lib.FormGroup,
      FieldComponent = this.getReactField(field);

    return <FormGroup
      key={`field-formgroup-${name}`}
      errors={error}
      FieldComponent={FieldComponent}
      field={field}
      name={name}
      row={this.state.data}
      onBlur={this.handleBlur}
      onChange={(name, value) => this.handleChange(name, value)}
      value={this.state.data[name] || field.value || ''}
      validationState={this.state.state[name]} />
  }

  /**
   * Convert fields to validate-promise contract
   * @return {Array} validation contract
   */
  toContract(): any[] {
    return Object.keys(this.fields)
    .filter(name => this.fields[name].validate !== undefined)
    .map(name => {
      const field = this.fields[name].validate;
      field.key = name;
      return field;
    })
  }

  /**
   * Fail form submission due to validation errors
   * Update state
   * @param {Object} errors Valdiate-promise errors
   */
  failFormSubmission(errors): Object {
    let state = {};
    Object.keys(errors).forEach(name => state[name] = 'error');
    this.setState({state, errors});
  }

  /**
   * Render
   * @return {Node} Dom node
   */
  render(): React$Element<any> {
    const {errors} = this.props,
      FormActions = lib.FormActions,
      buttons = <FormActions
                  actions={this.actions}
                  onSubmit={e => {
                    e.preventDefault();
                    validate(this.toContract(), this.state.data)
                    .then(() => this.onSubmit(e, this.state.data))
                    .catch(this.failFormSubmission.bind(this)); 
                    }
                  }/>,
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
