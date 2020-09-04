import React, { Component, lazy, Suspense, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoadingGif } from "./components/elements/Loading";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser, logout } from './utils/login'
import './components/styles/main.css';
import PrivateRoute from './utils/routing/PrivateRoute';
import HomeRoute from './utils/routing/HomeRoute';
const Alerts = lazy(() => import('./components/elements/Alerts'));
const Game = lazy(() => import('./game'));
const Login = lazy(() => import("./components/Login"));
const Landing = lazy(() => import("./components/Landing"));
const Navbar = lazy(() => import("./components/Navbar"));
const Register = lazy(() => import("./components/Register"));
const DownloadPage = lazy(() => import('./components/DownloadHome'));
const Confirm = lazy(() => import('./components/Confirm'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    const handleInvalidToken = e => {
      if (e.key === 'token' && e.oldValue && !e.newValue) {  
        store.dispatch(logout());
      }
    }
    window.addEventListener('storage', handleInvalidToken)
    return function cleanup() {
      window.removeEventListener('storage', handleInvalidToken)
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={LoadingGif}>
          <Fragment>
            <Navbar />
            <section>
              <Alerts />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot" component={ForgotPassword} />
                <Route exact path="/confirm/:token" component={Confirm} />
                <PrivateRoute exact path="/download" component={DownloadPage} />
                <PrivateRoute exact path="/home" component={DownloadPage} />
                <PrivateRoute exact path="/game" component={Game} />
                <HomeRoute exact path="/" component={Landing} />
              </Switch>
            </section>
          </Fragment>
        </Suspense>
      </Router>
    </Provider>
  );
}


export default App;
