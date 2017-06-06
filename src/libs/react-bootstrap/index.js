import FormActions from './FormActions';
import FormGroup from './fields/FormGroup';
import {default as ButtonGroup} from './fields/ButtonGroup';
import * as layouts from './layouts';
import * as listActions from './list/actions';
import * as listLayouts from './listLayouts';
import * as fields from './fields';

import {Button, Checkbox, ControlLabel, Form, FormControl, HelpBlock, Modal as RModal} from 'react-bootstrap';

let Feedback = FormControl.Feedback;

const Modal = ({showModal, close, children}) => <RModal show={showModal} onHide={e => close(e)}>
    {children}
  </RModal>;

export default {
  Button,
  Checkbox,
  ControlLabel,
  fields,
  Feedback,
  Form,
  FormActions,
  FormControl,
  FormGroup,
  HelpBlock,
  layouts,
  listActions,
  listLayouts,
  Modal
};
