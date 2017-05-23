// @flow
import React, {Component, Element} from 'react';
import ListRow from './ListRow';
import * as libs from '../libs';
import {Table, FormControl, Alert, Well,
  Modal, Row, Col} from 'react-bootstrap';
import UiForm from '../form/Form';
import {CrudConfig, DOMEvent, ListActions as ListActionsType,
  ListRow as ListRowType} from '../types';

let layouts, lib, Checkbox;

type FormData = {};

type Props = {
  access: {
    add?: (view: string, state: Object) => boolean,
    edit?: (view: string, state: Object) => boolean,
    view?: (view: string, state: Object) => boolean
  },
  actions: {
    add ? : (view: string, state: Object) => {},
    edit ? : (view: string, state: Object) => {},
    selectAllRows? : () => {},
    deselectAllRows? : () => {},
    setForm? : (view: string, row: ListRowType) => {};
    setModalState? :(view: string, show: boolean) => {};
  },
  form?: FormData,
  config: CrudConfig
};

type State = {
  search: string,
  rowUpdating: boolean,
  allToggled: boolean,
  selected: ListRowType[],
  showModal: boolean
};

/**
 * Create a list component
 */
class UiList extends Component {

  state: State
  columns: Object
  messages: Object
  close: () => {}
  filterRows: () => {}

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: Props) {
    super(props);
    const {config} = this.props;
    this.columns = config.list.columns;
    this.messages = config.messages;
    this.close = this.close.bind(this);
    this.filterRows = this.filterRows.bind(this);
    this.setLib(props);
    this.state = {
      search: '',
      selected: [],
      showModal: false,
      rowUpdating: false,
      allToggled: false
    };
  }

  componentWillReceiveProps(props: Props) {
    this.setLib(props);
  }

  /**
   * Set component names based on the supplied library name
   * @param {Object} newProps props
   */
  setLib(newProps) {
    const {config, library} = newProps;
    let libType = config.lib || library || 'reactBootstrap';
    lib = libs[libType];
    layouts = lib.listLayouts;
    Checkbox = lib.Checkbox;
  }

  /**
   * Toggle all select checkboxes
   * @param {Event} e .
   */
  toggleAll(e: Event) {
    const {actions = {}, data} = this.props;
    let {selected} = this.state;
    if (e.target.checked) {
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
   * Get the form's layout
   * @return {Dom} Dom node
   */
  listLayout() {
    const {layout} = this.props,
      layoutName = layout && layout[0].toUpperCase() + layout.slice(1);
    return layouts[layoutName] ? layouts[layoutName] : layouts.Default;
  }

  /**
   * A row is clicked - open a modal to edit it
   * @param {Event} e .
   * @param {Bool} checkType - should we check the event target's type
   * @param {Object} row Clicked list row's data
   */
  rowClick(e: DOMEvent, checkType: boolean = true, row: Object | null = null) {
    // Ignore the event if clicking on button etc in row
    const {actions = {}, config} = this.props,
      buttonTypes = ['checkbox', 'button', 'a'],
      isButtonIsh = buttonTypes.indexOf(e.target.type) !== -1;
    if (checkType && isButtonIsh) {
      return;
    }

    e.preventDefault();
    if (actions.setForm) {
      actions.setForm(config.view, row);
    }
    this.setState({showModal: true});
    if (actions.setModalState) {
      actions.setModalState(config.view, true);
    }
  }

  /**
   * Close the modal
   * @param {Event} e .
   */
  close(e: DOMEvent) {
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
  selectRow(row: ListRowType) {
    const {actions} = this.props;
    let {selected} = this.state;
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
  getPrimaryKey(): string {
    const {config} = this.props;
    return config.primary_key || 'id';
  }

  /**
   * Get the selected index for the given row
   * returns -1 if row not selected
   * @param {Object} row List row
   * @return {Number} index
   */
  selectedIndex(row: ListRowType): number {
    const {selected} = this.state,
    pk = this.getPrimaryKey();
    return selected.findIndex((r, index) => r[pk] === row[pk]);
  }
  /**
   * Is the row selected
   * @param {Object} row List row
   * @return {boolean}
   */
  isSelected(row: ListRowType): boolean {
    const pk = this.getPrimaryKey();
    return this.selectedIndex(row) !== -1;
  }

  /**
   * Deselect a row
   * @param {Object} row List row to deselect
   */
  deselectRow(row: ListRowType) {
    const {actions} = this.props,
      pk = this.getPrimaryKey();
    let {selected} = this.state;

    let i = this.selectedIndex(row);
    if (i !== -1) {
      selected = [
        ...selected.slice(0, i),
        ...selected.slice(i + 1)
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
  filterRows(row: Object): boolean {
    const {config} = this.props,
      pattern = new RegExp(this.state.search, 'i');
    let key,
      fields;
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
  handleUpdate(e: Event, state: {id: string} = {id: ''}) {
    const {actions, config, access} = this.props;
    this.setState({rowUpdating: true});
    if (state.id === '') {
      if (access.add) {
        actions.add(config.view, state);
      }
    } else {
      if (access.edit) {
        actions.edit(config.view, state);
      }
    }
  }

  /**
   * Handle the serach
   * @param {Event} e .
   */
  handleChange(e: DOMEvent) {
    this.setState({search: e.target.value});
  }

  /**
   * Render search field
   * @return {Dom} node
   */
  search(): Element<any> | null {
    const {config} = this.props;
    if (config.list.searchall) {
      return (<FormControl type="search"
        onChange={e => this.handleChange(e)}
        placeholder={config.list.searchall.label} />);
    }
    return null;
  }

  /**
   * Render
   * @return {Dom} Node
   */
  render(): Element<any> {
    let list,
      {data = [], errors, config, actions = {}, form = {}} = this.props,
      {selected} = this.state,
      ui = actions.ui,
      ListLayout = this.listLayout(),
      showModal;

    if (ui && ui.modals && ui.modals[config.view]) {
      showModal = ui.modals[config.view];
    } else {
      showModal = false;
    }
console.log('list render modal config', config, Checkbox);
    const rows = data.filter(this.filterRows),
      modal = (
        <Modal show={showModal} onHide={e => this.close(e)}
          container={this}
          aria-labelledby="add-modal-title">
          <UiForm layout="modal"
            onSubmit={(e, state) => this.handleUpdate(e, state)}
            errors={errors}
            data={form}
            formUpdate={actions.formUpdate}
            actions={{close: {
              action: this.close,
              label: 'Close',
              type: 'button'
            }}}
            config={config} />

        </Modal>
    )
    return <ListLayout
            modal={modal}
            data={data}
            listRow={(props) => {
              let {selected} = this.state,
                isSelected = this.isSelected(props.row);
              return <ListRow
                {...props}
                Checkbox={Checkbox}
                canSelect={this.props.canSelect}
                selected={isSelected}
                view={config.view}
                columns={this.columns}
                rowClick={this.rowClick.bind(this)}
                selectRow={this.selectRow.bind(this)}
                deselectRow={this.deselectRow.bind(this)} />
            }}
            toggleAll={this.toggleAll.bind(this)}
            search={this.search()}
            selected={selected}
            rows={rows}
            msg={this.messages.emptyData}
            {...this.props} />

  }
}

UiList.defaultProps = {
  canSelect: (row) => true,
  actions: []
};


export default UiList;
