// @flow
import React, {Component, Element} from 'react';
import ListRow from './ListRow';
import {Table, FormControl, Alert, Well,
  Checkbox, Modal, Row, Col} from 'react-bootstrap';
import UiForm from '../form/Form';
import ListActions from './ListActions';
import {CrudConfig, DOMEvent, ListActions as ListActionsType,
  ListRow as ListRowType,
  User} from '../types';

type Props = {
  access: {
    add: boolean,
    edit: boolean,
    view: boolean
  },
  actions: ListActionsType,
  form: Object,
  user: User,
  selected: Object[],
  config: CrudConfig
};

type State = {
  search: string,
  rowUpdating: boolean,
  allToggled: boolean,
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
    this.state = {
      search: '',
      showModal: false,
      rowUpdating: false,
      allToggled: false
    };
  }

  /**
   * Toggle all select checkboxes
   * @param {Event} e .
   */
  toggleAll(e: Event) {
    const {actions} = this.props;
    if (e.target.checked) {
      this.setState({allToggled: true});
      actions.selectAllRows();
    } else {
      this.setState({allToggled: false});
      actions.deselectAllRows();
    }
  }

  /**
   * A row is clicked - open a modal to edit it
   * @param {Event} e .
   * @param {Bool} checkType - should we check the event target's type
   * @param {Object} row Clicked list row's data
   */
  rowClick(e: DOMEvent, checkType: boolean = true, row: Object | null = null) {
    // Ignore the event if clicking on button etc in row
    const {actions, config} = this.props,
      buttonTypes = ['checkbox', 'button', 'a'],
      isButtonIsh = buttonTypes.indexOf(e.target.type) !== -1;
    if (checkType && isButtonIsh) {
      return;
    }

    e.preventDefault();
    actions.setForm(config.view, row);
    this.setState({showModal: true});
    actions.setModalState(config.view, true);
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
    actions.setModalState(config.view, false);
  }

  /**
   * Build the list's headings
   * @return {Array} Hedings
   */
  headings(): Element<any>[] {
    const columnNames = Object.keys(this.columns),
      headings = columnNames.map((heading: string, key: number): Element<any> => {
        let th = this.columns[heading];
        return (<th key={th.id} className={th.class}>
          {th.label}
        </th>);
      });
    headings.unshift(<th key="select-all">
        <Checkbox data-action="check-all" onClick={e => this.toggleAll(e)} />
      </th>);
    return headings;
  }

  /**
   * Build the list's rows
   * @return {Array.Dom} Rows
   */
  rows(): Element<any>[] {
    const {data, selected, actions, config} = this.props;
    let rows = data.filter(this.filterRows)
    .map((row: ListRowType, key: number) => {
      let res = selected.find(sel => sel.id === row.id),
        isSelected = res === undefined ? false : true;
      return <ListRow key={key} row={row}
              onClick={e => this.rowClick(e, true, row)}
              selected={isSelected} columns={this.columns}
              view={config.view} actions={actions} />;
    });
    return rows;
  }

  /**
   * Filter rows based on list search all
   * @param {Object} row To test
   * @return {Bool} OK to show
   */
  filterRows(row: Object): boolean {
    const {config} = this.props;
    let key,
      pattern = new RegExp(this.state.search, 'i'),
      fields;
    if (!config.list.searchall || !config.list.searchall.like) {
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
      return (<FormControl type="search" onChange={e => this.handleChange(e)}
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
      {user, selected, data, errors, config, actions, form} = this.props,
      ui = actions.ui,
      showModal;

    if (ui && ui.modals && ui.modals[config.view]) {
      showModal = ui.modals[config.view];
    } else {
      showModal = false;
    }

    const headings = this.headings(),
      rows = this.rows(),
      search = this.search(),
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
          ),
      header = (
      <Row>
          <Col md={8}>
            <ListActions rowClick={this.rowClick.bind(this)}
              user={user} selected={selected}
              actions={actions} config={config} />
          </Col>
          <Col md={4}>{search}</Col>
          </Row>
      );
    if (data.length > 0) {
      list = (<div>
              {header}
              <Table responsive>
              <thead>
                <tr>
                  {headings}
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
              </Table>

              {modal}
          </div>);
    } else {
      list = (<div>
          {header}
           <Well><Alert bsStyle="info">
          {this.messages.emptyData}
          </Alert>
          </Well>
          {modal}
          </div>);
    }

    return list;
  }
}

export default UiList;
