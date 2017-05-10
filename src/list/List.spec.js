import {shallow, mount} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import List from './List';
import add from '../libs/react-bootstrap/list/actions/Add';
import ListRow from './ListRow';
import ListActions from '../libs/react-bootstrap/listLayouts/ListActions';
import UiForm from '../form/Form';
import {Table, Alert, Modal} from 'react-bootstrap';
require('jsdom-global')();

let component,
  actions = {
    selectRow: () => {},
    deselectRow: () => {},
    selectAllRows: () => {},
    deselectAllRows: () => {},
    setModalState: () => {
      actions.ui.modals.drone = true;
    },
    setForm: () => {},
    add: () => {},
    edit: () => {},
    ui: {
      modals: {
        drone: false
      }
    }
  },
  form = {
    id: ''
  },
  user = {},
  config = {
    view: 'drone',
    actions: {},
    fields: {
      id: {

      }
    },
    list: {
      searchall: {
        like: [
          'id', 'name'
        ]
      },
      columns: {
        id: {
          id: '1',
          class: 'id',
          label: 'id'
        },
        name: {
          id: '2',
          class: 'name',
          label: 'name'
        }
      },
      actions: [{
        add: {
          id: 'drone-list-action-add',
          visible: () => true,
          render: add
        }
      }]
    },
    form: {
      actions: {},
      fields: {}
    },
    messages: {}
  },
  configAltPk = {
    view: 'no_id_pk_is_foo',
    actions: {},
    primary_key: 'foo',
    fields: {
      foo: {

      }
    },
    list: {
      searchall: {
        like: [
          'id', 'name'
        ]
      },
      columns: {
        foo: {
          id: '1',
          class: 'id',
          label: 'foo'
        }
      },
      actions: []
    },
    form: {
      actions: {},
      fields: {}
    },
    messages: {}
  },
  nodata = [],
  data = [{id: 1, name: 'test'}];

describe('List', () => {
  describe('empty data', () => {
    beforeEach(() => {
      component = mount(<List
        form={form}
        actions={actions}
        user={user}
        config={config}
        data={nodata}
        errors={{}}
        selected={[]}
        ></List>);
    });
    it('renders empty data message', () => {
      expect(component.find(Table)).to.have.length(0);
      expect(component.find(Alert)).to.have.length(1);
    });
  });

  describe('no actions or search', () => {
    beforeEach(() => {
      let list = Object.assign({}, config.list);
      list.actions = [];
      delete list.searchall;
      component = mount(<List
        form={form}
        actions={actions}
        user={user}
        config={{...config, list}}
        data={data}
        errors={{}}
        selected={[]}
        ></List>);
    });

    it('shows no list actions', () => {
      expect(component.find({id: 'drone-list-action-add'})).to.have.length(0);
    });

    it('shouldnt filter data as no list.searchall', () => {
      expect(component.find(ListRow)).to.have.length(1);
    });

    it('wont render search as no list.search', () => {
      expect(component.find({type: 'search'})).to.have.length(0);
    });
  });

  describe('with data: one row selected in props', () => {
    beforeEach(() => {
      component = shallow(<List
        form={form}
        actions={actions}
        user={user}
        config={Object.assign({}, config, {selected: {id: 1}})}
        data={data}
        errors={{}}
        selected={[]}
        ></List>);
    });

    it('has one row selected', () => {
     // expect(component.find({id: 'drone-list-action-add'})).to.have.length(0);
    });
  });

  describe('with data: one row selected in props, foo primary key', () => {
    beforeEach(() => {
      component = shallow(<List
        form={form}
        actions={actions}
        user={user}
        config={{...configAltPk, selected: {id: 1}}}
        data={data}
        errors={{}}
        selected={[]}
        ></List>);
    });

    it('has one row selected', () => {
     // expect(component.find({id: 'drone-list-action-add'})).to.have.length(0);
    });
  });

  describe('with data', () => {
    beforeEach(() => {
      component = mount(<List
        form={form}
        actions={actions}
        user={user}
        config={config}
        data={data}
        errors={{}}
        selected={[]}
        ></List>);
    });

    it('renders a List', () => {
      expect(component.find(List)).to.have.length(1);
    });

    it('shows an action', () => {
      expect(component.find(ListActions)).to.have.length(1);
    });

    it('has search', () => {
      expect(component.find({type: 'search'})).to.have.length(1);
    });

    it('can search', () => {
      let evnt = {target: {value: 's'}};
      component.find({type: 'search'}).simulate('change', evnt);
      expect(component.state().search).to.equal('s');
    });

    it('can search: no results', () => {
      let evnt = {target: {value: 'nothing'}};
      component.find({type: 'search'}).simulate('change', evnt);
      expect(component.state().search).to.equal('nothing');
      expect(component.find(ListRow)).to.have.length(0);
    });

    it('toggles all: on', () => {
      let evnt = {target: {checked: true}};
      component.find({'data-action': 'check-all'}).simulate('click', evnt);
      expect(component.state().allToggled).to.equal(true);
    });

    it('toggles all: off', () => {
      let evnt = {target: {checked: false}};
      component.find({'data-action': 'check-all'}).simulate('click', evnt);
      expect(component.state().allToggled).to.equal(false);
    });

    it('clicks a row', () => {
      let evnt = {preventDefault() {}, target: {type: 'td'}};
      component.find(ListRow).first().simulate('click', evnt);
      expect(component.state().showModal).to.equal(true);
    });

    it('ignores clicking a row', () => {
      let evnt = {preventDefault() {}, target: {type: 'button'}};
      component.find(ListRow).first().simulate('click', evnt);
      expect(component.state().showModal).to.equal(false);
    });

    it('closes add modal', () => {
      let evnt = {preventDefault() {}, target: {type: 'td'}};
      component.find(ListRow).first().simulate('click', evnt);
      component.find(Modal).simulate('hide', evnt);
      expect(component.state().showModal).to.equal(false);
    });

    it('submits add modal', () => {
      let evnt = {preventDefault() {}, target: {type: 'td'}};
      component.find(ListRow).first().simulate('click', evnt);
      component.find(UiForm).first().simulate('submit', evnt);
      expect(component.state().rowUpdating).to.equal(true);
    });
  });
});
