/* tslint:disable:no-var-require */
// require('babel-register');
import * as validations from 'validate-promise';
import Icon from './components/Icon';
import enhanceWithModal from './enhancers/modal';
import Form from './form/Form';
import * as ReactBootstrapFields from './libs/react-bootstrap/fields';
import * as ReactBootstrapListActions from './libs/react-bootstrap/list/actions';
import * as ReactStrapFields from './libs/reactstrap/fields';
import * as ReactStrapListActions from './libs/reactstrap/list/actions';
import PageSize from './libs/reactstrap/list/PageSize';
import Paginator from './libs/reactstrap/list/Paginator';
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
  enhanceWithModal,
  Form,
  Icon,
  List,
  Paginator,
  PageSize,
  listActions,
  ListFilters,
  fields,
  validations,
};
