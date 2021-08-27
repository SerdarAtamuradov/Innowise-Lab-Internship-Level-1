import React, {useContext, useState} from 'react';
import {Box, Checkbox, IconButton} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import './TaskGroup.css';
import firebase from "../../firebase";
import {AuthContext} from "../../Auth";

const TaskGroup = ({history, user}) => {
  const [checked, setChecked] = useState();

  const currentUser = useContext(AuthContext);

  const handleChange = (todo, index) => {
    console.log(todo.completed);
    setChecked(!todo.completed);
    console.log('checked', checked);

    const db = firebase.firestore();
    // const editedTodo = {...todo, completed: !todo.completed};
    // console.log('user', user);
    // user.todos[index] = editedTodo;
    user.todos[index].completed = checked;//problem there
    // console.log('updated user', user);
    db.collection("users").doc(currentUser.currentUser.uid).set(user);
  };


  return (
    <ul>
      {user?.todos.map((todo, index) => (
        <li key={todo?.id}>
          <Box className={"todo-container"}>
            <Checkbox
              checked={todo.completed}
              onChange={handleChange.bind(null, todo, index)}
              size="small"
              inputProps={{'aria-label': 'primary checkbox'}}
            />
            <span>{todo.todoName}</span>
            <IconButton onClick={() => history.push("/editTodo")} color="primary"
                        aria-label="edit todo">
              <EditIcon/>
            </IconButton>
          </Box>
        </li>
      ))}
    </ul>
  );
};

export default TaskGroup;