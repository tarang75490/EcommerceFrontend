import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
import classes from './Cart.module.css'
import NavigationItem from '../../Component/Navigation/NavigationItems/NavigationItem/NavigationItem'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios';
import {connect} from 'react-redux';
import * as actions from '../../Store/action/index'
import Spinner from '../../Component/UI/Spinner/Spinner'
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
        this.props.getProducts()
    }


  render(){
      let cartContent;
      console.log(this.props.product)
      if(!this.state.authorized){

          cartContent =<div className={classes.cartcontent}>
                         <div className={classes.item1}>
                        <Logo logo={"EmptyCart"} style={{width:"100%"}}/>
                        </div>
                            <div className={classes.item2}>
                            <span className={classes.emptyTitle}>Your Colossal Empty is Cart</span>
                            <br/>
                            <Button type="link" link="/login" label="LOGIN TO ACCESS CART" width="100%"/>
                            <Button type="link" link="/signUp" label="SIGNUP TO ACCESS CART" width="100%"/>
                            </div> 
                            </div>

      }else{
        
        let products = [];
        if(!this.props.loading){
            if(this.props.product){
                if(this.props.product.length>0){
                    
                    this.props.product.forEach(()=>{
                        products.push(<div className={classes.cartItem}>

                                </div>)
                    })
                }else{
                    products= <span className={classes.emptyCart}>No Products Found</span>
                }
            }
            }else{
                products = <Spinner/>
            }


          cartContent =<div className={classes.cartcontent2}>
                <div className={classes.cartitems}>
                    <span className={classes.cartTitle}>My Shopping Cart({this.props.product ? this.props.product.length:0})</span>
                    <hr style={{border:"1px solid #787d79"}}/>
                    <div>{products}</div>
                </div>
                <div className={classes.calculations}>
                <span className={classes.cartTitle}>PRICE DETAILS</span>
                <hr style={{border:"1px solid #787d79"}}/>
                </div>
                
                </div>
      }
  return (
    <Layout>
        
        {cartContent}
      
    </Layout>
  );
  }
}


const mapStatetoProps = state =>{
    return{
        product:state.cart.cartProducts,
        loading:state.cart.cartLoading,
        error:state.cart.cartError,
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getProducts:() => dispatch(actions.getProductsOfCart()),
      
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(withErrorHandler(Cart,axios.cart)));
