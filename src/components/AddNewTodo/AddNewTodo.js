import React, {useContext, useMemo, useState} from 'react';
import {Box, Checkbox, Container, IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import firebase from "firebase";
import {AuthContext} from "../../Auth";

const AddNewTodo = ({history}) => {
  const user = useMemo(() => history.location.state, [history]);
  const [newTodo, setNewTodo] = useState('');
  const [checked, setChecked] = useState(true);

  const currentUser = useContext(AuthContext);

  const onCreate = async () => {
    user?.todos.push({
      todoName: newTodo,
      completed: checked,
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
      <Box className={"header"}>
        <h1>Add Todo</h1>
        <IconButton onClick={() => history.push("/")} color="primary"
                    aria-label="edit todo">
          <ArrowBackIcon/>
        </IconButton>
      </Box>
      <Box>
        <Checkbox
          checked={checked}
          onChange={(
            event => {
              setChecked(event.target.checked);
            })}
          size="small"
          inputProps={{'aria-label': 'primary checkbox'}}
        />
        <input
          value={newTodo}
          onChange={e => {
            setNewTodo(e.target.value);
          }}
        />
      </Box>
      <Box className="btn-container">
        <button className="create-btn" onClick={onCreate}>Add todo</button>
      </Box>
    </Container>
  );
};

export default AddNewTodo;