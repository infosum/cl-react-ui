import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import Add, { IProps } from './Add';

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

    it('shows a buton', () => {
      expect(component.find(Button)).to.have.length(1);
    });
  });
});
