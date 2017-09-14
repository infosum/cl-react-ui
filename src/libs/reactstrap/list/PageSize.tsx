import * as React from 'react';
import { Input } from 'reactstrap';
import Icon from '../../../components/Icon';
import { IPagination } from '../../../interfaces.d';

interface IProps {
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  sizes?: number[];
}

const PageSize: React.SFC<IProps> = ({ pagination, setPagination, sizes }) => {
  const { total, limit, offset } = pagination;
  const maxOffset = Math.ceil(total / limit);
  return <Input type="select"
    onChange={(e) => {
      setPagination({ ...pagination, limit: Number(e.target.value) });
    }}>
    {
      sizes.map((size) => <option key={size} value={size}>{size}</option>)
    }
  </Input>;
};

PageSize.defaultProps = {
  sizes: [10, 20, 50, 100],
};

export default PageSize;
