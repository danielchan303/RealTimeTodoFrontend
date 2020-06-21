import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {auth} from './services/firebase';
import Navbar from './components/Navbar/Navbar';
import Messagebar from './components/MessageBar/MessageBar';
import Login from './scenes/Login/Login';
import Home from './scenes/Home/Home';
import Container from './components/Container/Container';
import AppContext from './AppContext'
import actions from './store/actions/index';
import getSocket from './services/socketIo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = (props) => {
  const [socket, setSocket] = useState(null);

  // connect to socket.io
  const {loggedIn, store} = props;
  useEffect(() => {
    if (loggedIn && !socket) {
      const user = auth().currentUser;
      getSocket(user, store).then(socket => {
        setSocket(socket);
      });
    }
    
    if (!loggedIn && socket) {
      socket.close();
      setSocket(null);
    }
  }, [loggedIn, store, socket]);

  // set auth state observer 
  const {login, logout} = props;
  useEffect(() => {
    console.log('Login/Logout useEffect');
    auth().onAuthStateChanged(async (user) => {
      if (!!user) {login();} else {logout();}
    });
  }, [login, logout]);


  return (
    <AppContext.Provider value={{ auth: auth, socket: socket }}>
      <Router>
        <Navbar />
        <Messagebar show={props.connected === false} />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </Router>
    </AppContext.Provider>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.isLoggedIn,
    connected: state.socket.connected
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
