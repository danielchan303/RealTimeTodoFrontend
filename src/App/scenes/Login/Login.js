import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AppContext from '../../AppContext';
import './Login.css';
import Card from '../../components/Card/Card';

const Login = (props) => {
    const appContext = useContext(AppContext);
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          appContext.auth.GoogleAuthProvider.PROVIDER_ID,
          appContext.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false
        }
    };

    if (props.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <Card>
            <h2>Login</h2>
            <hr />
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={appContext.auth()}/>
        </Card>
      );
    }
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(mapStateToProps)(Login);