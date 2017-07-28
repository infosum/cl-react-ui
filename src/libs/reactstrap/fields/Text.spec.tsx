import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from 'reactstrap';
import Text from './Text';

let component;

const props = {
  field: {
    help: '',
    id: 'text',
    label: 'Text',
    type: 'text',
    value: '0',
  },
  name: 'text',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',

};

describe('Reactstrap Text Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Text {...props} />);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
