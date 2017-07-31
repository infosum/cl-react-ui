import * as React from 'react';
import { IListRow } from '../interfaces';

interface IProps {
  data: string | number;
  rowClick: (row: IListRow) => void;
}

export default ({ data }: IProps) =>
  (<div>{data}</div>);
