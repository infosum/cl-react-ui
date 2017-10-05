
import { setAddon, storiesOf } from '@storybook/react';
import * as React from 'react';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';
import config from './config';
import { Icon, Form, List, ListFilters } from '../src';
import { Container, Col, Modal, Row } from 'reactstrap';
import ListStory from './ListStory';
import TextFieldStory from './TextFieldStory';
import EmailFieldStory from './EmailFieldStory';
import ReactSelectFieldStory from './ReactSelectFieldStory';
import DeleteButtonStory from './DeleteButtonStory';

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
  return <Container style={{ marginTop: 20 }}>
    <Row>
      <Col>
        <ListStory />
      </Col>
    </Row>
  </Container>
})

const fieldStories = storiesOf('Fields', module);
fieldStories.addDecorator(withKnobs);

fieldStories.add('text', () => {
  return <TextFieldStory />
})

fieldStories.add('email', () => {
  return <EmailFieldStory />
})

fieldStories.add('react-select', () => {
  return <ReactSelectFieldStory />
})

const listButtonStories = storiesOf('List Buttons', module)
listButtonStories.addDecorator(withKnobs);
listButtonStories.add('Delete', () => {
  return <DeleteButtonStory />
});
