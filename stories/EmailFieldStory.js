import * as React from 'react';
import Email from '../src/libs/reactstrap/fields/Email';
import { boolean, withKnobs, text, select } from '@storybook/addon-knobs';

const EmailFieldStory = () => {
  return <Email field={{
    placeholder: 'email...',
    size: 'sm'
  }} />;
}

export default EmailFieldStory;