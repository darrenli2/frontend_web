import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
/**
 * Head common component
 *
 * @class Header
 * @extends React.Component
 */
class Header extends Component {
  /**
   * A handler for when the user is signed out.
   *
   * @method signOut
   * @return {Void}
   */
  signOut = () => {
    localStorage.removeItem('jwtToken');
    window.location = '/';
  }

  /**
   * Returns HTML for the links in the header.
   *
   * @method combination
   * @return {Void}
   */
  get combination() {
    if(this.props.authenticated){
      return (<ul className='nav nav-pills pull-right'>
                 <li role='presentation'><a href='/' >Home</a></li>
                <li role='presentation'><a onClick={this.signOut} >Sign Out</a></li>
            </ul>);
    }else{
      return(
            <ul className='nav nav-pills pull-right'>
                 <li role='presentation'><a href='/' >Home</a></li>
                <li role='presentation'><a href='/sign_up'>Sign Up</a></li>
                <li role='presentation'><a href='/sign_in' >Sign In</a></li>
            </ul>
      );
    }
  }

  /**
   * Renders the Header component
   *
   * @method render
   * @return {JSX}
   */
  render() {
    return (
        <div className="header clearfix">
          <nav>
            { this.combination }
          </nav>
        </div>
    );
  }
}

export default Header;
