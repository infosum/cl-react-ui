import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import Toggle from './Toggle';

let component;
const evnt = { preventDefault() { console.log('evnt'); } };
const update = () => {
  console.log('update');
};
const config = {
  icon: 'fa fa-star',
  label: 'Admin',
  update: { admin: true },
};
const filter = (user, selected) => {
  return [];
};
const user = {
  id: '',
};

describe('list.actions.Toggle', () => {
  describe('visible', () => {
    beforeEach(() => {
      component = shallow(<Toggle
        update={update}
        selected={[]}
        config={config}
        user={user}
        filter={(u, selected) => []}
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
