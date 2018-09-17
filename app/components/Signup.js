import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import Header from '../components/Header'
import ComponentBase from '../components/ComponentBase'
import ReCAPTCHA from 'react-google-recaptcha';
/**
 * Signup component
 *
 * @class Signup
 * @extends React.Component
 */
class Signup extends ComponentBase {
  /**
   * Check if user is authenticated or has registered successfully
   *
   * @method componentDidUpdate
   * @return {Void}
   */
  componentDidUpdate = () => {
    if(this.state.user.get('authenticated')){
      window.location = '/';
    }
    if(this.state.user.get('registered')){
      window.location = '/sign_in';
    }
  }
  /**
   * Submit user's signup information to server
   *
   * @method onSubmit
   * @return {Void}
   */
  onSubmit = (email, password, password_confirmation) => {
    AppActions.submitSignupInformation(this.state.email, this.state.password, this.state.password_confirmation, this.state.recaptcha_response);
  }
  /**
   * Set recaptcha response from google's server response.
   *
   * @method recaptchaOnChange
   * @return {Void}
   */
  recaptchaOnChange = (response) => {
    this.setState({recaptcha_response: response});
  }
  /**
   * Returns HTML when there is an error message from server side.
   *
   * @method errorMessage
   * @return {Void}
   */
  get errorMessage() {
    if(this.state.user.get('registration_errors')){
      return (
        <div className='alert alert-danger'>
          { this.state.user.get('registration_errors') }
        </div>
        );
    }
  }

  /**
   * Renders the Signup component
   *
   * @method render
   * @return {JSX}
   */
  render() {
    return (
      <div className='container'>
        <Header authenticated={this.state.user.get('authenticated')} email={this.state.user.get('email')} />
        <h2>Sign Up</h2>
        <div className='form-horizontal'>
          <div> {this.authenticated} </div>
          <div className='form-group'>
            <label for='email' className='col-sm-4 control-label'>Email</label>
            <div className='col-sm-8'>
              <input type='email' className='form-control' name='email' value={this.state.email}  placeholder='Email' onChange= {this.updateField}/>
            </div>
          </div>
          <div className='form-group'>
            <label for='password' className='col-sm-4 control-label'>Password</label>
            <div className='col-sm-8'>
              <input type='password' className='form-control' value={this.state.password} name='password' placeholder='Password' onChange= {this.updateField}/>
            </div>
          </div>
          <div className='form-group'>
            <label for='password-confirmation' className='col-sm-4 control-label'>Password Confirmation</label>
            <div className='col-sm-8'>
              <input type='password' className='form-control'
                                    name='password_confirmation'
                                    value={ this.state.password_confirmation}
                                    onChange={this.updateField}
                                     placeholder='Password Confirmation'/>

            </div>
          </div>
           <div className='form-group'>
            <label for='password-confirmation' className='col-sm-4 control-label'></label>
            <div className='col-sm-8'>
              <ReCAPTCHA
                  ref="recaptcha"
                  sitekey="6Ldg4Q4UAAAAAGTNigyJT4S1Of0F97otI1g4l9bx"
                  onChange={this.recaptchaOnChange}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-4 col-sm-8'>
              <button onClick={ this.onSubmit } className='btn btn-primary'>Submit</button>
            </div>
          </div>
          { this.errorMessage }
        </div>

      </div>
    );
  }
}

export default Signup;
