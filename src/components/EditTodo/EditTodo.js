import React, {useContext, useMemo, useState} from 'react';
import {Box, Container, FormControl, IconButton, InputLabel, MenuItem, Select} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "../../firebase";
import './EditTodo.css';
import {AuthContext} from "../../Auth";

const EditTodo = ({history}) => {
  const {user, todo} = useMemo(() => history.location.state, [history]);
  const [todoName, setTodoName] = useState(todo.todoName);
  const [completed, setCompleted] = useState(todo.completed);

  const currentUser = useContext(AuthContext);

  const handleUpdate = async () => {
    todo.todoName = todoName;
    todo.completed = completed;

    user?.todos.forEach(item => {
      if (item.id === todo.id) item = todo;
    });

    const db = firebase.firestore();
    await db.collection("users").doc(currentUser.currentUser?.uid).set(user);

    setTimeout(() => {
      history.push("/");
    }, 100);
  };


  const handleDelete = async () => {
    let index;
    user?.todos.forEach((item, ind) => {
      if (item.id === todo.id) index = ind;
    });
    user?.todos.splice(index, 1);

    const db = firebase.firestore();
    await db.collection("users").doc(currentUser.currentUser?.uid).set(user);

    setTimeout(() => {
      history.push("/");
    }, 100);

  };


  return (
    <Container>
      <Box className={"edit-todo-header"}>
        <IconButton onClick={() => history.push("/")} color="primary"
                    aria-label="edit todo">
          <ArrowBackIcon/>
        </IconButton>
        <h1>Edit Todo</h1>
        <IconButton onClick={handleDelete} color="primary"
                    aria-label="edit todo">
          <DeleteIcon/>
        </IconButton>
      </Box>
      <Box className="edit-todo__box">
        <input
          value={todoName}
          onChange={event => {
            setTodoName(event.target.value);
          }}
        />
        <FormControl>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Completed
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={completed}
            onChange={event => {
              setCompleted(event.target.value);
            }}
          >
            <MenuItem value={true}>Done</MenuItem>
            <MenuItem value={false}>In Progress</MenuItem>
          </Select>
        </FormControl>
        <Box className="edit-todo__btn-box">
          <button className="edit-todo__edit-btn" onClick={handleUpdate}>Save Changes</button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditTodo;