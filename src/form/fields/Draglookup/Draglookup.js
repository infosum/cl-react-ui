// @flow
import React from 'react';
import {FormControl, PanelGroup, Panel} from 'react-bootstrap';
import store from '../../../../store';
import Lookup from '../Lookup';
import DraglookupItem from './DragLookupItem';
import {DOMEvent, Drone, Field, ListRow} from '../../../../../types';

type Props = {
  field: Field,
  value: string,
  onChange: Function,
  row: ListRow
};

/**
 * Drag lookup
 */
class Draglookup extends Lookup {

  props: Props

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: Props) {
    super(props);
    this.state = {dropped: []};
  }

  /**
   * Convert the data into <options>
   * @param {Object} storeData List data
   * @param {String} filter Search string filter
   * @return {Array.Node|null} Dom nodes or null if no items
   */
  mapDataToOpts(storeData: Object) {
    let allOpts = [],
      i = 1,
      panelKey, header,
      matched = 0;
    Object.keys(storeData).forEach((optGroup: string) => {
      let thisOpts = storeData[optGroup].filter(this.filterItem.bind(this));
      matched += thisOpts.length;
      if (thisOpts.length > 0) {
        header = optGroup === 'undefined' ? '' : optGroup;
        panelKey = 'drag-lookup-panel-' + header;
        allOpts.push(
          <Panel header={header} eventKey={i} key={panelKey}>
            <ul>
              {thisOpts.map(this.makeItem.bind(this))}
            </ul>
          </Panel>);
      }
      i++;
    });

    if (matched === 0) {
      return (<Panel header="No Results found"
        eventKey={i} key="'drag-lookup-panel-empty">
    </Panel>);
    }
    return allOpts;
  }

  /**
   * Filter the items based on search criteria
   * @param {Object} option group name
   * @param {Integer} k Index
   * @return {Bool} Show or not
   */
  filterItem(option: Object, k: number) {
    const {field, row} = this.props,
      options = field.options;
    let key = options.key,
      label = options.label,
      pattern = new RegExp(this.state.search, 'i'),
      visible,
      // Ids to hide as they are already in the drop target:
      ids = row.selectedDataSources.map(selected => selected.value),
      optionFilter = options.optionFitler === undefined ?
        row => true : options.optionFitler;

    if (optionFilter(option)) {
      visible = ids.indexOf(option[key]) === -1;
      if (option[label].match(pattern) && visible) {
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Make an item
   * @param {Object} drone group name
   * @param {Integer} k Index
   * @return {Node} Dom node
   */
  makeItem(drone: Drone, k: number) {
    const {field} = this.props,
      options = field.options,
      ref = 'lookup-option-' + k,
      label = options.label;

    return <DraglookupItem key={ref}
      value={drone.drone_id}
      color={drone.color}
      onDrop={e => this.onDrop(e)}
      label={drone[label]} />;
  }

  /**
   * Force a re-draw of the list when one of it's items is dropped
   * in a drop target.
   * @param {Object} item Dropped item properties
   */
  onDrop(item: Object) {
    this.setState({});
  }
  /**
   * Handle the serach
   * @param {Event} e .
   */
  handleChange(e: DOMEvent) {
    this.setState({search: e.target.value});
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    let storeData = this.getStoreData(store.getState()),
      opts = this.mapDataToOpts(storeData, this.state.search);

    return (<div className="Form___Draglookup">
        <FormControl type="text" placeholder="Filter..."
          onChange={(e: DOMEvent) => {
            this.handleChange(e);
          }} />
      <PanelGroup defaultActiveKey={1} accordion>
        {opts}
      </PanelGroup>
    </div>);
  }
}

export default Draglookup;
