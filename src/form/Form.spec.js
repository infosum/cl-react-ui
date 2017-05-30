import {shallow, render} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import * as libs from '../libs';
import {FormControl, FormGroup} from 'react-bootstrap';
import UiForm from './Form';
import UiFormLayoutDefault from '../libs/react-bootstrap/layouts/Default';

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
    lib: 'reactBootstrap',
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
          type: 'hidden'
        },
        label: {
          type: 'text',
          default: 'foo',
          access: {
            new: (field, data) => true,
            edit: (field, data) => true
          }
        },
        age: {
          type: 'number',
          accesss: {}
        },
      
        checkbox: {
          type: 'checkbox'
        },
        selectedCheckbox: {
          type: 'checkbox',
          default: '1'
        },
        protected: {
          type: 'text',
          access: {
            new: (field, data) => false,
            edit: (field, data) => false
          }
        },
        lookup: {
          label: 'Parent Category',
          type: 'lookup',
          options: {
            store: (row) => [
              {id: 1, name: 'test'},
              {id: 2, name: 'test2'},
            ],
            key: 'id',
            label: 'name',
            optionFitler: (row) => row.parent_id === 0,
            default: (row, field) => 1
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
      expect(component.find(UiFormLayoutDefault)).to.have.length(1);
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
      expect(component.find(UiFormLayoutDefault)).to.have.length(1);
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

  describe('prop test', () => {
     beforeEach(() => {
      component = shallow(<UiForm
        config={config}
        errors={errors}
        data={data}
        title={row => 'test this title'}
        onSubmit={() => {}}
        formUpdate={() => {}}
        ></UiForm>);
    });

    it('uses title func to create title', () => {
      expect(component.state().form.title).to.equal('test this title');
    })
  })

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
