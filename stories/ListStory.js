import * as React from 'react';
import { Component } from 'react';
import { Modal } from 'reactstrap';
import { Form, List, listActions, ListFilters } from '../src';
import config from './config';
import PageSize from '../src/libs/reactstrap/list/PageSize';
import Paginator from '../src/libs/reactstrap/list/Paginator';


class ListStory extends Component {

  constructor(props) {
    super(props);
    const data = [
      { custom_id: '1', label: 'label 1', claimed: false },
      { custom_id: '2', label: 'label 2', claimed: true },
      { custom_id: '3', label: 'label 3', claimed: false },
      { custom_id: '4', label: 'label 4', claimed: true },
      { custom_id: '5', label: 'label 5', claimed: false },
      { custom_id: '6', label: 'label 6', claimed: true },
      { custom_id: '7', label: 'label 7', claimed: false },
      { custom_id: '8', label: 'label 8', claimed: true },
      { custom_id: '9', label: 'label 9', claimed: false },
      { custom_id: '10', label: 'label 10', claimed: true },
      { custom_id: '11', label: 'label 11', claimed: false },
      { custom_id: '12', label: 'label 12', claimed: true },
      { custom_id: '13', label: 'label 13', claimed: false },
      { custom_id: '14', label: 'label 14', claimed: true },
      { custom_id: '15', label: 'label 15', claimed: false },
      { custom_id: '16', label: 'label 16', claimed: true },
      { custom_id: '17', label: 'label 17', claimed: false },
      { custom_id: '18', label: 'label 18', claimed: true },
    ];
    this.state = {
      data,
      pagination: {
        total: data.length,
        limit: 10,
        offset: 0,
      }
    };
  }


  render() {
    const { data, pagination } = this.state;

    const viewData = data.slice(pagination.offset * pagination.limit, (pagination.offset + 1) * pagination.limit)

    return <List
      canSelect={() => true}
      config={config}
      data={viewData}
      buttons={(props) => {
        const { Del, Add, Edit, Toggle } = listActions.reactstrap;
        return <div>
          <Del del={(selected) => {
            const ids = selected.map((d) => d.custom_id);
            const dx = this.state.data.filter((row) => ids.indexOf(row.custom_id) === -1);
            this.setState({ data: dx });
          }}
            selected={props.selected} />
          <Add showAddModal={props.showAddModal} />
          <Edit showModal={props.showModal}
            selected={props.selected} />
          <Toggle
            label="User"
            update={(userSelected) => {
              console.log('update', userSelected);
            }}
            selected={props.selected}
            icon="user" />
        </div>;
      }}>
      {({ actions, handleUpdate, selected, showModal, close }) =>
        <div>
          <Modal isOpen={showModal} toggle={close}>
            <Form
              actions={{
                close: {
                  action: close,
                  id: 'modal-close',
                  label: 'Close',
                  type: 'button',
                },
              }}
              data={selected}
              formUpdate={actions.formUpdate}
              layout="Modal"
              config={config}
              onSubmit={(e, state) => {
                if (!handleUpdate(e, state)) {
                  return;
                }
                const newData = [...this.state.data];
                newData.push(state);
                this.setState({ data: newData });
                close();
              }}
            />
          </Modal>
          <Paginator
            pagination={pagination}
            setPagination={(p) => this.setState({ pagination: p })} />
          <PageSize
            pagination={pagination}
            setPagination={(p) => this.setState({ pagination: p })} />
          <ListFilters
            config={config} />
        </div>
      }
    </List>;
  }
}

export default ListStory;
