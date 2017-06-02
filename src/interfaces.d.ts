
// interface ITipProps {
//     icon?: string;
//     color?: string;
//     label?: string;
//     pull?: string;
//     size?: 0 | 1 | 2 | 3 | 4 | 5;
//     stack?: number;
//     inverse?: boolean;
//     spin?: boolean
// }

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
    type: 'text';
    vaidationState?: string;
    validate: {
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
    onBlur: () => void;
    field: IFieldConfig;
}

interface IFormGroupProps {
    FieldComponent: JSX.Element;
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
  onSubmit: Function;
  title?: (row: IListRow) => string | string;
  visibility?: {
      [key: string]: boolean;
  };
}

// Specific field props

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

type FieldLookup = IFormField & IFieldLookup;
// LISTS

interface IListAction {
  id: string;
  visible: (user: any, selected: IListRow) => boolean;
  render: () => JSX.Element
}

interface IListActions { [key: string]: IListAction }

interface IListActionsProps {
  actions: IListActions;
  user: any;
  selected: IListRow[];
  config: ICrudConfig;
  rowClick: Function;
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
  canSelect: Function;
  Checkbox: (any) => JSX.Element;
  columns: IListColumns;
  deselectRow: Function;
  onClick: any;
  row: IListRow;
  selected: boolean;
  selectRow: Function;
  view: string;
}