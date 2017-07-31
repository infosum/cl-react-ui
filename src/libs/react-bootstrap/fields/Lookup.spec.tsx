import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { Icon } from '../../../index';
import { IListRow } from '../../../interfaces';
import Lookup from './Lookup';

let component;
const onChange = sinon.spy();

const rows: IListRow[] = [
  { value: '1', label: 'one' },
  { value: '2', label: 'two' },
];

const props = {
  field: {
    default: (row, field) => {
      return '3';
    },
    id: 'customer',
    label: 'Customer',
    optGroup: '',
    options: {
      key: 'value',
      label: 'label',
      optionFitler: (row) => true,
      store: (row) => {
        return new Promise((resolve, reject) => {
          console.log('store promise = resolve', rows);
          resolve(rows);
        });
      },
    },
    type: 'lookup',
    value: '2',
  },
  name: 'lookup',
  onBlur: (name) => {
    console.log('on blur');
  },
  onChange: (name, data) => {
    console.log('on change');
  },
  row: {},
  value: '1',
};
describe('form.fields.Lookup', () => {

  describe('loading states', () => {
    beforeEach(() => {
      component = mount(<Lookup {...props}></Lookup>);
    });

    it('should show a loader', () => {
      expect(component.find(Icon)).to.have.length(1);
    });

  });

  // @TODO - fix these tests, getStoreData() await is not working with static data?
  // describe('no option group', () => {
  //   beforeEach(() => {
  //     // p.loadig
  //     component = mount(<Lookup {...props}></Lookup>);
  //     component.setState({ loading: false });
  //   });

  //   it('should show two options & please select', () => {
  //     console.log(component.html());
  //     const options = component.find('option');
  //     expect(options).to.have.length(3);
  //   });
  // });

  // describe('option group', () => {
  //   beforeEach(() => {
  //     const p = { ...props };
  //     p.field.optGroup = 'group';
  //     p.field.options.store = (row) => {
  //       return new Promise((resolve, reject) => {
  //         resolve([
  //           { value: '1', label: 'one', group: 'group 1' },
  //           { value: '2', label: 'two', group: 'group 1' },
  //           { value: '2', label: 'three', group: 'group 2' },
  //         ]);
  //       });
  //     };

  //     component = shallow(<Lookup {...p}></Lookup>);
  //   });

  //   it('should show two option groups', () => {
  //     const options = component.find('optgroup');
  //     expect(options).to.have.length(2);
  //   });
  // });

  // describe('option group', () => {
  //   beforeEach(() => {
  //     let field = {
  //       type: 'lookup',
  //       options: {
  //         key: 'value',
  //         label: 'label',
  //         optGroup: 'group',
  //         optionFitler: (row) => {
  //           return row.value === '1';
  //         },
  //         store: (row) => {
  //           return [
  //             { value: '1', label: 'one', group: 'group 1' },
  //             { value: '2', label: 'two', group: 'group 1' },
  //             { value: '2', label: 'three', group: 'group 2' },
  //           ];
  //         },
  //       },
  //     };

  //     component = shallow(<Lookup
  //       value="1"
  //       name="lookup"
  //       field={field}
  //       row={{}}
  //       onChange={onChange}></Lookup>);
  //   });

  //   it('should filter options to one opt group and option', () => {
  //     const options = component.find('option');
  //     expect(options).to.have.length(2);
  //   });

  //   it('should still show two opt groups', () => {
  //     const optGroups = component.find('optgroup');
  //     expect(optGroups).to.have.length(2);
  //   });

  //   it('should fire onChange', () => {
  //     component.simulate('change', { target: { value: '1' } });
  //     expect(onChange.calledOnce).to.equal(true);
  //   });
  // });
});
