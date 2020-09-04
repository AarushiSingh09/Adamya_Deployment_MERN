import React from 'react';
import {Route} from 'react-router-dom';
import DownloadPage from '../../components/DownloadHome';
import {useSelector} from 'react-redux';

const VerifyFirst = () => <div className='mr-auto container'>Verify First</div>

const HomeRoute = ({ component, ...options }) => {
  const isLoading = useSelector(state => state.register.isLoading);
  const isAuthenticated = useSelector(state => state.register.isAuthenticated);
  const isAuthorizedRedirect = useSelector(state=>state.register.isAuthenticated && !state.register.verified);

  let finalComponent = !isAuthenticated && !isLoading ? component : DownloadPage;
  finalComponent = isAuthorizedRedirect?VerifyFirst:finalComponent;

  return <Route {...options} component={finalComponent} />;
};

export default HomeRoute;