import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button, Modal } from 'reactstrap';
import enhance from '../../../../enhancers/modal';
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
      component = shallow((<Del
        del={del}
        showModal={true}
        toggle={() => console.log('toggle')}
        selected={[]}></Del>));
    });

    it('shows a buton (and modal ok & cancel)', () => {
      expect(component.find(Button)).to.have.length(3);
    });
  });

});
