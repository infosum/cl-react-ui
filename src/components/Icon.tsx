/// <reference path="../index.d.ts" />
import * as classNames from 'classnames';
import * as React from 'react';

export default ({
  icon, color, label, pull, size, stack, inverse, spin,
}: IIconProps) => {
  if (!pull) {
    pull = '';
  }
  if (!color) {
    color = '';
  }

  if (!size) {
    size = 0;
  }

  if (!stack) {
    stack = 0;
  }

  if (!spin) {
    spin = false;
  }

  const className = classNames({
    [`fa fa-${icon}`]: true,
    [`pull-${pull}`]: pull !== '',
    [`text-${color}`]: color !== '',
    [`fa-${size}x`]: size !== 0,
    [`fa-stack-${stack}x`]: stack !== 0,
    'fa-inverse': inverse,
    'fa-spin': spin,
  });
  if (!label) {
    return <span><i className={className} /></span>;
  }
  return <span>
    <i className={className} ></i>
    {' '}{label}
  </span>;
};
