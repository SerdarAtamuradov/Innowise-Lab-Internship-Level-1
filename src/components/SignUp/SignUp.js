import React, {useCallback} from 'react';
import app from "../../firebase";
import {withRouter} from "react-router-dom";
import {Box, Button, Container} from "@material-ui/core";

const SignUp = ({history}) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const {email, password} = event.target.elements;
    try {
      await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (e) {
      alert(e);
    }
  }, [history]);

  return (
    <Container maxWidth="sm">
      <h1 className="title">Signup Page</h1>
      <Box>
        <form className="form" onSubmit={handleSignUp}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email"/>
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password"/>
          </label>
          {/*<button type="submit">Sign Up</button>*/}
          <Button type="submit" variant="outlined" color="primary">
            Sign Up
          </Button>
        </form>
      </Box>
      <hr/>
      <Box>
        <h3>Have an account?</h3>
        {/*<button onClick={() => history.push("/login")}>Log In</button>*/}
        <Button onClick={() => history.push("/login")} type="submit" variant="outlined" color="primary">
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default withRouter(SignUp);