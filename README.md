# cl-react-form
Simple react form rendering

## Forms

``` javascript
import layout from './MyFormLayout';
import {validations} from 'cl-react-ui';

const config = {
    view: 'example',
    lib : 'reactstrap',
    form: {
      actions: {
        submit: {
          id: 'upload-action-submit',
          type: 'submit',
          label: 'Upload',
          style: 'primary'
        }
      },
      fields: {
        id: {
          type: 'hidden'
        },
        name: {
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
        label: {
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
        checkbox: {
          type: 'checkbox'
        }
      }
    }
  };

<Form
  config={config}
  layout={layout}
  errors={errors}
  title="override title (can be a function or string)"
  onSubmit={(e: Event, data: Object) => {

  }} />
  ```

  lib: 'react-bootstrap' | 'reactstrap'

## Validations

Validations use the validate-promise library

## Errors

Form errors should be an object, keyed on the field name, whose values are an array of error messages

```javascript

let errors = {
  name: ['Please enter a name', 'Cheese is not a proper name']
};

```
## Lists

``` javascript
render() {

  const config = {
    view: 'example',
    lib : 'reactstrap',
    list: {
      columns: {
        id: {
          label: 'ID'
        },
        name: {
          label: 'Name'
        },
      }
    },
    messages: {
      emptyData: 'No records found',
    },
  }
  const data = [
    {id: '1', name: 'one'},
    {id: '2', name: 'two'}
  ];

// Hooks into various list events, this is a good place to bind your redux actions
  const listActions = {
    add: (view, state) => {
      this.props.save(state);
    },
    setForm: (view, row) => null, // A row is selected for editing
    selectRow: () => null, // A Row is selected
  }
  
  return <List 
      config={config} 
      data={data}
      access={{
        add: true,
      }}
      actions={listActions}>
      {({actions, handleUpdate, showModal, close}) => <Modal isOpen={showModal} toggle={close}>
            <Form
              actions={{close: {
                action: close,
                id: 'modal-close',
                label: 'Close',
                type: 'button',
              }}}
              data={{            // Initial form data
                name: 'three',
              }}
              formUpdate={actions.formUpdate}
              layout="Modal"
              config={config}
              onSubmit={(e, state) => handleUpdate(e, state)}
            />
        </Modal>
          }
    <List>
}
```

# Icon

Renders a font-awesome icon

``` javascript
import {Icon} from 'cl-react-ui';

<Icon
  icon: string,
  color?: string,
  label?: string,
  pull?: string,
  size?: 0 | 1 | 2 | 3 | 4 | 5,
  stack: number,
  inverse: boolean,
  spin: boolean />
```

# Examples

To build the example form and list :

```
cd src/examples
npm run-script build
google-chrome index.html
```
