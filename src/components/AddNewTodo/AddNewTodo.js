import React, {useContext, useMemo, useState} from 'react';
import {Box, Container, IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import firebase from "firebase";
import {AuthContext} from "../../Auth";
import './AddNewTodo.css';

const AddNewTodo = ({history}) => {
  const user = useMemo(() => history.location.state, [history]);
  const [newTodo, setNewTodo] = useState('');

  const currentUser = useContext(AuthContext);

  const onCreate = async () => {
    user?.todos.push({
      todoName: newTodo,
      completed: false,
      id: Date.now().toString()
    });

    const db = firebase.firestore();
    await db.collection("users").doc(currentUser.currentUser.uid).set(user);

    setTimeout(() => {
      history.push("/");
    }, 100);
  };

  return (
    <Container>
      <Box className={"new-todo-header"}>
        <IconButton onClick={() => history.push("/")} color="primary"
                    aria-label="edit todo">
          <ArrowBackIcon/>
        </IconButton>
        <h1>Add Todo</h1>
      </Box>
      <Box className="new-todo__box">
        <input
          value={newTodo}
          onChange={e => {
            setNewTodo(e.target.value);
          }}
          placeholder="Add new Todo"
        />
      </Box>
      <Box className="new-todo__box">
        <button className="new-todo__create-btn" onClick={onCreate}>Add todo</button>
      </Box>
    </Container>
  );
};

export default AddNewTodo;