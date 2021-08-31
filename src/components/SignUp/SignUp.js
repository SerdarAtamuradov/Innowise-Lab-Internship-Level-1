import React, {useCallback} from 'react';
import firebase from "../../firebase";
import {withRouter} from "react-router-dom";
import {Box, Button, Container} from "@material-ui/core";
import './SignUp.css';

const SignUp = ({history}) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const {email, password} = event.target.elements;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (e) {
      alert(e);
    }
  }, [history]);

  return (
    <Container className="container">
      <h1 className="title">Signup Page</h1>
      <Box>
        <form className="form" onSubmit={handleSignUp}>
          <label>
            <span>Email:</span>
            <input name="email" type="email" placeholder="Email"/>
          </label>
          <label>
            <span>Password:</span>
            <input name="password" type="password" placeholder="Password"/>
          </label>
          <Button type="submit" variant="outlined" color="primary">
            Sign Up
          </Button>
        </form>
      </Box>
      <hr/>
      <Box className="another-page">
        <span>Have an account?</span>
        <Button onClick={() => history.push("/login")} color="primary">
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default withRouter(SignUp);