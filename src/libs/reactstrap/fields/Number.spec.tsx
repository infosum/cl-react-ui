import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from 'reactstrap';
import Number from './Number';

let component;

const props = {
  field: {
    help: '',
    id: 'number',
    label: 'Number',
    type: 'number',
    value: '0',
  },
  name: 'number',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',

};

describe('Reactstrap Number Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Number {...props} />);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
