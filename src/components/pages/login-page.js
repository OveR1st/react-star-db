import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLoggedIn, isLoggin }) => {

  if ( isLoggedIn ) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
    <div className="jumbotron">
      <p>Login to see secret page!</p>
      <button
        className="btn btn-primary"
        onClick={isLoggin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;