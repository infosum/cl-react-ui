import {shallow} from 'enzyme';
import Select from './Select';
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';

let component;
const onChange = sinon.spy();

describe('form.field.Select', () => {
  beforeEach(() => {
    let field = {
        type: 'select',
        options: [
          {value: '0', label: 'None'},
          {value: '1', label: 'One'}
        ]
      },
      change = () => {};

    component = shallow(<Select
      value="1"
      name="select"
      field={field}
      onChange={onChange}></Select>);
  });

  it('should show two options', () => {
    let options = component.find('option');
    expect(options).to.have.length(2);
  });

  it('should have a value of 1', () => {
    let value = component.find('FormControl').prop('value');
    expect(value).to.equal('1');
  });

  it('uses change event', () => {
    component.simulate('change', {target: {value: '1'}});
    expect(onChange.calledOnce).to.equal(true);
  });
});
