import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input, Label } from 'reactstrap';
import Checkbox from './Checkbox';

let component;

const props = {
  field: {
    help: '',
    id: 'claimed',
    label: 'Claimed',
    type: 'checkbox',
    value: '0',
  },
  name: 'checkbox',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',
};

describe('Reactstrap Checkbox Feild', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Checkbox {...props} />);
    });

    it('has a label', () => {
      expect(component.find(Label)).to.have.length(1);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
