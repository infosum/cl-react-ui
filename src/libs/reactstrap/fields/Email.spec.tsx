import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from 'reactstrap';
import Email from './Email';

let component;

const props = {
  field: {
    help: '',
    id: 'email',
    label: 'Email',
    type: 'email',
    value: '0',
  },
  name: 'email',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',
};

describe('Reactstrap Date Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Email {...props} />);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
