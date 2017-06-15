/// <reference path="../interfaces.d.ts" />
import * as React from 'react';
import {Component} from 'react';
import UiForm from '../form/Form';
import * as libs from '../libs';
import ListRow from './ListRow';

let layouts;
let lib;
let Checkbox: (props: any) => any;
let FormControl;

interface IState {
  search: string;
  rowUpdating: boolean;
  allToggled: boolean;
  selected: IListRow[];
  showModal: boolean;
}

/**
 * Create a list component
 */
class UiList extends Component<IListProps, IState> {

  public static defaultProps: Partial<IListProps> = {
    actions: {},
    canSelect: (row) => true,
  };

  private columns: IListColumns;
  private messages: any;

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: IListProps) {
    super(props);
    const {config} = this.props;
    this.columns = config.list.columns;
    this.messages = config.messages;
    this.close = this.close.bind(this);
    this.filterRows = this.filterRows.bind(this);
    this.setLib(props);
    this.state = {
      allToggled: false,
      rowUpdating: false,
      search: '',
      selected: [],
      showModal: false,
    };
  }

  public componentWillReceiveProps(props: IListProps) {
    this.setLib(props);
  }

  /**
   * Set component names based on the supplied library name
   * @param {Object} newProps props
   */
  private setLib(newProps) {
    const {config, library} = newProps;
    const libType = config.lib || library || 'reactBootstrap';
    lib = libs[libType];
    layouts = lib.listLayouts;
    Checkbox = lib.Checkbox;
    FormControl = lib.FormControl;
  }

  /**
   * Toggle all select checkboxes
   * @param {Event} e .
   */
  private toggleAll(e: MouseEvent) {
    const {actions = {}, data} = this.props;
    let {selected} = this.state;
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.setState({allToggled: true});
      selected = [...data];
      if (actions.selectAllRows) {
        actions.selectAllRows();
      }
    } else {
      selected = [];
      this.setState({allToggled: false});
      if (actions.deselectAllRows) {
        actions.deselectAllRows();
      }
    }
    this.setState({selected});
  }

  /**
   * Get the lists's layout
   * @return {Dom} Dom node
   */
  private listLayout() {
    const {layout} = this.props;
    let layoutName;
    if (layout === null) {
      layoutName = 'reactstrap';
    } else {
      layoutName = layout && layout[0].toUpperCase() + layout.slice(1);
    }
    return layouts[layoutName] ? layouts[layoutName] : layouts.Default;
  }

  /**
   * A row is clicked - open a modal to edit it
   * @param {Event} e .
   * @param {Bool} checkType - should we check the event target's type
   * @param {Object} row Clicked list row's data
   */
  private rowClick(e: MouseEvent, checkType: boolean = true, row: IListRow) {
    // Ignore the event if clicking on button etc in row
    const {actions = {}, config} = this.props;
    const buttonTypes = ['checkbox', 'button', 'a'];
    const target = e.target as HTMLButtonElement;
    const isButtonIsh = buttonTypes.indexOf(target.type) !== -1;
    if (checkType && isButtonIsh) {
      return;
    }

    e.preventDefault();
    if (actions.setForm) {
      actions.setForm(config.view, row);
    }
    this.showModal();
    if (actions.setModalState) {
      actions.setModalState(config.view, true);
    }
  }

  private showModal() {
    this.setState({showModal: true});
  }

  /**
   * Close the modal
   * @param {Event} e .
   */
  private close(e: MouseEvent) {
    if (e) {
      // Clicking on background doesn't pass in an event
      e.preventDefault();
    }
    this.setState({showModal: false});
    const {actions, config} = this.props;
    if (actions.setModalState) {
      actions.setModalState(config.view, false);
    }
  }

  /**
   * Select a row
   * @param {Object} row List row to deselect
   */
  private selectRow(row: IListRow) {
    const {actions} = this.props;
    const {selected} = this.state;
    selected.push(row);
    this.setState({selected});
    if (actions.selectRow) {
      actions.selectRow(row);
    }
  }

  /**
   * Get primary key's name
   * @return string
   */
  private getPrimaryKey(): string {
    const {config} = this.props;
    return config.primary_key || 'id';
  }

  /**
   * Get the selected index for the given row
   * returns -1 if row not selected
   * @param {Object} row List row
   * @return {Number} index
   */
  private selectedIndex(row: IListRow): number {
    const {selected} = this.state;
    const pk = this.getPrimaryKey();
    return selected.findIndex((r, index) => r[pk] === row[pk]);
  }
  /**
   * Is the row selected
   * @param {Object} row List row
   * @return {boolean}
   */
  private isSelected(row: IListRow): boolean {
    const pk = this.getPrimaryKey();
    return this.selectedIndex(row) !== -1;
  }

  /**
   * Deselect a row
   * @param {Object} row List row to deselect
   */
  private deselectRow(row: IListRow) {
    const {actions} = this.props;
    const pk = this.getPrimaryKey();
    let {selected} = this.state;

    const i = this.selectedIndex(row);
    if (i !== -1) {
      selected = [
        ...selected.slice(0, i),
        ...selected.slice(i + 1),
      ];
    }

    this.setState({selected});
    if (actions.deselectRow) {
      actions.deselectRow(row);
    }
  }

  /**
   * Filter rows based on list search all
   * @param {Object} row To test
   * @return {Bool} OK to show
   */
  private filterRows(row: Object): boolean {
    const {config} = this.props;
    const pattern = new RegExp(this.state.search, 'i');
    let key;
    let fields;
    if (!config.list.searchall || !config.list.searchall.like || this.state.search === '') {
      return true;
    }
    fields = config.list.searchall.like;
    for (key in row) {
      if (row.hasOwnProperty(key) && typeof row[key] === 'string') {
        if (fields.indexOf(key) !== -1 && row[key].match(pattern)) {
          return true;
        }
      }
    }
    return false;
  }

