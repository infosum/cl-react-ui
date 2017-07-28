import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from 'reactstrap';
import Hidden from './Hidden';

let component;

const props = {
  field: {
    help: '',
    id: 'hidden',
    label: 'Hidden',
    type: 'hidden',
    value: '0',
  },
  name: 'hidden',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',

};

describe('Reactstrap Hidden Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<Hidden {...props} />);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
