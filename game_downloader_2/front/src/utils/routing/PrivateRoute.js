import React from 'react';
import {Route} from 'react-router-dom';
import Login from '../../components/Login';
import {useSelector} from 'react-redux';

const VerifyFirst = () => <div>Verify First</div>


const PrivateRoute = ({ component, ...options }) => {
  const isLoading = useSelector(state => state.register.isLoading);
  const isAuthenticated = useSelector(state => state.register.isAuthenticated);
  const isAuthorizedRedirect = useSelector(state=>state.register.isAuthenticated && !state.register.verified);

  let finalComponent = !isAuthenticated && !isLoading ? Login : component;
  finalComponent = isAuthorizedRedirect?VerifyFirst:finalComponent;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;