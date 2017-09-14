import * as React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import Icon from '../../../components/Icon';
import { IPagination } from '../../../interfaces.d';

interface IProps {
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
}

const Pagination: React.SFC<IProps> = ({ pagination, setPagination }) => {
  const { total, limit, offset } = pagination;
  const maxOffset = Math.floor(total / limit);
  return <ButtonGroup>
    <Button
      disabled={offset === 0}
      onClick={() => setPagination({ ...pagination, offset: 0 })} >
      <Icon icon="angle-double-left" />
    </Button>
    <Button
      disabled={offset === 0}
      onClick={() => setPagination({ ...pagination, offset: offset > 0 ? offset - 1 : 0 })} >
      <Icon icon="angle-left" />
    </Button>

    <Button
      disabled={offset === maxOffset}
      onClick={() => setPagination({ ...pagination, offset: offset < maxOffset ? offset + 1 : maxOffset })} >
      <Icon icon="angle-right" />
    </Button>
    <Button
      disabled={offset === maxOffset}
      onClick={() => setPagination({ ...pagination, offset: maxOffset })} >
      <Icon icon="angle-double-right" />
    </Button>
  </ButtonGroup>;
};

export default Pagination;
