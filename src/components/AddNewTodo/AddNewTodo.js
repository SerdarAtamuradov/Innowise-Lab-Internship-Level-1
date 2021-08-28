import React, {useContext, useState} from 'react';
import {Checkbox} from "@material-ui/core";
import {AuthContext} from "../../Auth";
import firebase from "firebase";

const AddNewTodo = () => {
  const [newTodo, setNewTodo] = useState('');
  const [checked, setChecked] = useState(true);

  const currentUser = useContext(AuthContext);

  const onCreate = () => {
    const db = firebase.firestore();
    const userData = db.collection("users").doc(currentUser.currentUser.uid);

    userData.get().then((doc) => {
      if (doc.exists) {
        const docs = doc.data();

        docs.todos.push({
          todoName: newTodo,
          completed: checked,
          id: Date.now().toString()
        });

        userData.set(docs);
      } else console.log("No such document!");

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        size="small"
        inputProps={{'aria-label': 'primary checkbox'}}
      />
      <input
        value={newTodo}
        onChange={e => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={onCreate}>Add todo</button>
    </>
  );
};

export default AddNewTodo;