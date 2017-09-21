import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from 'reactstrap';
import Add from './Add';

let component;
const evnt = { preventDefault() { console.log('evnt'); } };
const open = () => {
  console.log('open');
};

describe('list.actions.Add', () => {
  describe('visible', () => {
    beforeEach(() => {
      component = shallow(<Add
        showAddModal={open}></Add>);
    });

    it('shows a button', () => {
      expect(component.find(Button)).to.have.length(1);
    });

  });
});
