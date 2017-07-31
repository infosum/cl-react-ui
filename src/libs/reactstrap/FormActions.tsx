import * as React from 'react';
import { Button } from 'reactstrap';

export default ({ actions, onSubmit, form }) => {

  const buttons = Object.keys(actions)
    .map((k: string, index: number) => {
      const { action, id, style, type, label } = actions[k];
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
        color={style}
        onClick={handle}
        type={type ? type : 'button'}>
        {label}
      </Button>);
    });

  return <div>{buttons}</div>;
};