/**
 * Update or add a row
 * @param {Event} e .
 * @param {Object} state New state
 */
  private handleUpdate(e: Event, state: {id: string} = {id: ''}) {
    const {actions, config, access} = this.props;
    this.setState({rowUpdating: true});
    const pk = this.getPrimaryKey();
    if (!actions) {
      return;
    }
    if (state[pk] === '' || state[pk] === undefined) {
      if (this.can('add')) {
        actions.add(config.view, state);
      }
    } else {
      if (this.can('edit')) {
        actions.edit(config.view, state);
      }
    }
  }

  /**
   * Check access props to determine if a task can be performed
   * @param {string} task .
   * @return {boolean}
   */
  private can(task: string) {
    const {access} = this.props;
    if (!access) {
      return true;
    }
    if (access[task] && access[task] !== undefined) {
       return access[task];
     }
    return false;
  }

  /**
   * Handle the serach
   * @param {Event} e .
   */
  private handleChange(e: MouseEvent) {
    const target = e.target as HTMLInputElement;
    this.setState({search: target.value});
  }

  /**
   * Render search field
   * @return {Dom} node
   */
  private search(): JSX.Element | null {
    const {config} = this.props;
    if (config.list.searchall) {
      return (<FormControl type="search"
        onChange={(e) => this.handleChange(e)}
        placeholder={config.list.searchall.label} />);
    }
    return null;
  }

  /**
   * Update a set of rows with new values. Simply calls actions.update which should
   * handle the update
   * @param {Array} selected List rows
   * @param {Object} update Data to update
   */
  private updateRows(selected: IListRow[], update: {[key: string]: any}) {
    const {actions, config} = this.props;
    this.setState({rowUpdating: true});
    if (!actions || !actions.update) {
      return;
    }
    actions.update(config.view, selected, update);
  }

  /**
   * Render
   * @return {Dom} Node
   */
  public render(): JSX.Element {
    const {data = [], config, actions = {}, layout} = this.props;
    const {selected} = this.state;
    const ui = actions.ui;
    const ListLayout = this.listLayout();
    let showModal;

    if (ui && ui.modals && ui.modals[config.view]) {
      showModal = ui.modals[config.view];
    } else {
      showModal = this.state.showModal;
    }

    const rows = data.filter(this.filterRows);

    const formModalProps = {
      actions: {
        formUpdate: actions.formUpdate,
      },
      close: this.close,
      handleUpdate: this.handleUpdate,
      showModal,
    };
    return <div>
            <ListLayout
              data={data}
              listRow={(props) => {
                const rowSelected = this.state.selected;
                const isSelected = this.isSelected(props.row);
                return <ListRow
                  {...props}
                  Checkbox={Checkbox}
                  canSelect={this.props.canSelect}
                  selected={isSelected}
                  view={config.view}
                  columns={this.columns}
                  rowClick={this.rowClick.bind(this)}
                  selectRow={this.selectRow.bind(this)}
                  deselectRow={this.deselectRow.bind(this)} />;
              }}
              toggleAll={this.toggleAll.bind(this)}
              showModal={this.showModal.bind(this)}
              search={this.search()}
              selected={selected}
              rows={rows}
              update={this.updateRows.bind(this)}
              msg={this.messages.emptyData}
              {...this.props}>
            </ListLayout>
          {this.props.children(formModalProps)}
          </div>;

  }
}

export default UiList;
