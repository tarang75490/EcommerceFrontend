import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
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
import FlexibleFormBox from '../../Component/UI/FlexibleForm/FlexibleForm';
import ContentLoader from '../../Component/UI/ContentLoader/contentLoader'
import ProductRating from '../../Component/UI/ProductRating/ProductRating'
import Filter from './Filter';
const queryString = require("query-string")


class Product extends  Component{
    state={
        authorized:false,
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
      
    }
    productHandler = (productId) =>{
            this.props.history.push('/product/'+productId)
    }


  render(){
    let products = [];
    if(this.props.loadingProducts){
        products = <ContentLoader content="products"/>
    }else{

        if(this.props.products){
            this.props.products.forEach((product)=>{
                console.log(product)
                let image = "https://ecommerce12.s3.ap-south-1.amazonaws.com/"+product.productFeatures.thumbnails[0]
                let prod = <div className={classes.product} onClick={()=>this.productHandler(product.productId)}>
                            <img className={classes.productImage} src={image} />
                            <div className={classes.info}>
                            <center><button className={classes.productsbutton}>ADD TO CART</button></center>
                            <span className={classes.label}>{product.productFeatures.productName}</span>
                            <span className={classes.label}>{product.productFeatures.BRAND}</span>
                            <span className={classes.price}>&#8377; {product.price}</span>
                            <center><ProductRating rating={product.productFeatures.productRating}/></center>
                            
                            </div>
                        </div>
                products.push(prod)
            })
        }else{
            products = <span>No Product Found</span>
        }
    }
  return (
    <Layout>
        <div className={classes.productScreen}>
        <Filter/>
        <Logo logo="filter" style={{width:"1000%"}}/>
        <div className={classes.products}>{products}</div>
        </div>
    </Layout>
  );
  }
}



const mapStatetoProps = state =>{
    return{
        products:state.products.products,
        loadingProducts:state.products.loading,
        error:state.products.error
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getProducts:(req) => dispatch(actions.getProducts(req))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(WithErrorHandler(Product,axios.product)));