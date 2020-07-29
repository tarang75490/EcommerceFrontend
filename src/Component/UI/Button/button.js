import React ,{Component} from 'react';
import classes from './button.module.css'
import Spinner from '../Spinner/Spinner'
import {NavLink} from 'react-router-dom'

class Button extends  Component{
  

  render(){
  const cursor = this.props.disabled ? "not-allowed" :"cursor";
  let but = null;
  if(this.props.type==='link'){
    but = <div className={classes.NavigationItem}>
          <a className={classes.link} href={this.props.link}>
              {this.props.label}
          </a>
          </div>
  }else{
      but = <button className={classes.button} style={{cursor:cursor,width:this.props.width,fontSize:this.props.fontSize}}  disabled={this.props.disabled} onClick={this.props.clicked}>{this.props.label}</button>
  }
  const button = this.props.loading ? <Spinner/>:  but;

  return (button);
  }
}

export default Button;
