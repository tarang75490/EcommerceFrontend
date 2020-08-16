import React,{Component} from 'react'
import  classes from './CartItem.module.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actions from '../../Store/action/index'
import withErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler'
import axios from '../../axios'
import Logo from '../../Component/UI/Logo/Logo'
import AlertBox from '../../Component/UI/AlertBox/AlertBox'
import Modal from '../../Component/UI/Modal/Modal'
class  CartItem extends Component{
    state={
        show:false,
        quantity:null,
        quantityToBuy:null,
    }

    componentDidMount(){
        this.setState({
            quantity:this.props.product.quantity,
            quantityToBuy:this.props.product.quantityToBuy
        })
    }
    removeProductHander=(variantId)=>{
        const formdata= {
            variantId:variantId,
            customerId:localStorage.getItem("customerId")
        }
        console.log(formdata)
        this.props.removeProduct(formdata)
        this.setState({
          show:true  
        })
        
    }
    onchangeHandler=(e,mode,variantId)=>{
        console.log(e.target.value)
        let quantityToBuy = this.state.quantityToBuy;
        if(mode === 'plus'){
            if(this.state.quantity>=quantityToBuy+1){
            quantityToBuy +=1
            }
        }else{
            if(quantityToBuy>1){
                quantityToBuy-=1
            }
        }
        this.setState({
            quantityToBuy:quantityToBuy
        })
        this.props.updateQuantityToBuy({
            customerId:localStorage.getItem("customerId"),
            variantId:variantId,
            quantityToBuy:quantityToBuy
        })
    }
    modalcloseHandler=()=>{
        this.setState({
            show:false
        })
    }
    productHandler=(productId)=>{
        this.props.history.push("/product/"+productId)
    }
    render(){
        let inventory = null;
        let product = this.props.product
        let item = null;
        console.log(this.props.product)
        const modal = this.props.removeData ? <Modal show={this.state.show} modalclosed={this.modalcloseHandler}>{this.props.removeData}</Modal>:null;
        if(this.props.product){
            
            const button = <button className={classes.remove} onClick={()=>this.removeProductHander(product.variantId)}><Logo logo={"Dustbin"} style={{width:"100%"}}/></button>
                console.log(this.props.quantity)
                if (product.quantity){
                    inventory = <span className={classes.instock}>Instock({product.quantity})</span>
                }else if(product.quantity>0){
                    inventory = <span className={classes.hurry}><span className={classes.left}>Only {product.quantity} items left</span> Hurry Up !!!</span>
                }else {
                    inventory = <span className={classes.out}>Out of Stock</span>
                }
        
            let image = "https://ecommerce12.s3.ap-south-1.amazonaws.com/"+product.mainCategory+"/"+product.productId+"@1"
            item = <div className={classes.cartItem}> 
                        {modal}
                        {button}
                        <img className={classes.productImage} src={image} onClick={()=>this.productHandler(product.productId)} />
                        <div className={classes.cartitemcontent} onClick={()=>this.productHandler(product.productId)} >
                                <span className={classes.cartItemheader}>{product.productName}</span>
                                {inventory}
                                <div className={classes.price}><span style={{color:"grey"}}>Deal Price </span>: Rs. {product.price}</div>
                         </div>
                         <div className={classes.quantityToBuy}>
                         <div style={{color:"grey",fontSize:"1.5em"}}>Quantity</div><br/>
                         <span className={classes.sign} onClick={(e)=>this.onchangeHandler(e,"minus",product.variantId)}>&minus;</span> 
                                 <span className={classes.number}>{this.state.quantityToBuy}</span> 
                         <span className={classes.sign} onClick={(e)=>this.onchangeHandler(e,"plus",product.variantId)}>&#x2B;</span>
                 </div>
                    </div>
        }

        return(
            item
        )
    }

}

const mapStatetoProps = state =>{
    return{
        removeData:state.cart.removeData,
        loading:state.cart.removeLoading,
        error:state.cart.removeError,
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        removeProduct:(req) => dispatch(actions.removeFromCart(req)),
        updateQuantityToBuy:(req)=> dispatch(actions.updateQuantityToBuy(req))
    }
}

 

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(withErrorHandler(CartItem,axios.cart)));

// { <p className="legend">{index}</p>}