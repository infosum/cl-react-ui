require('babel-register');
import List from './list/List';
import Form from './form/Form';
import Icon from './components/Icon';
import * as ReactStrapFields from './libs/reactstrap/fields';
import * as ReactBootstrapFields from './libs/react-bootstrap/fields';
import * as validations from 'validate-promise';

let fields = {
  reactstrap: ReactStrapFields,
  reactBootstrap: ReactBootstrapFields
};

export {
  Form,
  Icon,
  List,
  fields,
  validations
};
