import React, {useContext, useEffect, useMemo, useState} from 'react';
import firebase from "../../firebase";
import {Box, Container, IconButton} from "@material-ui/core";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import './Home.css';
import {AuthContext} from "../../Auth";
import TaskGroup from "../TaskGroup/TaskGroup";

const Home = ({history}) => {
  const [userCollection, setUserCollection] = useState([]);

  const currentUser = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("users").get();
      setUserCollection(data.docs.map(doc => (
        {...doc.data(), id: doc.id})));
    };

    fetchData();
  }, []);

  const user = useMemo(() =>
    userCollection.find(item => item.userId === currentUser.currentUser.uid), [userCollection]);

  // console.log('user', user);

  // const handleAddNewTodo = () => {
  //
  // };
  return (
    <Container>
      <Box className={"header"}>
        <h1>Tassker</h1>
        <IconButton onClick={() => firebase.auth().signOut()} aria-label="signout">
          <ExitToAppOutlinedIcon/>
        </IconButton>
      </Box>
      <TaskGroup user={user}/>
      {/*<button onClick={handleAddNewTodo} user={user} todo={todos[0].todoName} >Add New Todoss</button>*/}
    </Container>
  );
};

export default Home;