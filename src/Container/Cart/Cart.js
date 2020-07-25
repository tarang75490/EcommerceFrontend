import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
import classes from './Cart.module.css'
import NavigationItem from '../../Component/Navigation/NavigationItems/NavigationItem/NavigationItem'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
class Cart extends  Component{
    state={
        authorized:false
    }
    componentDidMount(){
        if(localStorage.getItem("customerId")){
            this.setState({
                authorized:true
            })
        }
    }


  render(){
  return (
    <Layout>
        <div className={classes.cartcontent}>
        <div className={classes.item1}>
        <Logo logo={"EmptyCart"} style={{width:"100%"}}/>
        </div>
            <div className={classes.item2}>
            <span className={classes.cartTitle}>Your Colossal Empty is Cart</span>
            <br/>
            <Button type="link" link="/login" label="LOGIN TO ACCESS CART" width="100%"/>
            <Button type="link" link="/signUp" label="SIGNUP TO ACCESS CART" width="100%"/>
            </div> 
        </div>
    </Layout>
  );
  }
}

export default withRouter(Cart);
