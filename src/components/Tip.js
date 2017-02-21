// @flow
/**
 * Render a React Tooltip
 */
import React, {Component} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {ListRow, TipConfig} from '../types';

type Props = {
  children?: React$Element<any>,
  config: TipConfig,
  row: ListRow
};

export default class Tip extends Component {

  props: Props

  render(): React$Element<any> {
    const {children, config, row} = this.props,
      content = <div dangerouslySetInnerHTML={config.content(row)} />,
      trigger = config.trigger ? config.trigger : ['hover', 'focus'],
      id = 'tip-' + row.id,
      tooltip = (
            <Tooltip id={id}>{content}</Tooltip>
            );

    return (
             <OverlayTrigger placement={config.position}
              trigger={trigger} overlay={tooltip}>
               <div>{children}</div>
            </OverlayTrigger>
    );
  }
}
