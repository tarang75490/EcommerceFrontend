import React ,{Component} from 'react';
import classes from './OTPinput.module.css'
import Auxiliary from '../../../Hoc/Auxiliary/Auxiliary'
class OTPinput extends  Component{
  state ={
    inputref : React.createRef(),
    inputref1 : React.createRef(),
    inputref2 : React.createRef(),
    inputref3 : React.createRef()

    
  }
  componentDidMount(){
    this.state.inputref.current.focus();
  }


  render(){
    console.log(this.props.value[0],this.props.value[1],this.props.value[2],this.props.value[3],this.props.value)
    if(this.props.value[2]){
      this.state.inputref3.current.focus()
    }else if(this.props.value[1]){
      this.state.inputref2.current.focus()
    }else if(this.props.value[0]){
      this.state.inputref1.current.focus()
    }
  return (<Auxiliary>
  <input className={classes.otpinput} ref={this.state.inputref} type="text" minLength="1" maxLength="1"  value={this.props.value[0]} onChange={(e)=>this.props.change(e,0)} />
  <input className={classes.otpinput} ref={this.state.inputref1}type="text" minLength="1" maxLength="1"  value={this.props.value[1]} onChange={(e,)=>this.props.change(e,1)} /> - 
  <input className={classes.otpinput} ref={this.state.inputref2}type="text" minLength="1" maxLength="1"  value={this.props.value[2]} onChange={(e,)=>this.props.change(e,2)} />
  <input className={classes.otpinput} ref={this.state.inputref3}type="text" minLength="1" maxLength="1"  value={this.props.value[3]} onChange={(e,)=>this.props.change(e,3)} />
  </Auxiliary>
  );
  }
}

export default OTPinput;
