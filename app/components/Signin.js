import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import Header from '../components/Header';
import ComponentBase from '../components/ComponentBase'
/**
 * Signin component from accepting user's credentials to sign in
 *
 * @class Signin
 * @extends React.Component
 */
class Signin extends ComponentBase {
  /**
   * A handler to send the credentials to server side.
   *
   * @method onSubmit
   * @return {Void}
   */
  onSubmit = () => {
    AppActions.submitCredentials(this.state.email, this.state.password);
  }

  /**
   * Returns HTML when there is an error message from server side.
   *
   * @method errorMessage
   * @return {Void}
   */
  get errorMessage() {
    if(this.state.user.get('authentication_errors')){
      return (
        <div className='alert alert-danger'>
          { this.state.user.get('authentication_errors') }
        </div>
        );
    }
  }
  /**
   * Redirect to another page if the user is signed in.
   *
   * @method componentDidUpdate
   * @return {Void}
   */
  componentDidUpdate = () => {
    if(this.state.user.get('authenticated')){
      window.location = '/';
    }
  }
  /**
   * Renders the Signin component
   *
   * @method render
   * @return {JSX}
   */
  render() {
    return (
      <div className='container'>
        <Header authenticated={this.state.user.get('authenticated')} email={this.state.user.get('email')} />
        <h2>Sign In</h2>
        <div className='form-horizontal'>
          <div> {this.authenticated} </div>
          <div className='form-group'>
            <label for='email' className='col-sm-2 control-label'>Email</label>
            <div className='col-sm-10'>
              <input type='email' className='form-control' name='email' placeholder='Email'
              onChange={this.updateField } value= {this.state.email}/>
            </div>
          </div>
          <div className='form-group'>
            <label for='password' className='col-sm-2 control-label'>Password</label>
            <div className='col-sm-10'>
              <input type='password' className='form-control' name='password' placeholder='Password'
              onChange={this.updateField } value = {this.state.password}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
              onClick={ this.onSubmit } className='btn btn-primary'>Submit</button>
            </div>
          </div>
          { this.errorMessage }
        </div>
      </div>
    );
  }
}

export default Signin;
