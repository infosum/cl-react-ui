/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {Button} from 'react-bootstrap';

export default ({actions, onSubmit}) => {
  const buttons = Object.keys(actions)
    .map((k: string, index: number) => {
      const {action, id, style, type, label} = actions[k];
      const evnt = () => '';
      let handle;

      if (action) {
        evnt = action;
      }
      if (type === 'submit') {
        handle = onSubmit;
      } else {
        handle = (e) => evnt(e, this);
      }

      return (<Button key={id}
        key={'form-button-' + index}
        bsStyle={style}
        onClick={handle}
        type={type ? type : 'button'}>
          {label}
      </Button>);
    });
  return <div>{buttons}</div>;
};
