import * as React from 'react';
import Text from '../src/libs/reactstrap/fields/Text';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';

const TextFieldStory = () => {
  return <Text field={{
    placeholder: 'test',
    size: 'lg'
  }} />;
}

export default TextFieldStory;