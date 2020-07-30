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
import CartItem from './CartItem'
import emptyCart from '../../Assets/Images/empty-cart.png'
import cart from '../../Assets/Images/cart2.png'
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
      let summary =[];
      console.log(this.props.product)
    //   const emptybutton = this.props.loading ? <span>Removing ...</span> :<button classes={this.removeButton} onClick={()=>this.Cart()}>Empty Cart</button>
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
                    let total = 0
                    this.props.product.forEach((product,index)=>{
                        console.log(product)
                        products.push(<CartItem product={product} />)
                        total += product.quantityToBuy * product.price;
                        summary.push(<span className={classes.subtotal}><span style={{color:"grey",width:"20%"}}>Item {index+1} :</span><span className={classes.calculate} > {product.quantityToBuy} x {product.price}  </span> = {product.quantityToBuy * product.price}</span>)
                    })
                    summary.push(<span><hr/></span>)
                    summary.push(<span className={classes.subtotal}><span style={{color:"grey",width:"20%"}}>Total: </span> {total}</span>)
                    summary.push(<button className={classes.buy}>PROCEED TO BUY</button>)
                }else{
                    products= <span className={classes.emptyCart}>
                    <img src={emptyCart}  /></span>
                }
            }
            }else{
                products = <Spinner/>
            }


          cartContent =<div className={classes.cart}>
                <center>
                <span className={classes.cartHeader}><img src={cart} style={{width:"5%"}} alt={"Cart Logo"}/>Your Cart ({this.props.product ? this.props.product.length:0})</span>
                </center>
                <div className={classes.cartcontent2}>
                <div className={classes.cartitems}>
                    <span className={classes.cartTitle}>My Shopping Cart ({this.props.product ? this.props.product.length:0})</span>
                    <hr style={{border:"1px solid #787d79"}}/>
                    <div>{products}</div>
                </div>
                <div className={classes.calculations}>
                <span className={classes.cartTitle}>Order Summary</span>
                <span><hr style={{border:"1px solid #787d79"}}/></span>
                {summary}
                </div>
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
