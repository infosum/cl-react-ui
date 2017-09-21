import * as React from 'react';
import { Button } from 'react-bootstrap';

export default ({ actions, form, onSubmit }) => {
  const buttons = Object.keys(actions)
    .map((k: string, index: number) => {
      const { action, id, color, style, type, label } = actions[k];
      let evnt;
      let handle;

      if (action) {
        evnt = action;
      }
      if (type === 'submit') {
        handle = onSubmit;
      } else {
        handle = (e) => evnt(e, form);
      }

      return (<Button
        key={id}
        bsStyle={color}
        style={style}
        onClick={handle}
        type={type ? type : 'button'}>
        {label}
      </Button>);
    });
  return <div>{buttons}</div>;
};
