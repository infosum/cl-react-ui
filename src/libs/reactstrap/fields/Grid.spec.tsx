import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Input, Table } from 'reactstrap';
import Grid from './Grid';

let component;

const props = {
  field: {
    columns: [
      { label: 'text', type: 'Text' },
      { label: 'email', type: 'Email' },
    ],
    help: '',
    id: 'textarea',
    label: 'Text Area',
    type: 'textarea',
    value: '0',
  },
  name: 'textarea',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',

};

describe('Reactstrap Grid Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = mount(<Grid {...props} />);
      console.log(component.html());
    });
    it('has an table', () => {
      expect(component.find(Table)).to.have.length(1);
    });

    it('has 2 columns for the fields + action column', () => {
      expect(component.find('th')).to.have.length(3);
    });

    it('has an add button', () => {
      expect(component.find('i.fa-plus')).to.have.length(1);
    });

  });
});
