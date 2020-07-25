import React ,{Component} from 'react';
import classes from './Auth.module.css'
import Logo from '../../Component/UI/Logo/Logo';
import SignUpForm from './SignUpForm/SignUpForm'

class SignUp extends  Component{
    state={
      transform:null
    }
  componentDidUpdate(){
    this.setState({
      transform:"translateX(-100vh)"
    })
  }

  render(){
  return (
    <div className={classes.Main}>
            <div  className={classes.Logo}>
            <center><Logo logo="LightLogo" style={{width:"40%"}}/></center>
            </div>
            <div className={classes.Form} style={{transform:this.state.transform}}>
           <SignUpForm/>
            </div>
    </div>


  );
  }
}

export default SignUp;
