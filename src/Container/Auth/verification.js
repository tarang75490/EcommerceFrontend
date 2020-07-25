import React ,{Component} from 'react';
import classes from './Auth.module.css'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import Modal from '../../Component/UI/Modal/Modal'
import OTPinput from '../../Component/UI//OTPInput/otpinput'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../Store/action/index'
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios';
import Loading from '../../Component/UI/LoadingText/LoadingText'
class Verification extends  Component{
    state = {
        otp: '',
        mode:"resend",
        show: true
    }
    
    clickeHandler = (mode) =>{
        this.setState({
            mode:mode,
            show:true
        })
        if(mode === "resend"){
            this.props.sendOTP()
        }else if(mode ==="verify"){
            this.props.verifyOTP(this.state.otp)
        }
    }
     
      handleChange = (e) =>{
          this.setState({
              otp:e.target.value
          })
      };
      modalclosedHandler =()=>{
        this.setState({
            show:false
        })
    }

  render(){
      let resendloading = this.state.mode==="resend"&&this.props.loading;
        let message=null;
        console.log(this.props.message)
        if(!this.props.loading){
            if(this.props.error){
                message=<Modal show={this.state.show} top="25%" modalclosed={this.modalclosedHandler}>{this.props.error}</Modal> 
            }else{
                if(this.state.mode==="resend"){
                    message=<Modal show={this.state.show} top="25%" modalclosed={this.modalclosedHandler}>Email Send Successfully</Modal> 
                }else if(this.state.mode=="verify"){
                    message=<Redirect to="dashboard"/>
                }
            }
        }
  return (
    <div className={classes.Main}>
            {message}
            <div  className={classes.Logo}>
                <center><Logo logo="LightLogo" style={{width:"40%"}}/></center>
            </div>
            <center>
                <h1 className={classes.heading}>Enter Your OTP</h1>
            </center>
            <div className={classes.Form}>
                <center>
                    <OTPinput value={this.state.otp} change={(e)=>this.handleChange(e)}/>
                </center>
            </div>
            <center>
            {resendloading ? <Loading label={"Sending"}/>:<span className={classes.a} onClick={()=>this.clickeHandler("resend")}>Resend OTP?</span>}
            </center>
            <center>
                    <Button loading={this.state.mode==="verify"&&this.props.loading} 
                            disabled={resendloading}
                            label= {"Verify"}  
                            width={"10%"}  
                            clicked={()=>this.clickeHandler("verify")} />
            </center>
            

           
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
        sendOTP:(req) => dispatch(actions.sendingOTP(req)),
        verifyOTP:(req)=>dispatch(actions.verifyOTP(req))
    }
}


export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(withErrorHandler(Verification,axios.notify)));
