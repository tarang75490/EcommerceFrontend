import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter, Redirect } from 'react-router-dom';
import classes from './Profile.module.css'
import NavigationItem from '../../Component/Navigation/NavigationItems/NavigationItem/NavigationItem'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios';
import {connect} from 'react-redux';
import payment from '../../Assets/Images/payment.png'
import Modal from '../../Component/UI/Modal/Modal'
import * as actions from '../../Store/action/index'
import Spinner from '../../Component/UI/Spinner/Spinner'

class Profile extends  Component{
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
            this.props.history.push("/dashboard")
        }
        this.props.getProfile();
        this.props.getProfileHistory();
    }

    // shouldComponentUpdate(){


    //     return true;
    // }
    productHandler=(productId)=>{
        this.props.history.push("/product/"+productId)
    }

    getProfileJSX(){
        let profile;
        profile = 
        this.props.profile ? 
        <div className={classes.profileItem}>
            <div className={classes.profileHeader}>
            Profile Info
            <hr className={classes.line}/>
            </div>
            <div className={classes.profileBody}>
            <div className={classes.item}>
                <div className={classes.pheader}>Username</div>
                <div className={classes.pcontent}>{this.props.profile.userName}</div>
            </div>
            <div className={classes.item}>
                <div className={classes.pheader}>Moblie No</div>
                <div className={classes.pcontent}>{this.props.profile.mobileNo}</div>
            </div>
            <div className={classes.item}>
                <div className={classes.pheader}>Email</div>
                <div className={classes.pcontent}>{this.props.profile.email}</div>
            </div>
            <div className={classes.item}>
            <div className={classes.pheader}>OTP Verified</div>
            <div className={classes.pcontent}>{this.props.profile.otpVerified ? "True":"False"}</div>
        </div>
        </div>
        </div>:
        (this.props.loading) ? <Spinner/>: "No Profile Found";

        return profile;
    }

    getProfileHistoryJSX (){
        let profile;
        profile = 
        this.props.profileHistory ? 
        <div className={classes.profileItem}>
            <div className={classes.profileHeader}>
            Customer Transaction History ({this.props.profileHistory.length})
            <hr className={classes.line}/>
            </div>
            <div className={classes.profileBody}>
            {this.props.profileHistory.map((item,index)=>(
                <div key={index}>
                <div className={classes.profileBody}>
            <div className={classes.item}>
                <div className={classes.ppheader}>Transaction_{index+1}</div>    
            </div>
            <div className={classes.item}>
                <div className={classes.pheader}>Transaction Date</div>
                <div className={classes.pcontent}>{new Date(this.props.profileHistory[index].createdAt).toDateString()}</div>
            </div>
            <div className={classes.item}>
                <div className={classes.pheader}>Total Amount</div>
                <div className={classes.pcontent}>Rs. {this.props.profileHistory[index].totalAmount}</div>
            </div>
            <div className={classes.item}>
                <div className={classes.pheader}>Total Products</div>
                <div className={classes.pcontent}>{this.props.profileHistory[index].transactionDetails.length} Products</div>
            </div>
            <div className={classes.item}>
                <div className={classes.ppheader}>Transaction Details :</div>    
            </div>
            {this.props.profileHistory[index].transactionDetails.map((item)=>(
                <div className={classes.item}>
                    <img src= {"https://ecommerce12.s3.ap-south-1.amazonaws.com/"+item.mainCategory+"/"+item.productId+"@1"} 
                    alt={item.variantId}
                    className={classes.productImage}
                    onClick={()=>this.productHandler(item.productId)}
                    ></img>
                <div className={classes.productitemcontent} onClick={()=>this.productHandler(item.productId)} >
                        <span className={classes.cartItemheader}>{item.productName}</span>
                        <div className={classes.price}><span style={{color:"grey"}}>Deal Price </span>: Rs. {item.price}</div>
                        <div className={classes.quantityToBuy}>Quantity Purchased: {item.quantityToBuy}</div><br/>
                       
                    </div>
                </div>
            ))}
        </div>
                </div>
            ))}
        </div>
        
        </div>:
        (this.props.loadingH) ? <Spinner/>: "No Profile Found";

        return profile;
    
    }

  

  render(){
    console.log(this.props.profile)
    console.log(this.props.profileHistory)
    let profile = this.getProfileJSX()
    let history = this.getProfileHistoryJSX()

      
  return (
    <Layout>
    <div className={classes.profile}>
      {profile}
      {history}
      </div>
    </Layout>
  );
  }
}


const mapStatetoProps = state =>{
    return{
        profile:state.profile.profile,
        loading:state.profile.loading,
        error:state.profile.error,
        profileHistory:state.profile.profileHistory,
        loadingH:state.profile.loadingH,
        errorH:state.profile.errorH,
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getProfile:() => dispatch(actions.getProfile()),
        getProfileHistory :()=>dispatch(actions.getProfileHistory())
      
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(withErrorHandler(Profile,axios.customer)));
