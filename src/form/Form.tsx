import * as deepEqual from 'deep-equal';
import * as React from 'react';
import { Component } from 'react';
import uuid from 'uuid';
import validate from 'validate-promise';
import { IFieldConfig, IFormActionsConfig, IFormConfig, IFormErrors, IFormProps, IListRow, IUser } from '../interfaces';
import * as libs from '../libs';

let lib;
let fields;
let FormControl;
let layouts;
let Button;

interface IState {
  data: IListRow;
  errors: IFormErrors;
  form: IFormConfig;
  initialState: any;
  state: any;
  visibility: {
    [key: string]: boolean;
  };
}

/**
 * Create a form
 */
class UiForm extends Component<IFormProps, IState> {

  private fields: { [key: string]: IFieldConfig };
  private actions: IFormActionsConfig;
  private onSubmit: (e: MouseEvent, data: any) => void;

  public static defaultProps: Partial<IFormProps> = {
    data: {},
    errors: {},
    layout: 'reactstrap',
  };

  /**
   * Constructor
   * @param {Object} props props
   */
  constructor(props: IFormProps) {
    super(props);
    const { config, library, onSubmit } = this.props;
    this.fields = config.form.fields;
    const formState = {};

    Object.keys(props.errors).forEach((key) => formState[key] = 'error');
    const values = {};
    Object.keys(this.fields).forEach((key) => {
      const field = this.fields[key];
      field.pristine = true;
      values[key] = field.value || '';
    });

    // Merge config field.values into props.data
    const data = this.makeState({ ...values, ...props.data });
    const state = {
      data,
      errors: props.errors,
      form: config.form,
      initialState: { ...data },
      state: formState,
      visibility: this.makeVisiblity(),
    };
    this.setLib(props);
    this.actions = config.form.actions;
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = onSubmit.bind(this);
    state.form = this.createFormData(state.form, state.data);
    this.state = state;
  }

  /**
   * Will receive new props componentDidUpdate
   * @param {Object} prevProps Props
   */
  public componentDidUpdate(prevProps: IFormProps) {
    if (!deepEqual(this.props, prevProps)) {
      const { config, data, errors } = this.props;
      this.fields = config.form.fields;
      const state = {};
      const visibility = this.makeVisiblity();
      const newState: any = {};
      Object.keys(errors).forEach((key) => state[key] = 'error');
      let { form } = this.state;
      newState.data = this.makeState(data);
      form = this.createFormData(form, data);
      this.setLib(this.props);
      this.setState({ ...newState, state, initialState: { ...newState.data }, errors, form, visibility });
    }
  }

  /**
   * Make field visiblity state from props
   * @return {Object} field visibility
   */
  private makeVisiblity() {
    const { visibility = {} } = this.props;
    Object.keys(this.fields).forEach((key) => {
      if (!visibility.hasOwnProperty(key)) {
        visibility[key] = true;
      }
    });
    return visibility;
  }

  /**
   * Set component names based on the supplied library name
   * @param {Object} newProps props
   */
  private setLib(newProps) {
    const { config, library } = newProps;
    const libType = config.lib || library || 'reactstrap';
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
   * @return {Object} New form state
   */
  private createFormData(form, row: IListRow) {
    let name;
    const { title } = this.props;
    if (title) {
      form.title = typeof (title) === 'function' ? title(row) : title;
    }

    for (name in form.actions) {
      if (typeof (form.actions[name].label) === 'function') {
        form.actions[name].label = form.actions[name].label(row);
      }
    }
    return form;
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
    const { errors } = this.state;
    const state = { ...this.state.state };
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
          this.setState({ state, errors });
        })
        .catch((err: string) => {
          errors[name] = [err];
          state[name] = 'error';
          this.setState({ state, errors });
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

    this.setState({ state, errors });
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
    const { formUpdate, config } = this.props;
    const field = this.fields[name];
    this.fields[name].pristine = false;
    if (typeof formUpdate === 'function') {
      formUpdate(config.view, field, name, value);
    }
    const data = this.state.data;
    data[name] = value;
    this.setState({ data });

    // Trigger any on change specified in config file.
    if (field.onChange) {
      field.onChange(this);
    }
  }

  /**
   * Get the form's layout
   * @return {Dom} Dom node
   */
  private formLayout() {
    const { layout } = this.props;
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
    const { errors } = this.state;
    const error = errors[name] || [];
    const FormGroup = lib.FormGroup;
    const FieldComponent = this.getReactField(field);
    if (FieldComponent === null) {
      return null;
    }
    return <FormGroup
      key={name}
      errors={error}
      FieldComponent={FieldComponent}
      field={field}
      name={name}
      row={this.state.data}
      onBlur={this.handleBlur}
      onChange={(fieldName, value) => this.handleChange(fieldName, value)}
      value={this.state.data[name] || field.value || ''}
      validationState={this.state.state[name]} />;
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
    this.setState({ state, errors });
  }

  /**
   * Is a field visible
   * @param {string} name Field key
   * @return {boolean}
   */
  private isVisible(name: string) {
    return this.state.visibility[name];
  }

  /**
   * Show a field
   * @param {string} name Field key
   */
  private showField(name: string) {
    const visibility = this.state.visibility;
    visibility[name] = true;
    this.setState({ visibility });
  }

  /**
   * Hide a field
   * @param {string} name Field key
   */
  private hideField(name: string) {
    const visibility = this.state.visibility;
    visibility[name] = false;
    this.setState({ visibility });
  }

  /**
   * Reset the form to its initial state and set fields
   * back to pristine
   */
  private reset() {
    const data = { ...this.state.initialState };
    this.setState({
      data,
    });
    Object.keys(this.fields).forEach((key) => {
      this.fields[key].pristine = true;
    });
    this.setState({
      form: this.createFormData(this.state.form, data),
    });
  }

  /**
   * Render
   * @return {Node} Dom node
   */
  public render(): JSX.Element {
    const { errors } = this.props;
    const FormActions = lib.FormActions;
    const buttons = <FormActions
      actions={this.actions}
      form={this}
      onSubmit={(e) => {
        e.preventDefault();
        validate(this.toContract(), this.state.data)
          .then(() => {
            this.onSubmit(e, this.state.data);
            this.reset();
          })
          .catch(this.failFormSubmission.bind(this));
      }
      } />;
    const FormLayout = this.formLayout();

    const madeFields = {};

    Object.keys(this.fields)
      .filter(this.access.bind(this))
      .filter(this.isVisible.bind(this))
      .forEach((name) => {
        const field = this.fields[name];
        const madeField = this.makeField(name, field);
        if (madeField !== null) {
          madeFields[name] = madeField;
        }
      });

    return (<FormLayout
      actions={buttons}
      errors={errors}
      fields={madeFields}
      form={this.state.form}
      onSubmit={this.onSubmit} />);
  }
}

export default UiForm;
