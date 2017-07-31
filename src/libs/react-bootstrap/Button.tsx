import * as React from 'react';
import { Button } from 'react-bootstrap';

export default ({ className, style, handle, label, type = 'button' }) => {

  return <Button type="button"
    bsStyle={style}
    className={className}
    onClick={handle}
  >
    {label}
  </Button>;
};
