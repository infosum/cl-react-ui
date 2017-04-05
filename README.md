# cl-react-form
Simple react form rendering

## Forms

``` javascript
import layout from './MyFormLayout';

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
          pristine: true
        },
        label: {
          pristine: true,
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
          pristine: true,
          type: 'checkbox'
        }
      }
    }
  };

<Form
  config={config}
  layout={layout}
  errors={errors}
  onSubmit={(e: Event, data: Object) => {
   
  }} />
  ```
  
  lib: 'react-bootstrap' | 'reactstrap' 
