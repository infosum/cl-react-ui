import {shallow} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import ListCell from './ListCell';

let component;

describe('list.ListCell', () => {
  beforeEach(() => {
    component = shallow(<ListCell
      data="test">
      </ListCell>);
  });

  it('shows data', () => {
    expect(component.find('div').text()).to.equal('test');
  });
});
