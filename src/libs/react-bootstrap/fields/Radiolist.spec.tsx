import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Radio } from 'react-bootstrap';
import * as sinon from 'sinon';
import RadioList from './Radiolist';

let component;
const onChange = sinon.spy();

const props = {
  field: {
    default: (row, field) => {
      return '3';
    },
    id: 'customer',
    label: 'Customer',
    optGroup: '',
    options: [
      { value: '0', label: 'None' },
      { value: '1', label: 'One' },
    ],
    type: 'lookup',
    value: '2',
  },
  name: 'lookup',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange,
  row: {},
  value: '1',
};

describe('form.field.RadioList', () => {
  beforeEach(() => {
    component = shallow(<RadioList {...props}></RadioList>);
  });

  it('should show two radios', () => {
    const radios = component.find('Radio');
    expect(radios).to.have.length(2);
  });

  it('should have the second radio button acitve', () => {
    const radio1 = component.find('Radio').at(1);
    expect(radio1.prop('active')).to.equal(true);
  });

  it('uses change event', () => {
    component.find(Radio).first().simulate('click', { target: { value: '1' } });
    expect(onChange.calledOnce).to.equal(true);
  });
});
