import React from 'react';
import {Button} from 'reactstrap';
import {fields} from '../index';
import {validations} from '../index';

const Claim = ({selected}) => {
  return <Button onClick={(e) => console.log('selected', selected)}>Claim</Button>;
};

export default {
  view: 'drone',
  lib: 'reactstrap',
  primary_key: 'drone_id',
  list: {
    columns: {
      drone_id: {
        id: 'drone-heading-id',
        label: 'ID'
      },
      label: {
        id: 'drone-heading-name',
        label: 'Name'
      },
      claimed: {
        class: 'text-center',
        id: 'drone-heading-claimed',
        label: 'Claimed',
      }
    },
    searchall: {
      label: 'Search',
      like: [
        'id', 'label'
      ]
    },
    actions: [
      {
        add: {
          id: 'drone-list-action-add',
          visible: () => true,
          render: (props) => <Button>Add</Button>
        },
        claim: {
          id: 'drone-list-action-claim',
          visible: () => true,
          render: (props) => <Claim {...props}/>
        },
        describe: {
          id: 'drone-list-action-describe',
          visible: () => true,
          render: (props) => <Button>Describe</Button>
        }
      }
    ]
  },

  prefilters: [

  ],

  messages: {
    emptyData: 'No drones found'
  },
  form: {
    _title: (row) => row.id === '' ? 'Add a drone' : 'Edit Drone',
    actions: {
      submit: {
        id: 'signup-action-submit',
        type: 'submit',
        _label: (row) => row.id === '' ? 'Create drone' : 'Save drone',
        style: 'primary'
      }
    },
    fields: {
      id: {
        id: 'drone-activation-id',
        label: 'ID',
        type: 'hidden',
        value: ''
      },
      select: {
        id: 'select',

        label: 'select',
        type: 'select',
        options: [
          {value: '1', label: 'one'},
          {value: '2', label: 'two'}
        ]
      },
      label: {
        id: 'drone-name',

        label: 'Name',
        type: 'text',
        help: 'A descriptive name for the drone',
        validate: {
          promises: [{
            rule: validations.required
          }],
          msg: (value, data) => 'Name required'
        }
      },
      customer: {
        id: 'drone-customer',

        label: 'Customer',
        type: 'lookup',
        value: 2,
        default: (row, field) => {
          console.log(row, field);
          return '3';
        },
        options: {
          store: (row) => [
            {id: 1, name: 'customer 1'},
            {id: 2, name: 'customer 2'},
            {id: 3, name: 'customer 3'}
          ],
          key: 'id',
          label: 'name',
          optionFitler: (row) => true
        }
      },
      sector: {
        id: 'drone-sector',
        value: Date.now(),
        label: 'Sector',
        type: 'Text'
      },
      radiolist: {
        id: 'radio-list',

        label: 'Radio list',
        type: 'radiolist',
        default: 'two',
        options: {
          one: 'One',
          two: 'Two'
        }
      },
      upload: {
        id: 'upload',
        type: 'upload',

        label: 'Upload',
        placeholder: 'Drag files here'
      },
      activation: {
        id: 'drone-activation',

        label: 'Claim',
        type: 'text',
        value: '',
        placeholder: 'Claim code',
        help: 'This will be given to the client allowing them to claim their drones'
      },

      claimed: {
        id: 'drone-claimed',

        label: 'Claimed',
        type: 'checkbox',
        value: false,
        help: '',
        vaidationState: '',
        access: {
          new: () => true
        }
      },
      claimedDate: {
        id: 'drone-claimedDate',

        label: 'Claimed date',
        type: 'date',
        access: {
          new: () => true
        }
      },
      registered: {
        id: 'drone-registered',

        label: 'Registered',
        type: 'checkbox',
        value: false,
        help: '',
        vaidationState: '',
        access: {
          new: () => true
        }
      },
      registeredDate: {
        id: 'drone-registeredDate',
        label: 'Registered date',
        type: 'date',
        access: {
          new: () => true
        }
      },

      description: {
        id: 'drone-description',

        label: 'Description',
        type: 'textarea',
        access: {
          new: () => true,
          edit: () => true
        }
      },
      rangearray: {
        id: 'range-array',
        label: 'Range Array',
        type: 'grid',
        columns: [{label: 'Min', type: fields.reactstrap.Text}]
      },
      signupname: {
        id: 'signup-name',
        label: 'Name',
        type: 'text',
        ref: 'name',
        value: '',
        placeholder: 'Name',
        validate: {
          promises: [{
            rule: validations.required
          }],
          msg: (value, data) => 'Name required'
        }
      },
    }
  }

};
