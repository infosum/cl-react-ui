// @flow
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {getToken} from '../../../../app/utils/auth';
import {User} from '../../../../types';

type PropType = {
  update: () => {},
  selected: Array<Object>,
  config: Object,
  user: User,
  isVisible: boolean,
  filter: () => {}
};

/**
 * Toggle properties on a list's rows
 */
export default class Toggle extends Component {

  state: {}

  /**
   * Constructor
   * @param {Object} props Props
   */
  constructor(props: PropType) {
    super(props);
    this.state = {};
  }

  /**
   * Update selected rows
   * @param {Event} e .
   */
  handleClick(e: Event) {
    e.preventDefault();
    const token = getToken();
    let {update, selected, config, user, filter} = this.props;
    selected = filter(user, selected);

    this.setState(config.update);
    update(selected, token, config.update);
  }

  /**
   * Render
   * @return {Dom} node
   */
  render(): React$Element<any> | null {
    const {isVisible, config} = this.props;
    if (!isVisible) {
      return null;
    }
    return (<Button onClick={e => this.handleClick(e)} >
        <i className={config.icon}></i> {config.label}
      </Button>);
  }
}
