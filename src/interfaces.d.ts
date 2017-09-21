export type TSortDirection = 'ASC' | 'DESC';
export interface IUser {
  [key: string]: any;
}

export interface IListRow {
  [key: string]: any;
}

export interface ITipConfig {
  position: string;
  content: (row: IListRow) => { __html: string };
  trigger?: string
}

export interface ITipProps {
  children?: any;
  config: ITipConfig;
  row: IListRow;
  icon?: string;
  color?: string;
  label?: string;
  pull?: string;
  size?: 0 | 1 | 2 | 3 | 4 | 5;
  stack?: number;
  inverse?: boolean;
  spin?: boolean
}

interface IFilterProps {
  field: any;
  name: string;
  onBlur: (name: string, value: any) => void;
  value: any;
}

export interface IIconProps {
  icon?: string;
  color?: 'muted' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | '';
  label?: string;
  pull?: string;
  size?: 0 | 1 | 2 | 3 | 4 | 5;
  stack?: number;
  inverse?: boolean;
  spin?: boolean
}

export interface IFormErrors { [key: string]: string[] }

export type defaultFunction = (row: IListRow, field: IFieldConfig) => string;
export type labelFunction = (row: IListRow) => string;

export interface IFieldConfig {
  access?: {
    [key: string]: (field: IFieldConfig, data: IListRow) => boolean;
  };
  columns?: any[];
  default?: string | defaultFunction;
  help?: string;
  id: string;
  key?: string;
  label?: string | labelFunction;
  onChange?: (form: any) => void;
  options?: IFieldLookupOptions | IFieldOption[];
  placeholder?: string;
  pristine?: boolean;
  size?: 'lg' | 'sm';
  type: string;
  vaidationState?: string;
  validate?: {
    key?: string;
    promises: [{
      rule: (value: string, row: IListRow, msg: () => string, arg: (value, row) => any | any | null) => Promise<boolean>;
    }];
    msg: (value: string | number, data: IListRow) => string;
  }
  value?: any;
}

export interface IFormActionConfig {
  action?: (form: any) => void;
  id: string;
  type: 'submit' | 'button';
  label?: string | labelFunction;
  style?: string;
}

export interface IFormActionsConfig {
  [key: string]: IFormActionConfig;
}

export interface IFormConfig {
  actions?: IFormActionsConfig;
  fields: {
    [key: string]: IFieldConfig;
  };
  title?: string | labelFunction;
}

export interface IFormField {
  field: IFieldConfig;
  name: string;
  onBlur: (name: string) => void;
  onChange: (name: string, data: any) => void;
  row: IListRow;
  value: string;
}

export interface IFormGroupProps {
  FieldComponent: string;
  errors: string[];
  field: IFieldConfig;
  validationState: string;
}

export interface IFormLayout {
  actions: JSX.Element;
  errors: IFormErrors;
  fields: {
    [key: string]: JSX.Element | null;
  }
  form: IFormConfig;
  onSubmit: () => void;
}

export type FormUpdate = (view: string, field: IFieldConfig, name: string, value: string | number) => void;

export interface IFormProps {
  actions?: IFormActionsConfig;
  className?: string;
  config: {
    view: string;
    form: IFormConfig;
  };
  data: IListRow;
  errors?: IFormErrors;
  formUpdate: FormUpdate;
  layout?: string;
  library?: 'reactstrap' | 'reactBootstrap';
  onSubmit: (e: MouseEvent, data: any) => void;
  title?: (row: IListRow) => string | string;
  visibility?: {
    [key: string]: boolean;
  };
}

// Specific field props
export interface IFieldOption {
  value: string | number;
  [key: string]: string | number;
}

// -- Button Group
export interface IFieldButtonGroup {
  field: {
    options: IFieldOption[]
  }
}

export type FieldButtonGroup = IFormField & IFieldButtonGroup;

// -- Grid
export type FieldLookup = IFormField & IFieldLookup;

