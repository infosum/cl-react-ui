import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Select from './Select';

let component;
const onChange = sinon.spy();

const props = {
  field: {
    default: (row, field) => {
      return '3';
    },
    id: 'customer',
    label: 'Customer',
    options: [
      { value: '0', label: 'None' },
      { value: '1', label: 'One' },
    ],
    type: 'select',
    value: '1',
  },
  name: 'select',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange,
  row: {},
  value: '1',
};

describe('form.field.Select', () => {
  beforeEach(() => {
    component = shallow(<Select {...props}></Select>);
  });

  it('should show two options', () => {
    const options = component.find('option');
    expect(options).to.have.length(2);
  });

  it('should have a value of 1', () => {
    const value = component.find('FormControl').prop('value');
    expect(value).to.equal('1');
  });

  it('uses change event', () => {
    component.simulate('change', { target: { value: '1' } });
    expect(onChange.calledOnce).to.equal(true);
  });
});
