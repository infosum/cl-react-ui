import * as React from 'react';
import { Button } from 'reactstrap';

export default ({ actions, onSubmit, form }) => {

  const buttons = Object.keys(actions)
    .map((k: string, index: number) => {
      const { action, id, color, type, label, style } = actions[k];
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
        color={color}
        onClick={handle}
        style={style}
        type={type ? type : 'button'}>
        {label}
      </Button>);
    });

  return <div>{buttons}</div>;
};
