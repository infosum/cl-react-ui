import * as React from 'react';
import Del from '../src/libs/reactstrap/list/actions/Del';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';

const DeleteButtonStory = () => {
  const selected = [{
    id: 1, foo: 'bar',
  }];
  return <Del
    size={select('size', { '': 'standard', 'sm': 'small', 'lg': 'large' }, '')}
    del={(selected) => console.log('delete', selected)}
    selected={selected}
  />;
}

export default DeleteButtonStory;