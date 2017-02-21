// @flow
import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {getEmptyImage} from 'react-dnd-html5-backend';

type Props = {
  color: string,
  connectDragPreview: Function,
  connectDragSource: Function,
  isDragging?: boolean,
  key: string,
  label: string,
  left?: number,
  option: Object,
  top?: number,
  value: string
};

/**
 * A data source drag item
 */
class DraglookupItem extends Component {

  props: Props

  /**
   * Mount react component
   */
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  /**
   * Create the tip markup
   * @return {JSX} tip
   */
  tip(): React$Element<any> {
    const {option} = this.props;
    return (<Tooltip id="tooltip">
              <strong>Stats</strong>
              <br />
              {option.table_length} records
            </Tooltip>);
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    const {connectDragSource, key, value, label, color} = this.props,
      style = {
        width: '7px', height: '7px', margin: '1px 3px', display: 'inline-block',
        backgroundColor: color,
        border: '1px solid #EBEBEB'
      };
    return connectDragSource(
    <li style={{cursor: 'move'}}
      value={value} key={key}>
      <OverlayTrigger overlay={this.tip()}>
        <div>
          <div style={style}></div>{label}
        </div>
      </OverlayTrigger>
     </li>);
  }
}

/**
 * Implements the drag source contract.
 */
const dragLookupSource = {
  /**
   * Create the drag item's properties
   * @param {Object} props Props
   * @return {Object} Drag item props
   */
  beginDrag(props: Props) {
    return {
      value: props.value,
      label: props.label,
      color: props.color,
      option: props.option,
      left: props.left,
      top: props.top
    };
  },

  endDrag(props: Props, monitor: DragSourceMonitor, component: any) {
    if (monitor.didDrop()) {
      component.props.onDrop(props);
    }
  }
};

/**
 * Specifies the props to inject into your component.
 * @param {Object} connect .
 * @param {Object} monitor .
 * @return {Object} Tracks drag and drop state
 */
function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource('DRAGLOOKUP_STUFF', dragLookupSource, collect)(DraglookupItem);
