// @flow
import React, {Component} from 'react';

type KeyType = {
  color: string
};

type Props = {
  keys: {[key: string]: KeyType[]},
  style: Object
};

export default class DatasourceKeys extends Component {
  props: Props

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> {
    const {keys, style} = this.props;
    let trs = [];

    Object.keys(keys).forEach((key: string, i: number) => {
      let colorBlocks = keys[key].map((key: KeyType, index: number) => {
          let k = 'datsource-key-' + index;
          return (<div key={k} style={{...style, ...{backgroundColor: key.color}}}></div>);
        }),
        trKey = 'datasource-row-key' + i,
        displayLabel = key.replace(/_/gi, ' ');
      trs.push(<tr key={trKey}>
        <td>{colorBlocks}<i className="fa fa-key"></i></td>
        <td style={{lineHeight: '75px'}}>{displayLabel}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>);
    });

    return (<tbody>
      {trs}
      </tbody>);
  }
}
