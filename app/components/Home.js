import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import Header from '../components/Header'
import ComponentBase from '../components/ComponentBase'
/**
 * Home component
 *
 * @class Home
 * @extends React.Component
 */
class Home extends ComponentBase {
  /**
   * Renders the Home component
   *
   * @method render
   * @return {JSX}
   */
  render() {
    return (
        <div className='container'>
          <Header authenticated={this.state.user.get('authenticated')} email={this.state.user.get('email')} />
          <h4>Welcome {this.state.user.get('email')} !  </h4>
         <img
          alt='This is a duck.'
          className='duck'
          src= '/img/Duck.jpg' />
        </div>
    );
  }
}

export default Home;
