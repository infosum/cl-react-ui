/* tslint:disable:no-var-require */
require('babel-register');
import * as validations from 'validate-promise';
import Icon from './components/Icon';
import Form from './form/Form';
import * as ReactBootstrapFields from './libs/react-bootstrap/fields';
import * as ReactStrapFields from './libs/reactstrap/fields';
import List from './list/List';

const fields = {
  reactBootstrap: ReactBootstrapFields,
  reactstrap: ReactStrapFields,
};

export {
  Form,
  Icon,
  List,
  fields,
  validations,
};
