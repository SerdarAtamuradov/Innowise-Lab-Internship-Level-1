import React, {useCallback, useContext} from 'react';
import firebase from "../../firebase";
import {Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../Auth";
import {Box, Button, Container} from "@material-ui/core";
import './Login.css';

const Login = ({history}) => {
  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const {email, password} = event.target.elements;
    try {
      await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (e) {
      alert(e);
    }
  }, [history]);

  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={'/'}/>;
  }

  return (
    <Container className="container">
      <h1 className="title">Login Page</h1>
      <Box>
        <form className="form" onSubmit={handleLogin}>
          <label>
            <span>Email:</span>
            <input name="email" type="email" placeholder="Email"/>
          </label>
          <label>
            <span>Password:</span>
            <input name="password" type="password" placeholder="Password"/>
          </label>
          <Button type="submit" variant="outlined" color="primary">
            Log In
          </Button>
        </form>
      </Box>
      <hr/>
      <Box className="another-page">
        <span>Don't have an account?</span>
        <Button onClick={() => history.push("/signup")} color="primary">Sign Up</Button>
      </Box>
    </Container>
  );
};

export default withRouter(Login);