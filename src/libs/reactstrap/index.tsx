import * as React from 'react';
import {Button, Form, FormControl,
  FormFeedback as Feedback, FormText as HelpBlock,  Input, Label as ControlLabel, Modal as RModal} from 'reactstrap';
import * as fields from './fields';
import FormGroup from './fields/FormGroup';
import FormActions from './FormActions';
import * as layouts from './layouts';
import * as listLayouts from './listLayouts';

const Checkbox = (props) => <Input type="checkbox" {...props}
style={{position: 'relative', margin: 0}}
/>;

const Modal = ({showModal, close, children}) => <RModal isOpen={showModal} toggle={(e) => close(e)}>
          {children}
          </RModal>;
export {
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
  listLayouts,
  Modal,
};
