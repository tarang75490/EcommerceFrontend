import React ,{Component} from 'react';
import './App.css';
import {Switch,Route,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './Store/action/index'
import Login from './Container/Auth/Login';
import SignUp from './Container/Auth/signup';
import DashBoard from './Container/Dashboard/Dashboard';
import VerifyButtons from './Container/Auth/verifyButtons';
import Verification from './Container/Auth/verification';
import Cart from './Container/Cart/Cart';
import products from './Container/Products/products';
import Product from './Container/Product/Product'
import Payment from './Container/Payment/Payment'
import Profile from './Container/Profile/Profile';
import About from './Container/About/about';
import Introduction from './Container/Introduction';
class App extends  Component{
  componentDidMount(){
    this.props.checkAuthState()
  }
  render(){
    console.log(this.props)
  return (
    <div className="App">
    <Switch>
    <Route path="/" exact component={Introduction}/>
    <Route path="/dashboard" component={DashBoard}/>
      <Route path="/login"  component={Login}/>
      <Route path="/signUp"  component={SignUp}/>
      <Route path="/verify"  component={VerifyButtons}/>
      <Route path="/verification"  component={Verification}/>
      <Route path="/cart"  component={Cart}/>
      <Route path="/products/:mainCategory/:subCategory"  component={products}/>
      <Route path="/product/:productId" component={Product}/>
      <Route path="/payment" component={Payment}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/about" component={About}/>

      </Switch>
    </div>
  );
  }
}
// const mapStateToProps = state =>{
//   return {
//     isAuthorized:state.login.Id !== null,
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
      checkAuthState :  () => dispatch(actions.authCheckState())
  }
}


export default connect(null,mapDispatchToProps)(withRouter(App));

