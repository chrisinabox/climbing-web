import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Loading extends Component {
  render() {
    return (
      <center><FontAwesomeIcon icon="spinner" spin size="3x" /></center>
    );
  }
}
