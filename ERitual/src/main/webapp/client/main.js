import React,{ Component } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk'
import rootReducer from './rootReducer';
import jwt from 'jsonwebtoken';

import routes from './routes/routes';
import {setAuthToken,setDefaultToken} from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';

let middleware = [
	ReduxThunk,
	ReduxPromise
]
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

setDefaultToken();

if(localStorage.jwtToken)
{
  const jwtToken = localStorage.getItem('jwtToken');
  const user = JSON.parse(localStorage.getItem('user'));
  setAuthToken(jwtToken);
  console.log("user ", user);
  store.dispatch(setCurrentUser(user));
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,document.getElementById('app'));
