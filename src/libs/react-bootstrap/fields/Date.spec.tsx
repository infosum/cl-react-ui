import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import Date from './Date';

let component;

const props = {
  field: {
    help: '',
    id: 'date',
    label: 'Date',
    type: 'date',
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

describe('Reactstrap Date Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Date {...props} />);
    });

    it('has an input', () => {
      expect(component.find(FormControl)).to.have.length(1);
    });

  });
});
