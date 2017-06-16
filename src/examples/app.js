import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Icon, Form, List, ListFilters, validations} from '../index';
import config from './config';
import configToggleGroup from './config-toggle-group';
import CustomLayout from './CustomLayout';
import {Button, Container, Modal} from 'reactstrap';

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lib: 'reactstrap',
      data: [
        {custom_id: '1', label: 'label 1', claimed: false},
        {custom_id: '2', label: 'label 2', claimed: true}
      ]
    }
  }

  toggleLib() {
    let lib = this.state.lib === 'reactstrap'
      ? 'reactBootstrap'
      : 'reactstrap';

    this.setState({lib})
  }

  render() {
    const {data} = this.state;
    const row = {
      label: 'hi'
    };

console.log('data = ', data);
    const listActions = {
      add: (view, state) => {
        this.setState({data: data.concat(state)});
        console.log('save: would normally be connected to a redux action');
      },
      edit: (view, state) => {
        var i = data.findIndex(d => d.custom_id === state.custom_id);
        data[i] = state;
        console.log('save: would normally be connected to a redux action');
      }
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
          actions={listActions}>
          {({actions, handleUpdate, selected, showModal, close}) => 
          <div>
            <Modal isOpen={showModal} toggle={close}>
              <Form
                actions={{close: {
                  action: close,
                  id: 'modal-close',
                  label: 'Close',
                  type: 'button',
                }}}
                data={selected}
                formUpdate={actions.formUpdate}
                layout="Modal"
                config={config}
                onSubmit={(e, state) => {
                  handleUpdate(e, state);
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
          visibility={{toggle: false}} />
      </Container>
  }
}



ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);