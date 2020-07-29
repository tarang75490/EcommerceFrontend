import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
import classes from './Product.module.css'
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
import  Carousel from '../../Component/UI/Carousel/Carousel'
import Variants from '../../Component/UI/Variants/Variants'
import Modal from '../../Component/UI/Modal/Modal';
const queryString = require("query-string")


class Product extends  Component{
    state={
        authorized:false,
        active:0,
        inventory:null,
        authorized:false,
        show:false
    }
    shouldComponentUpdate(nextProps){
        if(this.props.match.params !== nextProps.match.params){
            window.location.reload(false)
        }

            
 
            if(this.props.inventory !== nextProps.inventory){
            this.initiallize(nextProps.inventory)
            }
        return true
    }
    componentDidMount(){
        console.log(this.props.match.params)
        this.props.getProductWithVariants(this.props.match.params.productId);
        if(localStorage.getItem("customerId")){
            this.setState({
                authorized:true
            })
        }
        
    }
    initiallize=(inventory)=>{
        this.setState({
             inventory:inventory[0].reservedInventory
        })
    }
    onChangeHandler=(active)=>{
        this.setState({
            active:active
        })
        console.log(this.state.active)
        this.props.getInventory([this.props.product.variants[active].variantId])
    }
    onClickHandler = (mode)=>{
        console.log("clicked")
        if(!this.state.authorized){
            this.props.history.push("/login")
        }
        if(mode==='buy'){
            console.log([this.props.product.variants[this.state.active].variantId],this.state.inventory)
        }else if(mode === 'cart'){
            const product = this.props.product
            let formData={
                customerId:localStorage.getItem("customerId"),
                productId:product.productId,
                productName:product.productName,
                quantity:this.state.inventory,
                mainCategory:product.mainCategory,
                subCategory:product.subCategory,
                quantityToBuy:1,
                ...product.variants[this.state.active]

            }
            this.props.addToCart(formData)
            console.log(formData)
            console.log([this.props.product.variants[this.state.active].variantId])
        }
        this.setState({
            show:true
        })
    }
    modalclosedHandler =()=>{
        this.setState({
            show:false
        })
    }

  render(){
//    console.log(this.props.product)

    let productContent = null;
    let productImages = null;
    let product = this.props.product;
    let buttondisabled = this.state.inventory <=  0 ;
    let buybuttonStyle= buttondisabled ? {cursor:"not-allowed",opacity:"0.5",backgroundColor:"#F74A00"} : {backgroundColor:"#F74A00"};
    let addbuttonStyle= buttondisabled ? {cursor:"not-allowed",opacity:"0.5",backgroundColor:"#FCA503"} : {backgroundColor:"#FCA503"};
    let addtocartButton = this.props.cartLoading ? <CustomSpinner/> :          <button onClick={()=>this.onClickHandler("cart")} disabled={buttondisabled} style={addbuttonStyle}>ADD TO CART</button>;
    let modal = this.props.cartError ? <Modal show={this.state.show} modalclosed={this.modalclosedHandler} >{this.props.cartError}</Modal>:null;
    if(this.props.loading){ 
        productImages = <ContentLoader/>
    }else{
        if(this.props.product){
            let Description=[]
            let Features =[]
            let inventory = null
            productImages = <Carousel thumbnails={this.props.product.thumbnails}/>
            product.description.forEach((item,index)=>{
                Description.push(<li className={classes.des} key={'d'+index}>{item}</li>)
            })
            Object.keys(product.features).forEach((feature)=>{
                Features.push(<span><strong>{feature.replace("_"," ")}</strong> : {product.features[feature]}</span>)
            })
            if(this.props.inventory){
                console.log(this.props.inventory[0].reservedInventory)
                if (this.props.inventory[0].reservedInventory>5){
                    inventory = <span className={classes.instock}>Instock({this.props.inventory[0].reservedInventory})</span>
                }else if(this.props.inventory[0].reservedInventory>0){
                    inventory = <span className={classes.hurry}><span className={classes.left}>Only {this.props.inventory[0].reservedInventory} items left</span> Hurry Up !!!</span>
                }else {
                    inventory = <span className={classes.out}>Out of Stock</span>
                }
            }
            
            productContent =  <div className={classes.productContent}>
                                <span className={classes.brand}>{product.brand}</span>
                                <span className={classes.header}>{product.productName}</span>
                                <span><hr style={{border:"1px solid black"}}/></span>
                                <span><ProductRating rating={product.productRating}/></span>
                                <Variants changed={this.onChangeHandler} variants={product.variants}/>
                                {inventory}     
                                <spav className={classes.expected}>Expected Working Days : {product.workingDays}</spav>                        
                                <div className={classes.features}>
                                <span className={classes.header2}>Features</span>
                                {Features}
                                </div>
                                <div className={classes.description}>
                                <ul>
                                {Description}
                                </ul>
                                </div>
                                </div>
        }else{
            productImages = <span>No product Images Found</span>
            productContent = <span>No productContents Available</span>
        }
    }
    let buttons = <div className={classes.productButton}>
        {addtocartButton}
        <button onClick={()=>this.onClickHandler("buy")} disabled={buttondisabled} style={buybuttonStyle}>BUY NOW</button>
    </div>
  return (
    <Layout>
        {modal}
        <div className={classes.Product}>
        <div className={classes.productImage}>
        {productImages}
        {buttons}
        </div>
        {productContent}
        </div>
      
    </Layout>
  );
  }
}



const mapStatetoProps = state =>{
    return{
        product:state.product.product,
        loading:state.product.loading,
        error:state.product.error,
        inventoryLoading:state.inventory.loading,
        inventory:state.inventory.inventory,
        inventoryerror:state.inventory.error,
        cartLoading:state.cart.loading,
        cartError:state.cart.error
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getProductWithVariants:(req) => dispatch(actions.getProductWithVariants(req)),
        getInventory:(req) => dispatch(actions.getInventory(req)),
        addToCart:(req)=> dispatch(actions.addProductsToCart(req))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(WithErrorHandler(Product,axios.product)));