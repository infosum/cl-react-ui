export type ListAction = {
  id: string,
  visible: boolean,
  render: React$Element
};

export type ListRow = Object;

export type ListActions = { [key: string]: ListAction };

export type ListColumns = {
  [key: string]: {
    class?: string,
    config?: Object,
    id?: string,
    label?: string,
    render: React$Element,
    tip?: TipConfig
  }
};

export type ListConfig = {
  actions: ListActions,
  columns: ListColumns,
  searchall: {
    label: string,
    like: string[]
  }
};

export type CrudConfig = {
  form: FormConfig,
  list: ListConfig,
  messages: { [key: string]: string },
  view: string
};

export type FormFieldOption = Object;

export type FormFieldProps = {
  value: string,
  name: string,
  onChange: Function,
  onBlur: Function,
  field: {
    help?: string,
    id: string,
    label: string,
    placeholder?: string,
    pristine: boolean,
    type: 'text',
    vaidationState?: string,
    validate: *[],
    value: string
  }
};

export type DOMEvent = ElementEvent<HTMLInputElement>;

export type TipConfig = {
  position: string,
  content: (row: ListRow) => UnsafeHTML,
  trigger?: string
};
