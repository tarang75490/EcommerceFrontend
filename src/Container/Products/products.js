import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter, Route ,Link} from 'react-router-dom';
import classes from './products.module.css'
import {connect} from "react-redux";
import axios from '../../axios';
import * as actions from '../../Store/action/index'
import WithErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler'
import NavigationItem from '../../Component/Navigation/NavigationItems/NavigationItem/NavigationItem'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import utilityFunction from '../UtilityFunction/utilityFunction'
import CustomSpinner from '../../Component/UI/Spinner/Spinner';
import NoProduct from '../../Assets/Images/no-product-found.png'
import FlexibleFormBox from '../../Component/UI/FlexibleForm/FlexibleForm';
import ContentLoader from '../../Component/UI/ContentLoader/contentLoader'
import ProductRating from '../../Component/UI/ProductRating/ProductRating'
import Filter from './Filter';
import Modal from '../../Component/UI/Modal/Modal';
const queryString = require("query-string")


class Product extends  Component{
    state={
        authorized:false,
        show:false
    }
    shouldComponentUpdate(nextProps){
        if(this.props.match.params !== nextProps.match.params){
            window.location.reload(false)
        }
        return true
    }
    componentDidMount(){
        console.log(this.props.match.params)
        const querystring = queryString.stringify(this.props.match.params);
        this.props.getProducts(this.props.match.params);
        if(localStorage.getItem("customerId")){
            this.setState({
                authorized:true
            })
        }
      
    }
    productHandler = (product,mode) =>{
        console.log(mode)
        if(mode){
         
                    if (!this.state.authorized){
                        this.props.history.push("/login")
                }else{
                let formdata={
                    customerId:localStorage.getItem("customerId"),
                    productName:product.productFeatures.productName,
                    productId:product.productId,
                    mainCategory:product.mainCategory,
                    subCategory:product.subCategory,
                    variantId:product.variantId,
                    price:product.price,
                    quantityToBuy:1,
                    quantity:product.quantity
                }
                this.props.addToCart(formdata)
                this.setState({
                    show:true
                })
                setTimeout(()=>{
                    this.setState({
                        show:false
                    })
                },2000)
            }
        }else{
            this.props.history.push('/product/'+product.productId)
        }
    }
    // addProductsToCart(product){

    // }

    modalclosed = () =>{
        this.setState({
            show:false
        })
    }
  render(){
    let products = [];
    console.log(this.props.cartLoading,this.props.cartError,this.props.message)
    console.log(this.props.products)
    let modal;
    console.log(this.state.show)
    if(this.props.cartError ||  this.props.message){
        modal = <Modal show={this.state.show} modalclosed={this.modalclosed}>{this.props.cartError? this.props.cartError:this.props.message}</Modal>
    }
    
    if(this.props.loadingProducts){
        products = [<ContentLoader content={"products"}/>]
    }else{

        if(this.props.products){
            if(this.props.products.length>0){
            this.props.products.forEach((product)=>{
                // console.log(product)
                
                let image = "https://ecommerce12.s3.ap-south-1.amazonaws.com/"+product.productFeatures.thumbnails[0]
                console.log(product.productFeatures.thumbnails)
                let prod = <div className={classes.product}>
                            
                            <img className={classes.productImage} src={image} onClick={()=>this.productHandler(product)}onClick={()=>this.productHandler(product)}/>
                            <div className={classes.info}>
                            <center><button className={classes.productsbutton} onClick={()=>this.productHandler(product,"add")} >ADD TO CART</button></center>
                            <span className={classes.label}>{product.productFeatures.productName}</span>
                            <span className={classes.label}>{product.productFeatures.BRAND}</span>
                            <span className={classes.price} onClick={()=>this.productHandler(product)}>&#8377; {product.price}</span>
                            <center onClick={()=>this.productHandler(product)}><ProductRating rating={product.productFeatures.productRating}/></center>
                            
                            </div>
                        </div>
                products.push(prod)
            })
        }else{
            products = <span className={classes.noProduct}>
                            <img src={NoProduct} alt="NoProduct"  />
                            </span>
        }
    }
    }
    console.log(products)
  return (
    <Layout>
        <div className={classes.screen}>
        <span className={classes.route}><Link to="/dashboard">Home{" "}</Link>/{" "}{this.props.match.params.mainCategory}{" "}/{" "}{this.props.match.params.subCategory}</span>
        <div className={classes.productScreen}>
        {modal}
        <Filter/>
        <Logo logo="filter" style={{width:"1000%"}}/>
        <div className={classes.products}>
        {products}
        </div>
        </div>
        </div>
    </Layout>
  );
  }
}



const mapStatetoProps = state =>{
    return{
        products:state.products.products,
        loadingProducts:state.products.loading,
        error:state.products.error,
        cartLoading:state.cart.loading,
        cartError:state.cart.error,
        message:state.cart.product,
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getProducts:(req) => dispatch(actions.getProducts(req)),
        addToCart:(req)=> dispatch(actions.addProductsToCart(req))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(WithErrorHandler(Product,axios.product)));