import React ,{Component}from 'react'
import validator from 'validator'
import {withRouter,Link,Redirect} from 'react-router-dom'
import FlexibleForm from '../../../Component/UI/FlexibleForm/FlexibleForm'
import WithErrorHandler from '../../../Hoc/WithErrorHandler/WithErrorHandler'
import utilityFunction from '../../UtilityFunction/utilityFunction'
import Modal from '../../../Component/UI/Modal/Modal'
import * as actions from '../../../Store/action/index'
import  axios from '../../../axios'
import { connect } from 'react-redux'

class LoginForm extends Component{
    state={
        formisvalid:false,
        show:false,
        redirect:null,
        loginform:{
            user:{
                elementType:'number',
                config:{
                    type:'text',
                    placeholder:"Email Id or Mobile No"
                },
                value:"",
                validation:{
                    required:true
                },
                valid:false,
                touched:false

            },
            password:{
                elementType:'text',
                config:{
                    type:'password',
                    placeholder:"Password"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false

            },
            button:{
                elementType:"button",
                label:"LOGIN"
            }
        }
    }

    formSubmitHandler=(e)=>{
        e.preventDefault();
        const state = this.state.loginform
        const formData={}
        if(validator.isEmail(state.user.value)){
            formData["email"] = state.user.value
        }else if (validator.isMobilePhone(state.user.value)){
            formData["mobileNo"] = Number(state.user.value)
        }
        formData["password"] = state.password.value
        console.log(formData)
        this.props.loginhandler(formData)
        this.setState({
            show:true,
            redirect:this.props.authRedirectPath

        })
        
    }
    modalclosedHandler=()=>{
        this.setState({
            show:false
        })
    }
    inputChangedHandler=(event,inputidentifier)=>{
        const change = utilityFunction.inputChangedHandler(event,inputidentifier,this.state.loginform)
        console.log(change)
        this.setState({
            loginform:change.form,
            formisvalid:change.formisvalid
        })
    }
    initiateRedirect = ()=>{
        setTimeout(()=>{
            this.props.history.push(this.props.authRedirectPath)
        },500)
    }
    render(){
        console.log(this.props.authRedirectPath)
        let message = null;
        let redirect = null;
        if(!this.props.loading){
            if(this.props.error){
                message = <Modal show={this.state.show} top="25%"modalclosed={this.modalclosedHandler}>{this.props.error}</Modal> 
            }else{
                message = <Modal show={this.state.show} modalclosed={this.modalclosedHandler}> SuccessFully Logged In</Modal> 
            }
            if (this.props.authRedirectPath){
                this.initiateRedirect()
             }  
            
        }
        return(
            <div>
            {message}   
            <center>
            <FlexibleForm
            form ={this.state.loginform}
            inputChangedHandler={this.inputChangedHandler}
            formSubmitHandler={this.formSubmitHandler}
            breakpoint={1}
            formisvalid={this.state.formisvalid}
            loading={this.props.loading}
            />
            </center>
            
            </div>
        )


    }

}
const mapStatetoProps = state =>{
    return{
        authorized:state.login.userId !== null,
        loading:state.login.loading,
        error:state.login.error,
        authRedirectPath:state.login.authRedirectPath
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        loginhandler:(req) => dispatch(actions.startLoginProcess(req))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(WithErrorHandler(LoginForm,axios.auth)));