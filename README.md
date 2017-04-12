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