export interface IFieldGrid {
  field: {
    columns: Array<{ label: string, type: string }>;
  }
}

export interface IFieldLookupOptions {
  default?: (row, field) => any;
  observe?: number[];
  optGroup?: string;
  key: string;
  label: string;
  optionFitler?: (row: IListRow) => boolean;
  store: (row: IListRow, props?: any) => any;
}

// -- Lookup
export interface IFieldLookup {
  field: {
    optGroup?: string;
    options: IFieldLookupOptions;
  }
}

export type FieldGrid = IFormField & IFieldGrid;

// -- Radio
export interface IFieldRadio {
  field: {
    options: IFieldOption[]
  }
}

export type FieldRadio = IFormField & IFieldRadio;

// -- Select

export interface IFieldSelect {
  field: {
    options: IFieldOption[];
  }
}

export type FieldSelect = IFormField & IFieldSelect;

// -- Upload
export interface IFieldUpload {
  field: {
    multiple?: boolean;
  },
  value: Array<{
    type: string;
    preview: string;
    name: string;
  }>
}

export type FieldUpload = IFormField & IFieldUpload;

// LISTS

export interface IListAction {
  id: string;
  visible: (user: IUser, selected: IListRow) => boolean;
  render: string;
  config?: {
    [key: string]: any
  };
}

export interface IListActions { [key: string]: IListAction }

export interface IListColumns {
  [key: string]: {
    Checkbox?: (any) => JSX.Element;
    class?: string;
    config?: any;
    id?: string;
    label?: string;
    render?: (any) => JSX.Element;
    tip?: ITipConfig;
  };
}

export interface IFilter {
  type: 'select';
}

export interface IListConfig {
  columns: IListColumns;
  filters?: {
    [key: string]: IFilter;
  };
  searchall: {
    label: string;
    like: string[];
  };
}

export interface ICrudConfig {
  form: IFormConfig;
  list?: IListConfig;
  messages?: { [key: string]: string };
  primary_key?: string;
  view: string;
  lib: 'reactstrap' | 'reactBootstrap';
}

export interface IFormModalProps {
  actions: {
    formUpdate: FormUpdate;
  };
  close: () => void;
  errors: IFormErrors;
  form: FormData;
  handleUpdate: (e: Event, state: FormData) => void;
  showModal: () => void;
}

export interface IPagination {
  total: number;
  limit: number;
  offset: number;
}

export interface IListProps {
  access?: {
    add?: (view: string, state: any) => boolean;
    edit?: (view: string, state: any) => boolean;
    view?: (view: string, state: any) => boolean;
  };
  buttons: (props: any) => JSX.Element | null;
  actions?: {
    add?: (view: string, state: any) => void;
    deselectRow?: (row: IListRow) => void;
    edit?: (view: string, state: any) => void;
    selectAllRows?: () => void;
    selectRow?: (row: IListRow) => void;
    deselectAllRows?: () => void;
    formUpdate?: () => void;
    setForm?: (view: string, row: IListRow) => void;
    setModalState?: (view: string, show: boolean) => void;
    ui?: {
      modals: {
        [key: string]: boolean
      }
    };
    update?: (view: string, selected: IListRow[], update: { [key: string]: any }) => void;
  };
  canSelect: (row: IListRow) => boolean;
  children?: (IFormModalProps) => any;
  config: ICrudConfig;
  data: IListRow[];
  getData: (pagination: IPagination) => IListRow[];
  layout?: string;
  pagination: IPagination;
}

export interface IListRowProps {
  actions: IListActions;
  canSelect: (row: IListRow) => void;
  Checkbox: (any) => JSX.Element;
  columns: IListColumns;
  deselectRow: (row: IListRow) => void;
  onClick: any;
  row: IListRow;
  rowClick: (row: IListRow) => void;
  selected: boolean;
  selectRow: (row: IListRow) => void;
  view: string;
}

export interface IListFilterProps {
  config: ICrudConfig
}