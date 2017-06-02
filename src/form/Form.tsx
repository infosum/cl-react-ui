/// <reference path="../interfaces.d.ts" />
import * as deepEqual from 'deep-equal';
import * as React from 'react';
import {Component} from 'react';
import uuid from 'uuid';
import validate from 'validate-promise';
import * as libs from '../libs';

let lib;
let fields;
let FormControl;
let layouts;
let Button;

interface IState {
  data: any;
  errors: any;
  form: IFormConfig;
  state: any;
  visibility: {
    [key: string]: boolean;
  };
}

/**
 * Create a form
 */
class UiForm extends Component<IFormProps, IState> {

  private fields: {[key: string]: IFieldConfig};
  private actions: IFormActionsConfig;
  private onSubmit: (e: MouseEvent, data: any) => void;

  public static defaultProps: Partial<IFormProps> = {
    layout: 'reactstrap',
  };

  /**
   * Constructor
   * @param {Object} props props
   */
  constructor(props: IFormProps) {
    super(props);
    const {config, library, onSubmit, visibility = {}} = this.props;
    this.fields = config.form.fields;
    const state = {};

    Object.keys(props.errors).forEach((key) => state[key] = 'error');
    Object.keys(this.fields).forEach((key) => {
      this.fields[key].pristine = true;
      if (!visibility.hasOwnProperty(key)) {
        visibility[key] = true;
      }
    });

    this.state = {
      data: this.makeState(props.data),
      errors: props.errors,
      form: config.form,
      state,
      visibility,
    };
    this.setLib(props);
    this.actions = config.form.actions;
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = onSubmit.bind(this);
    this.applyDataToForm(this.state.data);
  }

