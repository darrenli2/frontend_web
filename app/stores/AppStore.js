import { ReduceStore, Store } from 'flux/utils';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Immutable from 'immutable';
/*
 * A store for storing the information for the user.
 *
 * @class AppStore
 * @extends ReduceStore
 */
class AppStore extends ReduceStore {
  getInitialState (){
    return Immutable.Map();
  }

  reduce(state, action){
    switch (action.type) {
      case ActionTypes.SUBMIT_CREDENTIALS:
        if(action.succeeded){
          state = state.set('authenticated', true);
          state = state.delete('authentication_errors');
        }else{
          state = state.set('authenticated', false);
          state = state.set('authentication_errors', action.error);
        }
        return state;
      case ActionTypes.SUBMIT_SIGNUP_INFORMATION:
        if(action.succeeded){
          state = state.set('registered', true);
          state = state.delete('registration_errors');
        }else{
          state = state.set('registration_errors', action.error);
        }
        return state;
      default:
        return state;
    }
  }
}

export default new AppStore(AppDispatcher);
