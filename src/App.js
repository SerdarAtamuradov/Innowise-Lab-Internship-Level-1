import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import './App.css';
import EditTodo from "./components/EditTodo/EditTodo";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/editTodo" component={EditTodo}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;