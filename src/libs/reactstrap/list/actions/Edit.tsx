import * as React from 'react';
import { Button } from 'reactstrap';
import Icon from '../../../../components/Icon';
import { IListRow } from '../../../../interfaces';

interface IProps {
  selected: IListRow[];
  showModal: () => void;
}

const Edit: React.SFC<IProps> = ({ showModal }) => {

  return <Button onClick={() => {
    showModal();
  }}>
    <Icon icon="pencil" label="Edit" />
  </Button>;
};

export default Edit;

export {
  IProps,
};
