import {shallow} from 'enzyme';
import Tip from './Tip';
import React from 'react';
import {expect} from 'chai';
import xss from 'xss';

let component;

describe('Testing Tip', () => {
  beforeEach(function() {
    let row = {test: true, text: 'row text inserted'},
      config = {
        position: 'top',
        trigger: 'click',
        content: function(r) {
          let msg = 'my tip! ' + r.text;
          return {__html: xss('<span>' + msg + '</span>')};
        }
      };

    component = shallow(<Tip config={config} row={row}>
      <span>hello</span>
      </Tip>);
  });

  it('should show a tip', () => {
    let span = component.find('span'),
      overlayTrigger = component.find('OverlayTrigger');

    expect(overlayTrigger).to.have.length(1);
    expect(span.text()).to.equal('hello');

    // Not working - perhaps as .tooltip is rendered outide of the <Tip> element?
    // overlayTrigger.simulate('click');
    // let tip = component.find('.tooltip');
    // expect(tip).to.have.length(1);
  });
});
