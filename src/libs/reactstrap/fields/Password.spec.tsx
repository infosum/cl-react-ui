import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from 'reactstrap';
import Password from './Password';

let component;

const props = {
  field: {
    help: '',
    id: 'password',
    label: 'Password',
    type: 'password',
    value: '0',
  },
  name: 'password',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',

};

describe('Reactstrap Password Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Password {...props} />);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
