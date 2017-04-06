import React from 'react';
import Rangearraycustom from './fields/Rangearraycustom';

export default {
  view: 'drone',
  lib: 'reactstrap',
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
      // claimed: {
      //   class: 'text-center',
      //   id: 'drone-heading-claimed',
      //   label: 'Claimed',
      //   render: claim,
      //   config: {},
      //   tip: {
      //     position: 'top',
      //     content: ((row: Drone): UnsafeHTML => {
      //       const claimDate = moment(row.claimedDate).format('L, LT'),
      //         msg = row.claimed ?
      //           '<strong>Claimed on: </strong>' + claimDate :
      //           '<strong>Not claimed</strong>';
      //       return {__html: xss('<span>' + msg + '</span>')};
      //     })
      //   }
      // },
      // registered: {
      //   class: 'text-center',
      //   id: 'drone-heading-registered',
      //   label: 'Registered',
      //   render: check,
      //   config: {},
      //   tip: {
      //     position: 'top',
      //     content: ((row: Drone): UnsafeHTML => {
      //       const regDate = moment(row.registeredDate).format('L, LT'),
      //         msg = row.registered ?
      //           '<strong>Registered on: </strong>' + regDate :
      //           '<strong>Not registered</strong>';
      //       return {__html: xss('<span>' + msg + '</span>')};
      //     })
      //   }
      // }
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
          render: () => <button>Add</button>
        },
        claim: {
          id: 'drone-list-action-claim',
          visible: () => true,
          render: () => <button>Claim</button>
        },
        describe: {
          id: 'drone-list-action-describe',
          visible: () => true,
          render: () => <button>Describe</button>
        }
      }
    ]
  },

  prefilters: [
    {
      field: 'claimed',
      operator: '=',
      value: true
    }
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
        validate: [
          (v) => v !== '' ? 'success' : 'error'
        ]
      },
      customer: {
        id: 'drone-customer',

        label: 'Customer',
        type: 'lookup',
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
        help: 'This will be given to the client allowing them to claim their drones',
        vaidationState: '',
        validate: []
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
        vaidationState: '',
        validate: [],
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
        vaidationState: '',
        validate: [],
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
        type: Rangearraycustom
      }
    }
  }

};
