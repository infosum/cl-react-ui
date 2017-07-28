import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from 'reactstrap';
import TextArea from './Textarea';

let component;

const props = {
  field: {
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

describe('Reactstrap TextArea Field', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<TextArea {...props} />);
    });

    it('has an input', () => {
      expect(component.find(Input)).to.have.length(1);
    });

  });
});
