

interface IListRow {
    [key: string]: any;
}

interface ITipConfig {
  position: string;
  content: (row: IListRow) => {__html: string};
  trigger?: string
}

interface ITipProps {
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

interface IFormErrors { [key: string]: string[] }

interface IFieldConfig {
    access?: {
        [key: string]: (field: IFieldConfig, data: IListRow) => boolean;
    };
    default: string;
    help?: string;
    id: string;
    key?: string;
    label: string;
    onChange?: (name: string, value: any) => void;
    placeholder?: string;
    pristine: boolean;
    type: string;
    vaidationState?: string;
    validate?: {
        key?: string;
        promises: [{
            rule: (value: string, row: IListRow, msg: () => string, arg : (value, row) => any | any | null ) => Promise<boolean>;
        }];
        msg: (value: string | number, data: IListRow) => string;
    }
    value: string;
}

interface IFormActionConfig {
    action: (e?: MouseEvent) => void;
    id: string;
    type: 'submit' | 'button';
    label?: string,
    _label?: (row: IListRow) => string;
    style?: string;
}

interface IFormActionsConfig {
    [key: string]: IFormActionConfig;
}

interface IFormConfig {
    _title?: (row: IListRow) => string;
    actions?: IFormActionsConfig;
    fields: {
        [key: string]: IFieldConfig;
    };
    title?: string;
}

interface IFormField {
    value: string;
    name: string;
    onChange: (name: string, data: any) => {};
    onBlur: (name: string) => void;
    field: IFieldConfig;
    row: IListRow;
}

interface IFormGroupProps {
    FieldComponent: string;
    errors: string[];
    field: IFieldConfig;
    validationState: string;
}

interface IFormLayout {
    actions: JSX.Element;
    errors: IFormErrors;
    fields: {
        [key: string] : JSX.Element | null;
    }
    form: IFormConfig;
    onSubmit: () => void;
}

interface IFormProps {
  actions: IFormActionsConfig;
  className?: string;
  config: {
    view: string;
    form: IFormConfig;
  };
  data: IListRow;
  errors: IFormErrors;
  formUpdate: (view: string, field: IFieldConfig, name: string, value: string | number) => void;
  layout: string;
  library?: 'reactstrap' | 'reactBootstrap';
  onSubmit: (e: MouseEvent, data: any) => void;
  title?: (row: IListRow) => string | string;
  visibility?: {
      [key: string]: boolean;
  };
}

// Specific field props
interface IFieldOption {
    value: string | number;
    [key: string]: string | number;
}

// -- Button Group
interface IFieldButtonGroup {
    field: {
        options: IFieldOption[]
    }
}

type FieldButtonGroup = IFormField & IFieldButtonGroup;

// -- Grid
type FieldLookup = IFormField & IFieldLookup;

interface IFieldGrid {
    field: {
        columns: Array<{label: string, type: string}>;
    }
}

// -- Lookup
interface IFieldLookup {
    field: {
        options: {
            optGroup?: string;
            key: string;
            label: string;
            optionFitler: (row: IListRow) => boolean;
            store: (row: IListRow) => any;
        };
        
    }
}

type FieldGrid = IFormField & IFieldGrid;

// -- Radio
interface IFieldRadio {
    field: {
        options: IFieldOption[]
    }
}

type FieldRadio = IFormField & IFieldRadio;

// -- Select

interface IFieldSelect {
    field: {
        options: IFieldOption;
    }
}

type FieldSelect = IFormField & IFieldSelect;

// -- Upload
interface IFieldUpload {
    field: {
        multiple?: boolean;
    },
    value: Array<{
        type: string;
        preview: string;
        name: string;
    }>
}

type FieldUpload = IFormField & IFieldUpload;
// LISTS

interface IListAction {
  id: string;
  visible: (user: any, selected: IListRow) => boolean;
  render: string;
}

interface IListActions { [key: string]: IListAction }

interface IListActionsProps {
  actions: IListActions;
  user: any;
  selected: IListRow[];
  config: ICrudConfig;
  rowClick: (e: MouseEvent, clicked: boolean) => void;
  showModal: () => void;
}

interface IListColumns {
  [key: string]: {
      Checkbox: (any) => JSX.Element;
        class?: string;
        config?: any;
        id?: string;
        label?: string;
        render: (any) => JSX.Element;
        tip?: ITipConfig;
  };
}

interface IListConfig {
  actions: IListActions[];
  columns: IListColumns;
  searchall: {
    label: string;
    like: string[];
  };
}

interface ICrudConfig {
    form: IFormConfig;
    list: IListConfig;
    messages: { [key: string]: string };
    primary_key?: string;
    view: string;
}

interface IListProps {
    access: {
        add?: (view: string, state: any) => boolean;
        edit?: (view: string, state: any) => boolean;
        view?: (view: string, state: any) => boolean;
    };
    actions: {
        add? : (view: string, state: any) => void;
        deselectRow?: (row: IListRow) => void;
        edit? : (view: string, state: any) => void;
        selectAllRows? : () => void;
        selectRow?: (row: IListRow) => void;
        deselectAllRows? : () => void;
        formUpdate?: () => void;
        setForm? : (view: string, row: IListRow) => void;
        setModalState? :(view: string, show: boolean) => void;
        ui?: {
            modals: {
                [key: string]: boolean
            }
        }
    };
    canSelect: (row: IListRow) => boolean;
    config: ICrudConfig;
    data: IListRow[];
    errors: IFormErrors;
    form?: FormData;
    layout?: string;
}

interface IListRowProps {
  actions: IListActions;
  canSelect: (row: IListRow) => void;
  Checkbox: (any) => JSX.Element;
  columns: IListColumns;
  deselectRow: (row: IListRow) => void;
  onClick: any;
  row: IListRow;
  selected: boolean;
  selectRow: (row: IListRow) => void;
  view: string;
}