/// <reference path="../interfaces.d.ts" />
import React from 'react';

interface IProps {
  data: string | number
}

export default ({data}: IProps) =>
  (<div>{data}</div>);
