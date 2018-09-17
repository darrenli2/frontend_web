import React from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';

const muiTheme = getMuiTheme({});

render((
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/sign_in" component={Signin}/>
      <Route path="/sign_up" component={Signup}/>
    </Router>
), document.getElementById('root'));
