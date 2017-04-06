import {shallow} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import Toggle from './Toggle';
import {Button} from 'react-bootstrap';

let component,
  evnt = {preventDefault() {}},
  update = () => {},
  config = {
    update: {admin: true},
    label: 'Admin',
    icon: 'fa fa-star'
  },
  filter = () => {

  },
  user = {
    id: ''
  };

describe('list.actions.Toggle', () => {
  describe('visible', () => {
    beforeEach(() => {
      component = shallow(<Toggle
        update={update}
        selected={[]}
        config={config}
        user={user}
        isVisible={true}></Toggle>);
    });

    it('shows a buton', () => {
      expect(component.find(Button)).to.have.length(1);
    });

    it('has a star icon', () => {
      expect(component.find('.fa-star')).to.have.length(1);
    });

    it('sets state on click', () => {
      component.find(Button).first().simulate('click', evnt);
      expect(component.state().admin).to.equal(true);
    });
  });


  describe('invisible', () => {
    beforeEach(() => {
      component = shallow(<Toggle
        update={update}
        selected={[]}
        config={config}
        user={user}
        filter={filter}
        isVisible={false}></Toggle>);
    });

    it('does not show a buton', () => {
      expect(component.type()).to.equal(null);
    });
  });
});


