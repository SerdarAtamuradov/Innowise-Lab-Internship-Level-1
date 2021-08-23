import React, {useCallback, useContext} from 'react';
import app from "../../firebase";
import {Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../Auth";
import {Box, Button, Container} from "@material-ui/core";
import './Login.css';

const Login = ({history}) => {
  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const {email, password} = event.target.elements;
    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
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
    <Container>
      <h1 className="title">Login Page</h1>
      <Box>
        <form className="form" onSubmit={handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email"/>
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password"/>
          </label>
          {/*<button className="btn login__btn" type="submit">Log In</button>*/}
          <Button type="submit" variant="outlined" color="primary">
            Log In
          </Button>
        </form>
      </Box>
      <hr/>
      <Box>
        <h3>Don't have an account?</h3>
        {/*<button onClick={() => history.push("/signup")}>Sign Up</button>*/}
        <Button onClick={() => history.push("/signup")} type="submit" variant="outlined" color="primary">
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default withRouter(Login);