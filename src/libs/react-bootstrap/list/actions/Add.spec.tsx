import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import Add from './Add';

let component;
const evnt = { preventDefault() { console.log('evnt'); } };
const open = (e: MouseEvent) => {
  console.log('open');
};

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
