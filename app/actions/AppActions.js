import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import axios from 'axios';
var AppActions = {
  /**
   * Dispatches action for when user credentials are POSTed.
   *
   * @method submitCredentials
   * @param {String} email
   * @param {String} password
   */
  submitCredentials: (email, password) => {
    axios({
      url: 'http://localhost:3000/v1/auth',
      method: 'post',
      data: {
        email: email,
        password: password
      }
    }).
    then((response) => {
      localStorage.setItem('jwtToken', response.data.auth_token);
      AppDispatcher.dispatch({
        type: ActionTypes.SUBMIT_CREDENTIALS,
        succeeded: true
      });
    }).
    catch((error) => {
      let message = error.message
      if(error.response){
        message = JSON.stringify(error.response.data)
      }
      AppDispatcher.dispatch({
        type: ActionTypes.SUBMIT_CREDENTIALS,
        succeeded: false,
        error: message
      });
    });
  },
  /**
   * Dispatches action for when user registration information is POSTed.
   *
   * @method submitSignupInformation
   * @param {String} email
   * @param {String} password
   * @param {String} password_confirmation
   * @param {String} recaptcha_response
   */
  submitSignupInformation: (email, password, password_confirmation, recaptcha_response) => {
    axios({
      url: 'http://localhost:3000/v1/users', //TODO: to move this url to a config file
      method: 'post',
      data: {
        user: {
          email: email || '',
          password: password || '',
          password_confirmation: password_confirmation || ''
        },
        recaptcha_response: recaptcha_response
      }
    }).
    then((response) => {
      AppDispatcher.dispatch({
        type: ActionTypes.SUBMIT_SIGNUP_INFORMATION,
        succeeded: true
      });
    }).
    catch((error) => {
      let message = error.message
      if(error.response){
        message = JSON.stringify(error.response.data)
      }
      AppDispatcher.dispatch({
        type: ActionTypes.SUBMIT_SIGNUP_INFORMATION,
        succeeded: false,
        error: message
      });
    });
  }
}

export default AppActions;
