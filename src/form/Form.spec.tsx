import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import * as React from 'react';
import { ICrudConfig } from '../interfaces';
import * as libs from '../libs';
import FormLayoutDefault from '../libs/reactstrap/layouts/Default';
import Form from './Form';

/* tslint:disable:object-literal-sort-keys */
let component;
let html;
const errors = {
  age: [],
  customValidationError: [],
  customValidationSuccess: [],
  customValidationWarning: [],
  id: [],
  label: [
    'badbad',
  ],
  protected: [],
};
const config: ICrudConfig = {
  form: {
    title: (row) => 'title',
    actions: {
      add: {
        label: (row) => 'title',
        action: () => {
          console.log('add');
        },
        id: '1',
        type: 'submit',
      },
      clear: {
        label: (row) => 'clear',
        action: () => {
          console.log('clear');
        },
        id: '1',
        type: 'button',
      },
    },
    fields: {
      id: {
        id: 'hidden',
        type: 'hidden',
      },
      label: {
        id: 'label',
        access: {
          new: (field, d) => true,
          edit: (field, d) => true,
        },
        default: 'foo',
        type: 'text',
      },
      age: {
        id: 'age',
        access: {},
        type: 'number',
      },

      checkbox: {
        id: 'checkbox',
        type: 'checkbox',
      },
      selectedCheckbox: {
        id: 'seleced checkbox',
        type: 'checkbox',
        default: '1',
      },
      protected: {
        id: 'protected',
        type: 'text',
        access: {
          new: (field, d) => false,
          edit: (field, d) => false,
        },
      },
      lookup: {
        id: 'lookup',
        label: 'Parent Category',
        type: 'lookup',
        options: {
          store: (row) => [
            { id: 1, name: 'test' },
            { id: 2, name: 'test2' },
          ],
          key: 'id',
          label: 'name',
          optionFitler: (row) => row.parent_id === 0,
          default: (row, field) => 1,
        },
      },
    },
  },
  lib: 'reactBootstrap',
  view: 'drone',
};
const data = {
  id: 1,
};

describe('Form', () => {
  describe('state population', () => {
    beforeEach(() => {
      component = shallow(<Form
        config={config}
        errors={{}}
        data={data}
        onSubmit={() => {
          console.log('submit');
        }}
        formUpdate={() => {
          console.log('form update');
        }}
      ></Form>);
    });

    it('renders a form with default layout', () => {
      expect(component.find(FormLayoutDefault)).to.have.length(1);
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
      component = shallow(<Form
        title={() => 'title'}
        config={config}
        errors={{}}
        data={data}
        onSubmit={() => {
          console.log('submit');
        }}
        formUpdate={() => {
          console.log('form update');
        }}
      ></Form>);
      html = render(<Form
        config={config}
        errors={{}}
        data={data}
        onSubmit={() => {
          console.log('submit');
        }}
        formUpdate={() => {
          console.log('form update');
        }}
      ></Form>);
    });

    it('renders a form with default layout', () => {
      expect(component.find(FormLayoutDefault)).to.have.length(1);
    });

    it('uses title func to create title', () => {
      expect(component.state().form.title).to.equal('title');
    });

    it('uses title func to create button label', () => {
      expect(component.state().form.actions.add.label).to.equal('title');
    });

    it('renders 2 fields', () => {
      console.log(component.render().html());
      // expect(component.find(FormGroup)).to.have.length(2);
    });
  });

  describe('prop test', () => {
    beforeEach(() => {
      component = shallow(<Form
        config={config}
        errors={errors}
        data={data}
        title={(row) => 'test this title'}
        onSubmit={() => {
          console.log('submit');
        }}
        formUpdate={() => {
          console.log('form update');
        }}
      ></Form>);
    });

    it('uses title func to create title', () => {
      expect(component.state().form.title).to.equal('test this title');
    });
  });

  describe('error handline', () => {
    beforeEach(() => {
      component = shallow(<Form
        config={config}
        errors={errors}
        data={data}
        onSubmit={() => {
          console.log('submit');
        }}
        formUpdate={() => {
          console.log('form update');
        }}
      ></Form>);
    });

    it('shows error for label field', () => {
      // expect(html.find('form-group')).to.have.length(2);
      // expect(component.find(layouts.Default)).to.have.length(1);
    });
  });
});
