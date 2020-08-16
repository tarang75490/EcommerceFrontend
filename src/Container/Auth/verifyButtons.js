import React ,{Component} from 'react';
import classes from './Auth.module.css'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import Modal from '../../Component/UI/Modal/Modal'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../Store/action/index'
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios';
class VerifyButtons extends  Component{
    state={
        show:false
    }
    clickeHandler = () =>{
        this.props.sendOTP()
        this.setState({
            show:true
        })
    }
    modalclosedHandler =()=>{
        this.setState({
            show:false
        })
    }

  render(){
      console.log(this.props)
      let message = null;
      if(!this.props.loading){
        if(this.props.error){
            message=<Modal show={this.state.show} top="25%" modalclosed={this.modalclosedHandler}>{this.props.error}</Modal> 
        }else{
            if (this.props.message){
                message=<Redirect to="/verification"/>
            }
        }
      }
  return (
    <div className={classes.Main}>
    {message}
            <div  className={classes.Logo}>
                <center><Logo logo="LightLogo" style={{width:"60%"}}/></center>
            </div>
            <center>
                <h1 className={classes.heading}>Verify Your Account !!</h1>
            </center>
            <div className={classes.Form}>
                <center>
                    <Button loading={this.props.loading} label= {"Verify Via Email"} clicked={this.clickeHandler} />
                </center>
                <center>
                    <Button label= {"Verify Via SMS"}  disabled={true} clicked={this.clickeHandler} />
                </center>
            </div>
    </div>


  );
  }
}
const mapStatetoProps = state =>{
    return{
        loading:state.otp.loading,
        error:state.otp.error,
        message:state.otp.message
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        sendOTP:(req) => dispatch(actions.sendingOTP(req))
    }
}




export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(withErrorHandler(VerifyButtons,axios.notify)));
