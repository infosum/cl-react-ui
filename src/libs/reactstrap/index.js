import Date from './fields/Date';
import Checkbox from './fields/Checkbox';
import FormActions from './FormActions';
import FormGroup from './fields/FormGroup';
import Hidden from './fields/Hidden';
import Lookup from './fields/Lookup';
import Password from './fields/Password';
import Radiolist from './fields/Radiolist';
import Select from './fields/Select';
import Text from './fields/Text';
import Textarea from './fields/Textarea';
import Upload from './fields/Upload';
import * as layouts from './layouts';
import * as listLayouts from './listLayouts';

import {Button, Label as ControlLabel, FormControl,
  FormFeedback as Feedback, Form, FormText as HelpBlock} from 'reactstrap';

// @todo implement these...
// let fields = {
//     ButtonGroup,
//   };

  let fields = {
    Checkbox,
    Date,
    Hidden,
    Lookup,
    Password,
    Radiolist,
    Select,
    Text,
    Textarea,
    Upload
  };

export {
  Button,
  ControlLabel,
  fields,
  Feedback,
  Form,
  FormActions,
  FormControl,
  FormGroup,
  HelpBlock,
  layouts,
  listLayouts
};
