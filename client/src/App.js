import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'


//Redux
import { Provider } from "react-redux";
import store from "./store"
import { loadUser } from './actions/auth';
import Routes from './components/routing/Routes';








if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Routes component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}



export default App;
