import {shallow} from 'enzyme';
import React from 'react';
import Lookup from './Lookup';
import {expect} from 'chai';

let component;

describe('form.fields.Lookup', () => {
  describe('no option group', () => {
    beforeEach(() => {
      let field = {
          type: 'lookup',
          options: {
            store: row => {
              return [
                {value: '1', label: 'one'},
                {value: '2', label: 'two'}
              ];
            },
            key: 'value',
            label: 'label'
          }
        },
        change = function(e, name) {
        };

      component = shallow(<Lookup
        value="1"
        name="lookup"
        field={field}
        row={{}}
        onChange={e => change(e, name)}></Lookup>);
    });

    it('should show two options & please select', () => {
      let options = component.find('option');
      expect(options).to.have.length(3);
    });
  });
  describe('option group', () => {
    beforeEach(() => {
      let field = {
          type: 'lookup',
          options: {
            store: row => {
              return [
                {value: '1', label: 'one', group: 'group 1'},
                {value: '2', label: 'two', group: 'group 1'},
                {value: '2', label: 'three', group: 'group 2'}
              ];
            },
            key: 'value',
            label: 'label',
            optGroup: 'group'
          }
        },
        change = function(e, name) {
        };

      component = shallow(<Lookup
        value="1"
        name="lookup"
        field={field}
        row={{}}
        onChange={e => change(e, name)}></Lookup>);
    });

    it('should show two option groups', () => {
      let options = component.find('optgroup');
      expect(options).to.have.length(2);
    });
  });

  describe('option group', () => {
    beforeEach(() => {
      let field = {
          type: 'lookup',
          options: {
            store: row => {
              return [
                {value: '1', label: 'one', group: 'group 1'},
                {value: '2', label: 'two', group: 'group 1'},
                {value: '2', label: 'three', group: 'group 2'}
              ];
            },
            key: 'value',
            label: 'label',
            optGroup: 'group',
            optionFitler: function(row) {
              return row.value === '1';
            }
          }
        },
        change = function(e, name) {
        };

      component = shallow(<Lookup
        value="1"
        name="lookup"
        field={field}
        row={{}}
        onChange={(e, name) => change(e, name)}></Lookup>);
    });

    it('should filter options to one opt group and option', () => {
      let options = component.find('option');
      expect(options).to.have.length(2);
    });

    it('should still show two opt groups', () => {
      let optGroups = component.find('optgroup');
      expect(optGroups).to.have.length(2);
    });

    it('should fire onChange', () => {
      component.simulate('change', {value: '1'});
      expect(component.state().value).to.equal('1');
    });
  });
});
