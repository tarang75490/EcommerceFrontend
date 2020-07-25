import React ,{Component}from 'react'


import {withRouter,Link} from 'react-router-dom'
import FlexibleForm from '../../../Component/UI/FlexibleForm/FlexibleForm'
import WithErrorHandler from '../../../Hoc/WithErrorHandler/WithErrorHandler'
import utilityFunction from '../../UtilityFunction/utilityFunction'
import * as actions from '../../../Store/action/index'
import  axios from '../../../axios'
import { connect } from 'react-redux'
import Spinner from '../../../Component/UI/Spinner/Spinner'
import Modal from '../../../Component/UI/Modal/Modal'
import AlertBox from '../../../Component/UI/AlertBox/AlertBox'

class SignUpForm extends Component{
    state={
        show:false,
        formisvalid:false,
        signUpform:{

            userName:{
                elementType:'text',
                config:{
                    type:'text',
                    placeholder:"UserName"
                },
                value:"",
                validation:{
                    required:true
                },
                valid:false,
                touched:false

            },
            email:{
                elementType:'number',
                config:{
                    type:'text',
                    placeholder:"Email Id"
                },
                value:"",
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false
            },
            mobileNo:{
                elementType:'number',
                config:{
                    type:'text',
                    placeholder:"Mobile No"
                },
                value:"",
                validation:{
                    required:true,
                    mobile:true
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
                label:"SIGN UP"
            }
        }
    }
    formSubmitHandler=(e)=>{
        e.preventDefault();
        const state = this.state.signUpform
        const formData={}
        for(let formidentifier in this.state.signUpform){
            if(formidentifier !== 'button'){
            formData[formidentifier] = this.state.signUpform[formidentifier].value
            }
        }
       
        formData["mobileNo"] = Number(formData["mobileNo"])
        console.log(formData)
        this.props.signUphandler(formData)
        this.setState({
            show:true
        })

        
    }
    inputChangedHandler=(event,inputidentifier)=>{
        const change = utilityFunction.inputChangedHandler(event,inputidentifier,this.state.signUpform)
        console.log(change)
        this.setState({
            signUpform:change.form,
            formisvalid:change.formisvalid
        })
    }
    modalclosedHandler = () =>{
        this.setState({
            show:false
        })
    }
    initiateRedirect = ()=>{
        setTimeout(()=>{
            this.props.history.push("/verify")
        },500)
    }
    render(){
        console.log(this.props)
        let message = null;
        if(!this.props.loading){
            if(this.props.error){
                message = <Modal show={this.state.show} modalclosed={this.modalclosedHandler}>{this.props.error}</Modal> 
            }else{
                message = <Modal show={this.state.show} modalclosed={this.modalclosedHandler}>Registered Successfully ! Verify Your Account</Modal> 
                if(this.props.authorized){
                this.initiateRedirect()
                }   
            }
        }

        return(
            <div>
            {message}
            <center>
            <FlexibleForm
            form ={this.state.signUpform}
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
        authorized:state.signUp.customerId !== null,
        loading:state.signUp.loading,
        error:state.signUp.error
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        signUphandler:(req) => dispatch(actions.signingUp(req))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(WithErrorHandler(SignUpForm,axios.customer)));