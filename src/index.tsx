/* tslint:disable:no-var-require */
// require('babel-register');
import * as validations from 'validate-promise';
import Icon from './components/Icon';
import Form from './form/Form';
import * as ReactBootstrapFields from './libs/react-bootstrap/fields';
import * as ReactBootstrapListActions from './libs/react-bootstrap/list/actions';
import * as ReactStrapFields from './libs/reactstrap/fields';
import * as ReactStrapListActions from './libs/reactstrap/list/actions';
import List from './list/List';
import ListFilters from './list/ListFilters';

const fields = {
  reactBootstrap: ReactBootstrapFields,
  reactstrap: ReactStrapFields,
};

const listActions = {
  reactBootstrap: ReactBootstrapListActions,
  reactstrap: ReactStrapListActions,
};

export {
  Form,
  Icon,
  List,
  listActions,
  ListFilters,
  fields,
  validations,
};
