import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Box, Container, IconButton} from "@material-ui/core";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import firebase from "../../firebase";
import {AuthContext} from "../../Auth";
import TaskGroup from "../TaskGroup/TaskGroup";
import './Home.css';

const Home = ({history}) => {
  const [userCollection, setUserCollection] = useState([]);

  const currentUser = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("users").get();
      setUserCollection(data.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const user = useMemo(() =>
      userCollection.find(item => item.userId === currentUser.currentUser.uid),
    [currentUser.currentUser.uid, userCollection]);

  return (
    <Container>
      <Box className={"header"}>
        <h1>Tassker</h1>
        <IconButton onClick={() => firebase.auth().signOut()} aria-label="signout">
          <ExitToAppOutlinedIcon/>
        </IconButton>
      </Box>
      <h3>Todos:</h3>
      <TaskGroup user={user}/>
      <Box className="btn-container">
        <button className="create-btn" onClick={() => history.push({
          pathname: "/addTodo",
          state: user
        })}
        >Add New Todo
        </button>
      </Box>
    </Container>
  );
};


export default Home;