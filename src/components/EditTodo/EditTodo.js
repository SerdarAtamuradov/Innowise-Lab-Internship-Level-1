import React, {useMemo, useState} from 'react';
import {Box, Checkbox, Container, IconButton} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import firebase from "../../firebase";
import './EditTodo.css';

const EditTodo = ({history}) => {
  const todo = useMemo(() => history.location.state, [history]);
  const [todoName, setTodoName] = useState(todo.todoName);
  const [checked, setChecked] = useState(todo.completed);

  const handleUpdate = () => {
    const db = firebase.firestore();
    // db.collection("users").doc("0").set({...user, todoName});
  };

  const handleDelete = () => {
    const db = firebase.firestore();

  };

  return (
    <Container className="edit-container">
      <Box className={"header"}>
        <h1>Edit Todo</h1>
        <IconButton onClick={() => history.push("/")} color="primary"
                    aria-label="edit todo">
          <ArrowBackIcon/>
        </IconButton>
      </Box>
      <Box>
        <Checkbox
          checked={checked}
          onChange={event => {
            setChecked(event.target.checked);
          }}
          size="small"
          inputProps={{'aria-label': 'primary checkbox'}}
        />
        <input
          value={todoName}
          onChange={event => {
            setTodoName(event.target.value);
          }}
        />
      </Box>
      <Box className="btn-container">
        <button className="create-btn" onClick={handleUpdate}>Save Changes</button>
      </Box>
      {/*<button onClick={handleUpdate}>edit</button>*/}
      {/*<button onClick={handleDelete}>delete</button>*/}

    </Container>
  );
};

export default EditTodo;