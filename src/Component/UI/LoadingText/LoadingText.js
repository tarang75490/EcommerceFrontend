import React,{Component} from 'react'
import classes from './Loading.module.css'
class  Loading extends Component{


    render(){
                return   <div className={classes.loading}>{this.props.label}</div>
        }
    }

 

export default Loading;