import React ,{Component} from 'react';
import classes from './Auth/Auth.module.css'
import Logo from '../Component/UI/Logo/Logo';
import Button from '../Component/UI/Button/button';
import Modal from '../Component/UI/Modal/Modal'
import {withRouter, Redirect} from 'react-router-dom'

class Introduction extends  Component{

    clickeHandler = (link) =>{
        this.props.history.push("/"+link)
    }


  render(){
  return (
    <div className={classes.Main}>

            <div  className={classes.Logo}>
                <center><Logo logo="LightLogo" style={{width:"60%"}}/></center>
            </div>
            <center>
                <h1 className={classes.heading}>Hey I am Tarang!! <br/>This is a Ecommerce Website developed By Me.</h1>
            </center>
            <div className={classes.Form}>
                <center>
                    <Button label= {"Visit My Ecommerce Website"} clicked={()=>this.clickeHandler("dashboard")} />
                </center>
                <center>
                    <Button label= {"Know About the Project"}   clicked={()=>this.clickeHandler("about")} />
                </center>
            </div>
    </div>


  );
  }
}





export default (withRouter(Introduction));
