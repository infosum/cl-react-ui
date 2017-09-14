import * as React from 'react';
import { Component } from 'react';
import { Modal } from 'reactstrap';
import { Form, List, listActions, ListFilters } from '../src';
import config from './config';



class ListStory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { custom_id: '1', label: 'label 1', claimed: false },
        { custom_id: '2', label: 'label 2', claimed: true },
      ],
    };
  }
  render() {
    const { data } = this.state;
    return <List
      canSelect={() => true}
      config={config}
      data={data}
      buttons={(props) => {
        const { Del, Add, Edit, Toggle } = listActions.reactstrap;
        return <div>
          <Del del={(view, selected) => {
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
          <ListFilters
            config={config} />
        </div>
      }
    </List>;
  }
}

export default ListStory;
