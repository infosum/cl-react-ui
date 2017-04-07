require('babel-register');
import List from './list/List';
import Form from './form/Form';
import * as ReactStrapFields from './libs/reactstrap/fields';
import * as ReactBootstrapFields from './libs/react-bootstrap/fields';
let fields = {
  reactstrap: ReactStrapFields,
  reactBootstrap: ReactBootstrapFields
};

export {
  Form,
  List,
  fields
};
