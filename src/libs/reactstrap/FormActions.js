import React from 'react';
import {Button} from 'reactstrap';

export default ({actions, onSubmit}) => {

  const buttons = Object.keys(actions)
    .map((k: string, index: number) => {
      let {action, id, style, type, label} = actions[k],
        evnt = () => {},
        handle;

      if (action) {
        evnt = action;
      }
      if (type === 'submit') {
        handle = onSubmit;
      } else {
        handle = e => evnt(e, this);
      }

      return (<Button key={id}
        key={'form-button-' + index}
        color={style}
        onClick={handle}
        type={type ? type : 'button'}>
          {label}
      </Button>);
    });

  return <div>{buttons}</div>;
}
