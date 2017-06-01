import * as React from 'react';
import * as layouts from './layouts';
import * as listLayouts from './listLayouts';
import FormActions from './FormActions';
import FormGroup from './fields/FormGroup';
import * as fields from './fields';
import {Button, Label as ControlLabel, FormControl,
  FormFeedback as Feedback, Form,  FormText as HelpBlock, Input, Modal as RModal} from 'reactstrap';

const Checkbox = (props) => <Input type="checkbox" {...props} 
style={{position: 'relative', margin: 0}}
/>;

const Modal = ({showModal, close, children}) => <RModal isOpen={showModal} toggle={e => close(e)}>
          {children}
          </RModal>
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
  Modal
};
