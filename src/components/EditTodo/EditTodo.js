import React, {useState} from 'react';
// import firebase from "../../firebase";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton} from "@material-ui/core";

const EditTodo = ({history}) => {
  const [todoName, setTodoName] = useState('');

  // const handleUpdate = () => {
  //   const db = firebase.firestore();
  //   db.collection("users").doc("0").set({...user, todoName});
  // };
  //
  // const handleDelete = () => {
  //   const db = firebase.firestore();
  //
  // };


  return (
    <>
      <input
        value={todoName}
        onChange={e => {
          setTodoName(e.target.value);
        }}
      />
      {/*<button onClick={handleUpdate}>edit</button>*/}
      {/*<button onClick={handleDelete}>delete</button>*/}
      <IconButton onClick={() => history.push("/")} color="primary"
                  aria-label="edit todo">
        <ArrowBackIcon/>
      </IconButton>
    </>
  );
};

export default EditTodo;