import React from 'react';
import {withRouter} from "react-router-dom";
import {Box, IconButton} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import './TaskGroup.css';

const TaskGroup = ({history, user}) => {
  return (
    <ul>
      {user?.todos?.map(todo => (
        <li key={todo?.id}>
          <Box className={"todo-container"}>
            <Box className={"text-container"}>
              <p>{todo.todoName}</p>
              <span>{todo.completed === true ? "Done" : "In progress"}</span>
            </Box>
            <IconButton color="primary" aria-label="edit todo"
                        onClick={() => history.push({
                          pathname: "/editTodo",
                          state: {
                            user,
                            todo
                          }
                        })}>
              <EditIcon/>
            </IconButton>
          </Box>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(TaskGroup);