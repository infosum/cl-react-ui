import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { IFieldOption } from '../../../interfaces';
import ButtonGroup from './ButtonGroup';

let component;

const oneButton = [
  {
    label: 'one',
    value: '1',
  },
] as IFieldOption[];
const twoButtons = [
  {
    label: 'one',
    value: '1',
  },
  {
    label: 'two',
    value: '2',
  },
] as IFieldOption[];

const props = {
  field: {
    help: '',
    id: 'claimed',
    label: 'Claimed',
    options: oneButton,
    type: 'checkbox',
    value: '0',
  },
  name: 'checkbox',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '',
};

describe('form.field.ButtonGroup', () => {
  describe('one button', () => {
    beforeEach(() => {
      component = shallow(
        <ButtonGroup {...props} />,
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
      const p = { ...props };
      p.field.options = twoButtons;
      component = shallow(
        <ButtonGroup {...p} />,
      );
    });
    it('should show two buttons', () => {
      expect(component.find(Button)).to.have.length(2);
    });

    // it('should select second button', () => {
    //   const btn = component.render().find('button').last();
    //   console.log('btn = ', btn, btn.html());
    //   expect(btn.hasClass('active')).to.equal(true);
    // });

    it('should fire onChange', () => {
      component.find(Button).last().simulate('click', { value: '2' });
      expect(component.state().value).to.equal('2');
    });
  });

  describe('render icon', () => {
    beforeEach(() => {
      const p = { ...props };
      p.field.options = [
        {
          icon: 'star',
          label: 'one',
          value: '1',
        },
      ];

      component = shallow(
        <ButtonGroup {...p} />,
      );
    });
    it('should have a star icon', () => {
      expect(component.find('i.fa-star')).to.have.length(1);
    });
  });
});
