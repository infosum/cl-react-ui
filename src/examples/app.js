import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Form, List, listActions, ListFilters, validations } from '../index';
import config from './config';
import configToggleGroup from './config-toggle-group';
import CustomLayout from './CustomLayout';
import { Button, Container, Modal } from 'reactstrap';

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lib: 'reactstrap',
      data: [
        { custom_id: '1', label: 'label 1', claimed: false },
        { custom_id: '2', label: 'label 2', claimed: true }
      ]
    }
  }

  toggleLib() {
    let lib = this.state.lib === 'reactstrap'
      ? 'reactBootstrap'
      : 'reactstrap';

    this.setState({ lib })
  }

  render() {
    const { data } = this.state;
    const row = {
      label: 'hi'
    };

    return <Container>
      <Button onClick={e => this.toggleLib()}>
        lib: {this.state.lib}
      </Button>

      <h1>test form</h1>
      <Icon icon="leaf"
        color="info"
        label="leaf"
        pull="right"
        size={3}
        spin={true} />

      <List config={config}
        data={data}
        buttons={(props) => {
          const { Del, Add, Edit, Toggle } = listActions.reactstrap;
          return <div>
            <Del del={(view, selected) => {
              const ids = selected.map((d) => d.custom_id);
              const data = this.state.data.filter((row) => ids.indexOf(row.custom_id) === -1);
              this.setState({ data });
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
          </div>
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
                  }
                }}
                data={selected}
                formUpdate={actions.formUpdate}
                layout="Modal"
                config={config}
                onSubmit={(e, state) => {
                  if (!handleUpdate(e, state)) {
                    return;
                  }
                  const data = [...this.state.data];
                  data.push(state);
                  this.setState({ data });
                  close();
                }}
              />
            </Modal>
            <ListFilters
              config={config} />
          </div>
        }
      </List>



      <Form config={config}
        layout={CustomLayout}
        data={row}
        lib={this.state.lib}
        errors={{}}
        onSubmit={e => console.log(e)} />

      <Form config={configToggleGroup}
        data={{}}
        lib={this.state.lib}
        errors={{}}
        onSubmit={e => console.log(e)}
        visibility={{ toggle: false }} />
    </Container>
  }
}



ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);