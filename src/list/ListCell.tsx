/// <reference path="../index.d.ts" />
import * as React from 'react';

interface IProps {
  data: string | number;
  rowClick: (row: IListRow) => void;
}

export default ({ data }: IProps) =>
  (<div>{data}</div>);
