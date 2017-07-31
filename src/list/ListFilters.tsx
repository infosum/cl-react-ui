import * as React from 'react';
import { Component } from 'react';
import { IListFilterProps } from '../interfaces';
import * as filters from '../libs/reactstrap/list/filters';

class ListFilters extends Component<IListFilterProps, any> {

  private onBlur(name, value) {
    console.log('on Blur', name, value);
  }
  public render() {
    const { config } = this.props;
    if (!config.list.filters) {
      return;
    }
    console.log(config.list.filters);
    return <div>List Filters
            {
        Object.keys(config.list.filters).map((name) => {
          const filter = config.list.filters[name];
          const FilterType = filters[filter.type];
          const field = config.form.fields[name];
          if (!field) {
            console.error('no field found for ' + name);
          }
          return <FilterType
            field={field}
            value=""
            name={name}
            onBlur={this.onBlur.bind(this)} />;
        })
      }
    </div>;
  }
}

export default ListFilters;
