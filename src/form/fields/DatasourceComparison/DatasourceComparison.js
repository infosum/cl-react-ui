// @flow
import React, {PropTypes, Component} from 'react';
import {Table} from 'react-bootstrap';
import store from '../../../../store';
import DatasourceKeys from './DatasourceKeys';
import PercentBar from '../../../widgets/PercentBar';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {DroneColumn} from '../../../../../types';
import dataToValue from '../../../../utils/grpc';

type PercentileInfo = {
  percentile: number,
  value: string
};

export default class DatasourceComparison extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  /**
   * For 2 or more datasets.
   * For each column work out min and max counts (over all datasets)
   * then work out the percentage
   * difference between these two arrays. The higher the percentage
   * the greater the intersection between the data sets
   * @param {Array} sets 1 or more sets of data to compare
   * @return {String} Percentage
   */
  intersect(sets: Array<number[]>) {
    let intersect, lowestSum, highestSum,
      lowest,
      highest,
      res = {};

    if (sets.length < 2) {
      return '';
    }

    // Loop over all sets
    sets.forEach((set: number[]) => {
      // And for each column per set
      set.forEach((v: number, k: number) => {
        if (!res[k]) {
          res[k] = {max: v, min: v};
        }

        res[k].max = Math.max(res[k].max, v);
        res[k].min = Math.min(res[k].min, v);
      });
    });

    // Array of lowest/highest counts per column across datasets
    lowest = Object.keys(res).map(k => res[k].min);
    highest = Object.keys(res).map(k => res[k].max);

    // Sum these
    lowestSum = lowest.reduce((a, b) => a + b, 0);
    highestSum = highest.reduce((a, b) => a + b, 0);

    // Intersect calculation - 100% = counts per columns are exactly the same
    intersect = (lowestSum / highestSum) * 100;

    return intersect.toFixed(2) + '%';
  }

  /**
   * @param {Array.Object} percentiles Drone summary info
   * @return {Array} chart y values
   */
  percentileToY(percentiles: [{percentile: number, value: number}]): number[] {
    return percentiles
      .map((row: {percentile: number, value: number}, i: number) => {
        let diff, prev, percentileDiff;
        if (i === 0) {
          prev = {value: 0};
          percentileDiff = row.percentile;
        } else {
          prev = percentiles[i - 1];
          percentileDiff = row.percentile - percentiles[i - 1].percentile;
        }

        diff = row.value - prev.value === 0 ? 1 : row.value - prev.value;
        return (percentileDiff * percentileDiff) / diff;
      });
  }

  /**
   * Create a color block
   * @param {Array} column Current db table column
   * @param {Object} style CSS
   * @return {Array} Color block divs
   */
  colorBlock(column, style: Object): React$Element<any>[] {
    return column.map(col => <div key={'complied-row-' + col.color}
      style={{...style, ...{backgroundColor: col.color}}}></div>);
  }

  /**
   * Create data sets from column percentiles
   * @param {Array} column Current db table column
   * @return {Array} data sets
   */
  sets(column) {
    return column.map(col => {
      let percentiles = this.getPercentiles(col);

      percentiles = this.percentileToY(percentiles);
      if (percentiles.length === 0 && col.attributes.uniques) {
        // Check unique values
        col.attributes.uniques.forEach(unique => {
          let k = Object.keys(unique.value)[0];
          percentiles.push({percentile: unique.value[k], value: unique.count});
        });
      }
      return percentiles;
    });
  }

  /**
   * Get the percentile values for a single datasource's column.
   * @param {Object} col Column
   * @return {Array} Percentile information {percentile: 'name', value: v}
   */
  getPercentiles(col): PercentileInfo[] {
    return [1, 10, 25, 50, 75, 90, 99]
      .filter(q => col.attributes.hasOwnProperty('q' + q))
      .map(q => ({percentile: parseFloat(q), value: col.attributes['q' + q]}));
  }

  /**
   * Does the column data contain a sensible number of uniques to show
   * @param {Array} column Current db table column(s)
   * Multiple if datasources contain the same column
   * @return {Bool} Show uniques
   */
  hasUniques(column: Array<any>) {
    return column.filter(col =>
      col.attributes.uniques && col.attributes.uniques.length > 0
      && col.attributes.uniques.length < 10).length > 0;
  }

  /**
   * Build bar charts for columns with uniques data sets
   * @param {String} key Column name
   * @param {Array} column Current db table column
   * @return {Array} Dom nodes
   */
  uniques(key: string, column: Array<any>): React$Element<any> | null {
    let BarChart,
      res = {datasets: [], labels: []},
      chartOptions = {
        responsive: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        options: {
          tooltipCaretSize: 0,
          title: {
            display: false
          }
        }
      };

    if (window === undefined) {
      return null;
    }
    // Avoid universal loading on server
    BarChart = require('react-chartjs').Bar;

    column.forEach((col, index: number) => {
      res.datasets.push({
        label: key,
        backgroundColor: col.color,
        data: null
      });

      res.labels = col.attributes.uniques
        .map(c => dataToValue(c.value, 'type'));

      res.datasets[index].data = col.attributes.uniques.map(c => c.count);
    });

    return <BarChart data={res}
      options={chartOptions}
      width="160" height="75"
      redraw />;
  }

  /**
   * Build a spark line chart
   * @param {Array} column Current db table column
   * @param {Array} sets Datasets
   * @return {Array} Dom nodes
   */
  sparkLine(column, sets): React$Element<any>[] {
    return sets.map((set, i: number) => {
      let color = column[i].color,
        sparkLineKey = 'spark-link-key' + i;
      return (
      <div style={{width: '150px', position: 'absolute', top: '0px'}} key={sparkLineKey}>
        <Sparklines data={set} limit={7} width={160} height={75} margin={5}>
          <SparklinesLine color={color} />
        </Sparklines>
      </div>);
    });
  }

  /**
   * Create bar line charts
   * @param {Array} column Current db table column
   * @return {Array} Dom nodes
   */
  bars(column): React$Element<any>[] | null {
    return column
      .filter(col => col.attributes.nulls !== undefined)
      .map((col, index: number) => {
        let r = 100 - ((parseInt(col.attributes.nulls, 10) / col.total) * 100),
          divBarKey = 'div-bar-key' + index;
        r = r.toFixed(2);
        return (<PercentBar value={r} color={col.color} key={divBarKey}
        height={20} width={100} padding={4} />);
      });
  }

  /**
   * Render
   * @return {Node} Dom
   */
  render(): React$Element<any> | null {
    const {row} = this.props,
      ids = row.selectedDataSources.map(selected => selected.value);

    let sel = [],
      style = {
        width: '10px', height: '10px', margin: '2px', display: 'inline-block',
        marginTop: '32px'
      },
      state = store.getState(),
      i,
      compiled: {[key: string]: DroneColumn[]} = {},
      compiledKeys: {[key: string]: DroneColumn} = {},
      trs = [];

    sel = state.datajoinApp.drones.data
      .filter(drone => ids.indexOf(drone.drone_id) !== -1);

    for (i = 0; i < sel.length; i++) {
      let drone = sel[i],
        color = drone.color;

      Object.keys(drone.columns).forEach((column: string) => {
        if (!compiled.hasOwnProperty(column)) {
          compiled[column] = [];
        }
        compiled[column].push(
          {
            color,
            attributes: drone.columns[column],
            total: drone.table_length
          });
      });

      Object.keys(drone.keys).forEach((key: string) => {
        if (!compiledKeys.hasOwnProperty(key)) {
          compiledKeys[key] = [];
        }
        compiledKeys[key].push({color});
      });
    }

    Object.keys(compiled).forEach((label: string) => {
      let column = compiled[label],
        colorBlocks = this.colorBlock(column, style),
        sets = this.sets(column),
        hasUniques = this.hasUniques(column),
        sparks = hasUniques ? null : this.sparkLine(column, sets),
        uniques = hasUniques ? this.uniques(label, column) : null,
        displayLabel = label.replace(/_/gi, ' '),
        intersect = this.intersect(sets),
        intersectStyle = {
          fontFamily: '\'Archivo Black\', sans-serif',
          textAlign: 'center'
        };

      trs.push(
        <tr key={'compiled-row-' + label} style={{height: '75px'}}>
          <td>{colorBlocks}</td>
          <td style={{lineHeight: '75px'}}>{displayLabel}</td>
          <td style={{position: 'relative'}}>
            {sparks} {uniques}
          </td>
          <td style={{paddingTop: '25px'}}>
            {this.bars(column)}
          </td>
           <td style={intersectStyle}>
            {intersect}
          </td>
        </tr>
      );
    });


    if (trs.length === 0) {
      return null;
    }

    return (<Table condensed hover>
    <thead>
      <tr>
        <th style={{width: '5%'}}>-</th>
        <th style={{width: '20%'}}>Column</th>
        <th style={{width: '20%'}}>Distribution</th>
        <th>Health</th>
        <th style={{textAlign: 'center'}}>Intersect</th>
      </tr>
    </thead>
      <DatasourceKeys keys={compiledKeys} style={style} />
      <tbody>
      {trs}
      </tbody>
    </Table>);
  }
}
