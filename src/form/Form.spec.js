import {shallow, render} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import {FormControl, FormGroup} from 'react-bootstrap';
import UiForm from './Form';
import * as layouts from './layouts';

let component,
  html,
  errors = {
    id: [],
    label: [
      'badbad'
    ],
    age: [],
    protected: [],
    customValidationError: [],
    customValidationWarning: [],
    customValidationSuccess: []
  },
  config = {
    view: 'drone',
    form: {
      _title: row => 'title',
      actions: {
        add: {
          _label: row => 'title'
        },
        clear: {}
      },
      fields: {
        id: {
          pristine: true
        },
        label: {
          pristine: true,
          value: 'foo',
          access: {
            new: (field, data) => true,
            edit: (field, data) => true
          }
        },
        age: {
          pristine: true,
          accesss: {}
        },
        customValidationError: {
          pristine: false,
          validate: [
            v => 'error'
          ]
        },
        customValidationWarning: {
          pristine: false,
          validate: [
            v => 'warning'
          ]
        },
        customValidationSuccess: {
          pristine: false,
          validate: [
            v => 'success'
          ]
        },
        checkbox: {
          pristine: true,
          type: 'checkbox'
        },
        selectedCheckbox: {
          pristine: true,
          type: 'checkbox',
          value: '1'
        },
        protected: {
          pristine: true,
          access: {
            new: (field, data) => false,
            edit: (field, data) => false
          }
        }
      }
    }

  },
  data = {
    id: 1
  };

describe('UiForm', () => {
  describe('state population', () => {
    beforeEach(() => {
      component = shallow(<UiForm
        config={config}
        errors={{}}
        data={data}
        onSubmit={() => {}}
        formUpdate={() => {}}
        ></UiForm>);
    });

    it('renders a form with default layout', () => {
      expect(component.find(layouts.Default)).to.have.length(1);
    });

    it('populates state with values from data props', () => {
      expect(component.state().data.id).to.equal(1);
    });

    it('populates state from form.field.label.value', () => {
      expect(component.state().data.label).to.equal('foo');
    });

    it('populates state with empty string for fields with no value', () => {
      expect(component.state().data.age).to.equal('');
    });
  });

  describe('render', () => {
    beforeEach(() => {
      component = shallow(<UiForm
        config={config}
        errors={{}}
        data={data}
        actions={{
          custom: {
            action: (e, form) => {},
            label: 'custom',
            type: 'button'
          },
          other: {
            type: 'submit'
          }
        }}
        onSubmit={() => {}}
        formUpdate={() => {}}
        ></UiForm>);
      html = render(<UiForm
        config={config}
        errors={{}}
        data={data}
        onSubmit={() => {}}
        formUpdate={() => {}}
        ></UiForm>);
    });


    it('renders a form with default layout', () => {
      expect(component.find(layouts.Default)).to.have.length(1);
    });

    it('uses _title func to create title', () => {
      expect(component.state().form.title).to.equal('title');
    });

    it('uses _title func to create button label', () => {
      expect(component.state().form.actions.add.label).to.equal('title');
    });

    it('renders 2 fields', () => {
      console.log(component.render().html());
      //expect(component.find(FormGroup)).to.have.length(2);
    });
  });

  describe('error handline', () => {
    beforeEach(() => {
      component = shallow(<UiForm
        config={config}
        errors={errors}
        data={data}
        onSubmit={() => {}}
        formUpdate={() => {}}
        ></UiForm>);
    });

    it('shows error for label field', () => {
      //expect(html.find('form-group')).to.have.length(2);
      //expect(component.find(layouts.Default)).to.have.length(1);
    });
  });
});
