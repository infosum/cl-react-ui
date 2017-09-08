
import { action, addDecorator, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Icon from './Icon';

storiesOf('Icon', module)
  .add('default', () => (
    <div style={{ width: '640px' }}>
      <Icon icon="hospital" label="Hospital" />
    </div>
  ));
