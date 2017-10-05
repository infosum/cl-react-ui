import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import { setOptions } from '@storybook/addon-options';
setOptions({ downPanelInRight: true });

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
