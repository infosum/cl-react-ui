import {shallow} from 'enzyme';
import Select from './Select';
import React from 'react';
import {expect} from 'chai';

let component;

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
      onChange={e => change(e)}></Select>);
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
    component.simulate('change', {value: '1'});
    expect(component.state().value).to.equal('1');
  });
});
