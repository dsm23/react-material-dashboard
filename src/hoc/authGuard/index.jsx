import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function authGuard(WrappedComponent) {
  const HOC = props => {
    const { history } = props;

    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    if (!isAuthenticated) {
      history.push('/sign-in');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  HOC.propTypes = {
    history: PropTypes.object,
  };

  return HOC;
}

export default WrappedComponent => withRouter(authGuard(WrappedComponent));
