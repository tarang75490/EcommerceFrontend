import React ,{Component} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
class Login extends  Component{
  render(){
  return (
    <div className="App">
    <Switch>
      <Route path="/login" />
    </Switch>
    </div>
  );
  }
}

export default Login;
