import {shallow} from 'enzyme';
import RadioList from './Radiolist';
import React from 'react';
import {expect} from 'chai';
import {Radio} from 'react-bootstrap';
import sinon from 'sinon';

let component;
const onChange = sinon.spy();
describe('form.field.RadioList', () => {
  beforeEach(function() {
    let field = {
        type: 'radiolist',
        options: [
          {value: '0', label: 'None'},
          {value: '1', label: 'One'}
        ]
      },
      change = function() {
      };

    component = shallow(<RadioList
      value="1"
      name="radiolist"
      field={field}
      onChange={onChange}></RadioList>);
  });

  it('should show two radios', () => {
    let radios = component.find('Radio');
    expect(radios).to.have.length(2);
  });

  it('should have the second radio button acitve', () => {
    let radio1 = component.find('Radio').at(1);
    expect(radio1.prop('active')).to.equal(true);
  });

  it('uses change event', () => {
    component.find(Radio).first().simulate('click', {target: {value: '1'}});
    expect(onChange.calledOnce).to.equal(true);
  });
});
