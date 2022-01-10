/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }
    console.log('error');
    return this.props.choldren;
  }
}
