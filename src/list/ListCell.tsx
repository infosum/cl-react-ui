import * as React from 'react';
import { IListRow } from '../../index';

interface IProps {
  data: string | number;
  rowClick: (row: IListRow) => void;
}

export default ({ data }: IProps) =>
  (<div>{data}</div>);
