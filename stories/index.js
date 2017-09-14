
import { setAddon, storiesOf } from '@storybook/react';
import * as React from 'react';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';
import config from './config';
import { Icon, Form, List, ListFilters } from '../src';
import { Container, Col, Modal, Row } from 'reactstrap';
setAddon(JSXAddon);

const stories = storiesOf('Icon', module);
stories
  .addDecorator(withKnobs);
stories.addWithJSX('default', () => (
  <Icon icon={text('icon', 'database')}
    label={text('label', 'database')}
    color={select('color', {
      'muted': 'muted', 'primary': 'primary',
      'success': 'success', 'info': 'info', 'warning': 'warning', 'danger': 'danger', 'white': 'white', '': 'none'
    }, '')}
    pull={select('pull', { '': 'none', 'left': 'left', 'right': 'right' }, '')}
    size={select('size', { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }, 0)}
    inverse={boolean('inverse', false)}
    spin={boolean('spin', false)}
    stack={select('stack', { 0: 0, 1: 1, 2: 2 }, 0)}
  />
));

const listStories = storiesOf('List', module);

listStories.add('list', () => {
  const data = [
    { custom_id: '1', label: 'label 1', claimed: false },
    { custom_id: '2', label: 'label 2', claimed: true }
  ];

  const listActions = {
    add: (view, state) => {
      debugger;
      data.concat(state)
      console.log('save: would normally be connected to a redux action');
    },
    edit: (view, state) => {
      debugger;
      var i = data.findIndex(d => d.custom_id === state.custom_id);
      data[i] = state;
      console.log('edit: would normally be connected to a redux action');
    }
  };

  return <Container style={{ marginTop: 20 }}>
    <Row>
      <Col>
        <List config={config}
          data={data}
          actions={listActions}>
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
      </Col>
    </Row>
  </Container>
})
