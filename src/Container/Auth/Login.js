import React ,{Component} from 'react';
import classes from './Auth.module.css'
import Logo from '../../Component/UI/Logo/Logo';
import LoginForm from './LoginForm/LoginForm';
class Login extends  Component{
    


  render(){
  return (
    <div className={classes.Main}>
            <div className={classes.Logo}>
            <center><Logo logo="LightLogo" style={{width:"40%"}}/></center>
            </div>
            <div className={classes.Form}>
            <LoginForm/>
            </div>
            <div className={classes.links}>
            <center>
            <a href="">Forgot Password ?</a>
            </center>
            <center>
            <a href="/signUp"> Create New Account</a>
            </center>
            </div>
    </div>


  );
  }
}

export default Login;
