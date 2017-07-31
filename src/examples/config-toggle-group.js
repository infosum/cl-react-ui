import React from 'react';
import { Button } from 'reactstrap';
import { fields, validations } from '../index';

const Claim = ({ selected }) => {
  return <Button onClick={(e) => console.log('selected', selected)}>Claim</Button>;
};

export default {
  view: 'toggle-group',
  lib: 'reactstrap',
  list: {
    columns: {
      id: {
        id: 'heading-id',
        label: 'ID'
      },
      type: {
        id: 'heading-type',
        label: 'Type'
      }
    },
    searchall: {
      label: 'Search',
      like: [
        'id', 'label'
      ]
    }
  },
  prefilters: [
  ],
  messages: {
    emptyData: 'No data found'
  },
  form: {

    actions: {
      submit: {
        id: 'signup-action-submit',
        type: 'submit',
        _label: (row) => row.id === '' ? 'Create' : 'Update',
        style: 'primary'
      }
    },
    fields: {
      id: {
        id: 'id',
        label: 'ID',
        type: 'hidden',
        value: ''
      },
      type: {
        id: 'select',
        onChange: (form) => {
          console.log('on change', form.state);
          if (form.state.data.type === '1') {
            form.hideField('toggle');
          } else {
            form.showField('toggle');
          }
        },
        label: 'Select field group',
        type: 'select',
        options: [
          { value: '1', label: 'one' },
          { value: '2', label: 'two' }
        ]
      },
      toggle: {
        id: 'toggle',
        label: 'toggle 1',
        type: 'text'
      }
    }
  }

};
