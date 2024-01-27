// src/components/Login.jsx
import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth, firebase } from './firebase';

const Login = () => {
  // Now you can use 'auth' and 'firebase' from your local file

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const signInWithFaceBook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await auth.signInWithPopup(provider);
  };

  

  return (
    <div id='login-page'>
      <div id="login-card">
      <h2>Facebook Messenger Clone</h2>
      <div className="login-button google" onClick={signInWithGoogle}>
        <GoogleOutlined /> Sign in with Google
      </div>
      <div className="login-button facebook" onClick={signInWithFaceBook}>
        <FacebookOutlined /> Sign in with Facebook
      </div>
      </div>
    </div>
  );
};

export default Login;

