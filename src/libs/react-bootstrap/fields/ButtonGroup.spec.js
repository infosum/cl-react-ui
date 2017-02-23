import {shallow} from 'enzyme';
import React from 'react';
import ButtonGroup from './ButtonGroup';
import {expect} from 'chai';
import {Button} from 'react-bootstrap';

let component;

const onChange = e => {},
  oneButton = [
    {value: '1',
      label: 'one'}
  ],
  twoButtons = [
    {value: '1',
      label: 'one'},
    {value: '2',
      label: 'two'}
  ];

describe('form.field.ButtonGroup', () => {
  describe('one button', () => {
    beforeEach(() => {
      let field = {
        options: oneButton
      };
      component = shallow(
          <ButtonGroup field={field} value="" name="buttonGroup"
            onChange={onChange}/>
        );
    });

    it('should be wrapped in a form-group div', () => {
      expect(component.find('.form-group')).to.have.length(1);
    });

    it('should show a one button', () => {
      expect(component.find(Button)).to.have.length(1);
      expect(component.render().find('button').text()).to.equal('one');
    });
  });

  describe('two buttons', () => {
    beforeEach(() => {
      let field = {
        options: twoButtons
      };
      component = shallow(
          <ButtonGroup field={field} value="2" name="buttonGroup"
            onChange={onChange}/>
        );
    });
    it('should show two buttons', () => {
      expect(component.find(Button)).to.have.length(2);
    });

    it('should select second button', () => {
      let btn = component.render().find('button').last();
      expect(btn.hasClass('active')).to.equal(true);
    });

    it('should fire onChange', () => {
      component.find(Button).last().simulate('click', {value: '2'});
      expect(component.state().value).to.equal('2');
    });
  });

  describe('render icon', () => {
    beforeEach(() => {
      let field = {
        options: [
          {value: '1',
            label: 'one',
            icon: 'star'}
        ]
      };
      component = shallow(
          <ButtonGroup field={field} value="1" name="buttonGroup"
            onChange={onChange}/>
        );
    });
    it('should have a star icon', () => {
      expect(component.find('i.fa-star')).to.have.length(1);
    });
  });
});
