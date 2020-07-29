import React ,{Component} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../Hoc/Auxiliary/Auxiliary';
import Logo from '../../UI/Logo/Logo';
import axios from '../../../axios';
import * as actions from '../../../Store/action/index';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withErrorHandler from '../../../Hoc/WithErrorHandler/WithErrorHandler';
class NavigationItems extends Component {
    state={
        dropdownValues:null
    }
    componentDidMount(){
        axios.product.get("/getSubCategories?requestId=request").then((response)=>{
            this.setState({
                dropdownValues:response.data.data
            })
        }).catch((e)=>{

        })
    }
    clickHandler=()=>{
        this.props.logout()
        window.location.reload(false)
    }


    render(){
    let authorized = localStorage.getItem("token");
    let userName = localStorage.getItem("userName")
    let nav;
    let authLinks = null;
    let dropdownContents=[]
        if(this.state.dropdownValues){
           
            Object.keys(this.state.dropdownValues).forEach((mainCategory)=>{
                let navContent=[];
                this.state.dropdownValues[mainCategory].forEach((getSubCategory)=>{
                    navContent.push(
                        <NavigationItem  style={{border:"none"}} type="link" key={mainCategory+getSubCategory} link={'/products/'+mainCategory+"/"+getSubCategory} exact>{getSubCategory}</NavigationItem>
                    )
                })
                dropdownContents.push(
                    <div className={classes.dropdown} key={mainCategory}>
                        <NavigationItem >{mainCategory}</NavigationItem>
                        <div  key={mainCategory} className={classes.dropdowncontent}>
                        {navContent}
                        </div>
                    </div>
                )
            })
        }


    if(!authorized){
        authLinks = <NavigationItem style={{border:"none"}}  type="link" link='/login' exact>LOGIN</NavigationItem>;
    }else{
        authLinks = 
        <div class={classes.dropdown}>
        <NavigationItem type="link" style={{border:"none"}} link='/profile' style={{width:"250px",border:"none"}}>
                                HELLO {userName}
        </NavigationItem>
            <div class={classes.dropdowncontent}>
                <NavigationItem  style={{border:"none"}} type="link"  link='/profile' exact>PROFILE</NavigationItem>
                <NavigationItem   style={{border:"none"}} type="link" link='/about' exact>ABOUT</NavigationItem>
                <NavigationItem   style={{border:"none"}} clicked={this.clickHandler}  >LOGOUT</NavigationItem>
            </div>
        </div>
    }

    if (this.props.navItems === "items"){
        nav = <ul className={classes.NavigationItems}>
                <NavigationItem style={{border:"none"}} type="link" link='/cart' exact>
                        <div className={classes.cart}>
                             <Logo  style={{border:"none",height:"40%",marginTop:"17%"}} logo={"Cart"}/>
                                <span style={{border:"none",paddingTop:"25px"}}>CART</span>
                        </div>
                </NavigationItem>
        {authLinks}
         </ul>
    }else if (this.props.navItems === "essentials"){
        nav = <ul className={classes.NavigationItems}>
       {dropdownContents}
        
    </ul>
    }
return(
    <Auxiliary>
    {nav}
    </Auxiliary>
);
}
}


const mapDispatchtoProps = dispatch => {
    return {
        logout:() => dispatch(actions.logout()),
    }
}
export default connect(null,mapDispatchtoProps)(withRouter(withErrorHandler(NavigationItems,axios.product)))






// {props.isAuth ?<NavigationItem link="/Checkout">Checkout</NavigationItem>:null }
// {props.isAuth ?<NavigationItem link="/Orders">Orders</NavigationItem>:null }

// {props.isAuth ?<NavigationItem link="/logout">LogOut</NavigationItem>:
// <NavigationItem link="/auth">Authenticate</NavigationItem> }