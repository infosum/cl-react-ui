import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { FormFeedback, FormGroup as RFG, FormText, Label } from 'reactstrap';
import FormGroup from './FormGroup';

let component;

const props = {
  FieldComponent: 'text',
  errors: [
    'bad error',
  ],
  field: {
    help: '',
    id: 'email',
    label: 'Email',
    type: 'email',
    value: '0',
  },

  name: 'email',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  validationState: '',
  value: '',
};

describe('ReactstrapFormGroup', () => {
  describe('render', () => {
    beforeEach(() => {
      component = shallow(<FormGroup {...props} />);
    });

    it('has a form group', () => {
      expect(component.find(RFG)).to.have.length(1);
    });

    it('had form text', () => {
      expect(component.find(FormText)).to.have.length(1);
    });

    it('had one error', () => {
      expect(component.find(FormFeedback)).to.have.length(1);
    });

    it('has a label', () => {
      expect(component.find(Label)).to.have.length(1);
    });

  });
});
