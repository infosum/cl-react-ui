import * as React from 'react';
import {Button, Form,
  FormFeedback as Feedback, FormText as HelpBlock,
  Input as FormControl, Label as ControlLabel, Modal as RModal} from 'reactstrap';
import * as fields from './fields';
import FormGroup from './fields/FormGroup';
import FormActions from './FormActions';
import * as layouts from './layouts';
import * as listActions from './list/actions';
import * as listLayouts from './listLayouts';

const Checkbox = (props) => <FormControl type="checkbox" {...props}
style={{position: 'relative', margin: 0}}
/>;

const Modal = ({showModal, close, children}) => <RModal isOpen={showModal} toggle={() => close()}>
          {children}
          </RModal>;

export default {
  Button,
  Checkbox,
  ControlLabel,
  Feedback,
  fields,
  Form,
  FormControl,
  FormActions,
  FormGroup,
  HelpBlock,
  layouts,
  listActions,
  listLayouts,
  Modal,
};
