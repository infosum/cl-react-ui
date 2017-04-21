import {shallow} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import ListRow from './ListRow';
import ListCell from './ListCell';
import {Checkbox} from 'react-bootstrap';
import Tip from '../components/Tip';


let component,
  evnt = {preventDefault() {}, target: {checked: true}},
  deselectEvnt = {preventDefault() {}, target: {checked: false}},
  row = {
    label: 'test'
  },
  columns = {
    label: {}
  },
  tipColumns = {
    label: {
      tip: {
        id: 'test',
        position: 'top',
        content: () => 'hi'
      }
    }
  },
  claimedColumns = {
    label: {
      class: 'text-center',
      id: 'drone-heading-claimed',
      label: 'Claimed',
      render: () => <div>hello</div>
    }
  },
  actions = {
    claim: () => {},
    selectRow: () => {},
    deselectRow: () => {}
  };

describe('list.ListRow', () => {
  describe('standard cell', () => {
    beforeEach(() => {
      component = shallow(<ListRow
        row={row}
        selected={false}
        columns={columns}
        actions={actions}>
        </ListRow>);
    });

    it('shows a cell', () => {
      expect(component.find(ListCell)).to.have.length(1);
    });
  });

  describe('tip', () => {
    beforeEach(() => {
      component = shallow(<ListRow
        row={row}
        selected={false}
        columns={tipColumns}
        actions={actions}>
        </ListRow>);
    });

    it('has a Tip', () => {
      expect(component.find(Tip)).to.have.length(1);
    });
  });

  describe('custom renderer', () => {
    beforeEach(() => {
      component = shallow(<ListRow
        row={row}
        selected={false}
        columns={claimedColumns}
        actions={actions}>
        </ListRow>);
    });

    it('is claimed', () => {
      // Don't test child render - just expect no ListCells to be rendered
      expect(component.find(ListCell)).to.have.length(0);
    });
  });
});
