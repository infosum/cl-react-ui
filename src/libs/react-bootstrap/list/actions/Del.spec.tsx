import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Del } from './Del';

let component;
const evnt = { preventDefault() { console.log('evnt'); } };
const del = () => {
  console.log('delete');
};
const user = {
  id: '',
};

describe('list.actions.Del', () => {
  describe('visible', () => {
    beforeEach(() => {
      component = shallow(<Del
        del={del}
        showModal={true}
        toggle={() => console.log('toggle')}
        selected={[]}></Del>);
    });

    it('shows a buton (and modal ok & cancel)', () => {
      expect(component.find(Button)).to.have.length(3);
    });

    // it('opens', () => {
    //   component.find(Button).first().simulate('click', evnt);
    //   expect(component.state().showModal).to.equal(true);
    // });

    // it('closes', () => {
    //   component.find(Button).at(1).simulate('click', evnt);
    //   expect(component.state().showModal).to.equal(false);
    // });

    // it('closes from modal window', () => {
    //   component.find(Button).first().simulate('click', evnt);
    //   component.find(Modal).simulate('hide', evnt);
    //   expect(component.state().showModal).to.equal(false);
    // });

    // it('handles submit', () => {
    //   component.find(Button).first().simulate('click', evnt);
    //   expect(component.state().showModal).to.equal(true);
    //   component.find(Button).at(2).simulate('click', evnt);
    //   expect(component.state().showModal).to.equal(false);
    // });
  });

  // describe('invisible', () => {
  //   beforeEach(() => {
  //     component = shallow(<Del
  //       del={del}
  //       showModal={false}
  //       toggle={() => console.log('toggle')}
  //       selected={[]}></Del>);
  //   });

  //   it('does not show a buton', () => {
  //     expect(component.type()).to.equal(null);
  //   });
  // });
});
