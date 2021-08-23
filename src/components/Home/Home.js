import React from 'react';
import app from "../../firebase";
import {Container, IconButton} from "@material-ui/core";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import './Home.css';

const Home = () => {
  return (
    <Container className="home-container">
      <h1>Tassker</h1>
      <IconButton onClick={() => app.auth().signOut()} aria-label="signout">
        <ExitToAppOutlinedIcon/>
      </IconButton>
    </Container>
  );
};

export default Home;