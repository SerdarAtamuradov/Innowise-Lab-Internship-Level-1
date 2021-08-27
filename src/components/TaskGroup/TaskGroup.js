import React, {useState} from 'react';
import {Box, Checkbox, IconButton} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import './TaskGroup.css';
import firebase from "../../firebase";

const TaskGroup = ({history, user}) => {
  const [checked, setChecked] = useState();


  const handleChange = (todo, index, e) => {

    const db = firebase.firestore();
    const editedTodo = {...todo, completed: !todo.completed};
    console.log('user', user);
    user.todos[index].completed = editedTodo;
    console.log('updated user', user);
    db.collection("users").doc(user.id).set({...user});
    setChecked(e.target.checked)
    // user.todos.map((item, ind)=> {
    //   if(index==ind)  item[ind] = todos[index]
    // })
    // console.log('editedTodo', editedTodo);
    // const editedUser
    // const data = await db.collection("users").doc(user.id).get();
    //
    // setObj(data.doc?.map(doc => (
    //   {...doc.data()})));
    // console.log(obj);
  };
  return (
    <ul>
      {user?.todos.map((todo, index) => (
        <li key={todo?.id}>
          <Box className={"todo-container"}>
            <Checkbox
              checked={todo.completed}
              onChange={handleChange.bind(null, todo, index, event)}
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