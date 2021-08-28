import React, {useContext, useState} from 'react';
import {Box, Checkbox, IconButton} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import './TaskGroup.css';
import firebase from "../../firebase";
import {AuthContext} from "../../Auth";
import {withRouter} from "react-router-dom";

const TaskGroup = ({history, user}) => {
  const [checked, setChecked] = useState();

  const currentUser = useContext(AuthContext);

  // const handleChange = (todo, index) => {
  //   console.log(todo.completed);
  //   setChecked(!todo.completed);
  //   console.log('checked', checked);
  //
  //   const db = firebase.firestore();
  //   // const editedTodo = {...todo, completed: !todo.completed};
  //   // console.log('user', user);
  //   // user.todos[index] = editedTodo;
  //   user.todos[index].completed = checked;//problem there
  //   // console.log('updated user', user);
  //   db.collection("users").doc(currentUser.currentUser.uid).set(user);
  // };

  // const OnEdit = async () => {
  //   const db = firebase.firestore();
  //   const userData = db.collection("users").doc(currentUser.currentUser.uid);
  //
  //   await userData.get().then((doc) => {
  //     if (doc.exists) {
  //       const docs = doc.data();
  //
  //       docs.todos.push({
  //         todoName: newTodo,
  //         completed: checked,
  //         id: Date.now().toString()
  //       });
  //
  //       userData.set(docs);
  //     } else console.log("No such document!");
  //
  //   }).catch((error) => {
  //     console.log("Error getting document:", error);
  //   });
  // };


  return (
    <ul>
      {user?.todos.map((todo, index) => (
        <li key={todo?.id}>
          <Box className={"todo-container"}>
            <Box className={"text-container"}>
              <p>{todo.todoName}</p>
              <span>{todo.completed === true ? "Done" : "In progress"}</span>
            </Box>
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

export default withRouter(TaskGroup);