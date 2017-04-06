import {shallow} from 'enzyme';
import React from 'react';
import Add from './Add';
import {expect} from 'chai';
import {Button} from 'react-bootstrap';

let component,
  evnt = {preventDefault() {}},
  open = () => {};

describe('list.actions.Add', () => {
  describe('visible', () => {
    beforeEach(() => {
      component = shallow(<Add
        open={open}
        isVisible={true}></Add>);
    });

    it('shows a buton', () => {
      expect(component.find(Button)).to.have.length(1);
    });

    it('opens', () => {
      component.simulate('click', evnt);
      expect(component.state().open).to.equal(true);
    });
  });

  describe('invisible', () => {
    beforeEach(() => {
      component = shallow(<Add
        open={open}
        isVisible={false}></Add>);
    });

    it('does not show a buton', () => {
      expect(component.type()).to.equal(null);
    });
  });
});


