import * as React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { ITipProps } from '../interfaces';

export default ({ children, config, row }: ITipProps) => {
  const content = <div dangerouslySetInnerHTML={config.content(row)} />;
  const id = 'tip-' + row.id;

  return (
    <span>
      <span id={id}>{children}</span>
      <UncontrolledTooltip placement={config.placement} target={id}>{content}</UncontrolledTooltip>
    </span>
  );
};
