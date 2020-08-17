import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter, Redirect } from 'react-router-dom';
import classes from './Payment.module.css'
import NavigationItem from '../../Component/Navigation/NavigationItems/NavigationItem/NavigationItem'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios';
import {connect} from 'react-redux';
import payment from '../../Assets/Images/payment.png'
import Modal from '../../Component/UI/Modal/Modal'
import * as actions from '../../Store/action/index'

class CheckOut extends  Component{
    state={
        authorized:false,
        show:false
    }
    componentDidMount(){
        if(localStorage.getItem("customerId")){
            this.setState({
                authorized:true
            })
           
        }else{
            this.props.history.push("/login");
        }
    }
    // shouldComponentUpdate(){


    //     return true;
    // }

    paymentHandler = () =>{
        this.props.initializeAndMakePayement();
        this.setState({
            show:true
        })
    }
    payemntpush=()=>{
        setTimeout(()=>{
            this.props.history.push("/dashboard");
        },1000)
    }

    modalCloseHandler =()=>{
        this.setState({
            show:false
        })
    }

  render(){
      let content = null,modal=null;
       content = 
            <div className={classes.payment}>
            <header className={classes.paymentHeader}><img alt={"Payment Logo"} style={{width:"4%"}} src={payment}></img><div style={{marginTop:"1%"}}>Payment</div></header>
            <div className={classes.paymentBody}>
            <Button  loading={this.props.loading} label="DO PAYMENT with Razor Pay" width="30%" clicked={this.paymentHandler}/>
            </div>
            </div>
        if(!this.props.loading && this.props.response){
           modal =  <Modal modalclosed={this.modalCloseHandler} show={this.state.show}>{this.props.response}</Modal>;
           this.payemntpush();
        }
        

      
  return (
    <Layout>
        {modal}
      
        {content}
    </Layout>
  );
  }
}


const mapStatetoProps = state =>{
    return{
        response:state.payment.response,
        loading:state.payment.loading,
        error:state.payment.error,
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        initializeAndMakePayement:() => dispatch(actions.initializeAndMakePayment()),
      
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(withErrorHandler(CheckOut,axios.payment)));
