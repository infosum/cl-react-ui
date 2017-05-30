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