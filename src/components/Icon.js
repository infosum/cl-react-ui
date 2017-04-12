// @flow
import React, {Element} from 'react';
import classNames from 'classnames';

type Props = {
  icon: string,
  color?: string,
  label?: string,
  pull?: string,
  size?: 0 | 1 | 2 | 3 | 4 | 5,
  stack: number,
  inverse: boolean,
  spin: boolean
};

export default ({
  icon, color, label, pull, size, stack, inverse, spin
}: Props): Element<*> => {
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

  let className = classNames({
    [`fa fa-${icon}`]: true,
    [`pull-${pull}`]: pull !== '',
    [`text-${color}`]: color !== '',
    [`fa-${size}x`]: size !== 0,
    [`fa-stack-${stack}x`]: stack !== 0,
    'fa-inverse': inverse,
    'fa-spin': spin
  });
  if (!label) {
    return <span><i className={className} /></span>;
  }
  return <span>
          <i className={className} ></i>
          {' '}{label}
        </span>;
};
