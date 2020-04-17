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
import About from './components/layouts/About'







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
            <Route exact path="/about" component={About} />
            <Routes component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}



export default App;
