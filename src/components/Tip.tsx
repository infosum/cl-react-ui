import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ITipProps } from '../../index';

export default ({ children, config, row }: ITipProps) => {
        const content = <div dangerouslySetInnerHTML={config.content(row)} />;
        const trigger = config.trigger ? config.trigger : ['hover', 'focus'];
        const id = 'tip-' + row.id;
        const tooltip = (
                <Tooltip id={id}>{content}</Tooltip>
        );

        return (
                <OverlayTrigger placement={config.position}
                        trigger={trigger} overlay={tooltip}>
                        <div>{children}</div>
                </OverlayTrigger>
        );
};
