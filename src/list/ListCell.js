// @flow
import React, {PropTypes, Component} from 'react';

type Props = {
  data: string | number
};

export default class ListCell extends Component {

  props: Props

  render(): React$Element<any> {
    return (<div>{this.props.data}</div>);
  }
}