  /**
   * Will receive new props
   * @param {Object} newProps Props
   */
  public componentWillReceiveProps(newProps: IFormProps) {
    const {config, errors} = newProps;
    this.fields = config.form.fields;
    const state = {};
    const newState: any = {};
    Object.keys(errors).forEach((key) => state[key] = 'error');

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
  private setLib(newProps) {
    const {config, library} = newProps;
    const libType = config.lib || library || 'reactBootstrap';
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
  private makeState(data: IListRow): IListRow {
    const state = {};
    Object.keys(this.fields).forEach((name) => {
      const field = this.fields[name];
      const def = field.default;
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
  private applyDataToForm(row: IListRow) {
    let name;
    const form = this.state.form;
    const {title} = this.props;
    if (title) {
      this.state.form.title = typeof(title) === 'function' ? title(row) : title;
    } else {
      if (typeof (form._title) === 'function') {
        this.state.form.title = form._title(row);
      }
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
  private validateOne(field: IFieldConfig, value: string, data: IListRow = {}): Promise<string> {
    if (field.validate === undefined || field.validate.promises === undefined) {
      return Promise.resolve('');
    }
    const validate = (p) => {
      const msg = p.msg || field.validate.msg;
      return p.rule(value, data, msg, p.arg);
    };

    const promises = field.validate.promises
      .map(validate);

    return new Promise((resolve: Function, reject: Function) => {
      return Promise.all(promises)
        .then(() => resolve('success'))
        .catch((e) => reject(e));
    });
  }

  /**
   * Get validation state
   * @param {string} name column name
   * @return {Object} validation state
   */
  private getValidationState(name: string): Object {
    const field = this.fields[name];
    const {errors} = this.state;
    const state = {...this.state.state};
    const i = 0;
    const value = this.state.data[name];
    const res = [];
    const serverError = (errors[name] && errors[name].length > 0);
    const serverSuccess = (errors[name] && errors[name].length === 0);

    if (!field.pristine) {
      this.validateOne(field, value, this.state.data)
      .then((ok) => {
        state[name] = 'success';
        errors[name] = [];
        this.setState({state, errors});
      })
      .catch((err: string) => {
        errors[name] = [err];
        state[name] = 'error';
        this.setState({state, errors});
      });
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
   * @param {string} name Field name to render
   * @return {Bool} Can access field
   */
  private access(name: string): boolean {
    const field = this.fields[name];
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
  private handleChange(name: string, value: string | number) {
    const {formUpdate, config} = this.props;
    const field = this.fields[name];
    this.fields[name].pristine = false;
    if (typeof formUpdate === 'function') {
      formUpdate(config.view, field, name, value);
    }
    const data = this.state.data;
    data[name] = value;
    this.setState({data});

    // if (field.onChange) {
    //   field.onChange(this);
    // }
  }

  /**
   * Get the form's layout
   * @return {Dom} Dom node
   */
  private formLayout() {
    const {layout} = this.props;
    if (typeof layout === 'function') {
      return layout;
    }
    const layoutName = layout && layout[0].toUpperCase() + layout.slice(1);
    return layouts[layoutName] ? layouts[layoutName] : layouts.Default;
  }

  /**
   * Handle field blur - check validation state
   */
  private handleBlur(name: string) {
    this.fields[name].pristine = false;
    const state = this.getValidationState(name);
  }

  /**
   * Buid the react class for the field
   * @param {Object} field Field
   * @return {Element}
   */
  private getReactField(field: IFieldConfig): JSX.Element | null {
    let FieldComponent = null;
    let type;
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
private makeField(name: string, field: IFieldConfig): JSX.Element | null {
    const {errors} = this.state;
    const error = errors[name] || [];
    const FormGroup = lib.FormGroup;
    const FieldComponent = this.getReactField(field);

    return <FormGroup
      key={`field-formgroup-${name}`}
      errors={error}
      FieldComponent={FieldComponent}
      field={field}
      name={name}
      row={this.state.data}
      onBlur={this.handleBlur}
      onChange={(fieldName, value) => this.handleChange(fieldName, value)}
      value={this.state.data[name] || field.value || ''}
      validationState = {this.state.state[name]} />;
  }

  /**
   * Convert fields to validate-promise contract
   * @return {Array} validation contract
   */
  private toContract(): any[] {
    return Object.keys(this.fields)
    .filter((name) => this.fields[name].validate !== undefined)
    .map((name) => {
      const field = this.fields[name].validate;
      field.key = name;
      return field;
    });
  }

  /**
   * Fail form submission due to validation errors
   * Update state
   * @param {Object} errors Valdiate-promise errors
   */
  private failFormSubmission(errors) {
    const state = {};
    Object.keys(errors).forEach((name) => state[name] = 'error');
    this.setState({state, errors});
  }

  private isVisible(name) {
    return this.state.visibility[name];
  }

  private showField(name: string) {
    const visibility = this.state.visibility;
    visibility[name] = true;
    this.setState({visibility});
  }

  private hideField(name: string) {
    const visibility = this.state.visibility;
    visibility[name] = false;
    this.setState({visibility});
  }
  /**
   * Render
   * @return {Node} Dom node
   */
  public render(): JSX.Element {
    const {errors} = this.props;
    const FormActions = lib.FormActions;
    const buttons = <FormActions
                  actions={this.actions}
                  onSubmit={(e) => {
                    e.preventDefault();
                    validate(this.toContract(), this.state.data)
                    .then(() => this.onSubmit(e, this.state.data))
                    .catch(this.failFormSubmission.bind(this));
                    }
                  }/>;
    const FormLayout = this.formLayout();

    const madeFields = {};

    Object.keys(this.fields)
      .filter(this.access.bind(this))
      .filter(this.isVisible.bind(this))
      .forEach((name) => {
        const field = this.fields[name];
        madeFields[name] = this.makeField(name, field);
    });

    return( < FormLayout
              actions={buttons}
              errors={errors}
              fields={madeFields}
              form={this.state.form}
              onSubmit = {this.onSubmit} /> );
  }
}

export default UiForm;
