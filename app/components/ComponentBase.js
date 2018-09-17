import React, { Component, PropTypes } from 'react';
import AppStore from '../stores/AppStore'
import axios from 'axios';
import Immutable from 'immutable';
/**
 * ComponentBase class for all component to abstract common
 * mmethods to this class
 *
 * @class ComponentBase
 * @extends React.Component
 */
class ComponentBase extends Component {
  constructor(...args){
    super(...args);
    this.state = {user: AppStore.getState()};
  }
  /**
   * A change Listener for when the Appstore is updated to inform the component
   *
   * @method onChange
   * @return  {Void}
   */
  onChange = () =>{
    this.setState({user: AppStore.getState()});
  }

  /**
   * Add change listener to AppStore and check if the user already logged in
   *
   * @method  componentDidMount
   * @return  {Void}
   */
  componentDidMount = () => {
    let token = AppStore.addListener(this.onChange);
    this.setState({token: token});

    let jwtToken = localStorage.getItem('jwtToken');
    if(!jwtToken || jwtToken === '') { //if there is no token, dont bother
      return;
    }
    axios({
      url: 'http://localhost:3000/v1/auth',
      method: 'get',
      headers: {'Authorization': jwtToken},
    }).
    then((response) => {
      if(response.data.authenticated){
        this.setState({user: Immutable.Map({authenticated: true, email: response.data.email})});
      }else{
        this.setState({user: Immutable.Map({authenticated: false})});
      }
    }).
    catch((error) => {
      this.setState({user: Immutable.Map({authenticated: false})});
    });
  }

  /**
   * Remove the change listener
   *
   * @method  componentWillUnmount
   * @return  {Void}
   */
  componentWillUnmount = () => {
    this.state.token.remove();
  }

  /**
   * Set state when input field is updated
   *
   * @method  componentWillUnmount
   * @return  {Void}
   */
  updateField = (ev) => {
    this.setState({[ev.target.name]: ev.target.value});
  }
}

export default ComponentBase;
