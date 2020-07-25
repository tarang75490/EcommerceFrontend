import React ,{Component} from 'react';
import classes from './OTPinput.module.css'

class OTPinput extends  Component{
  

  render(){
  return (
  <input className={classes.otpinput} type="text" minLength="4" maxLength="4"  value={this.props.value} onChange={this.props.change} />
  );
  }
}

export default OTPinput;
