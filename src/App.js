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

class App extends  Component{
  componentDidMount(){
    this.props.checkAuthState()
  }
  render(){
  return (
    <div className="App">
    <Switch>
    <Route path="/dashboard" component={DashBoard}/>
      <Route path="/login"  component={Login}/>
      <Route path="/signUp"  component={SignUp}/>
      <Route path="/verify"  component={VerifyButtons}/>
      <Route path="/verification"  component={Verification}/>
      <Route path="/cart"  component={Cart}/>
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

