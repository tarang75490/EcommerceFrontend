import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom'
const NavigationItem = (props) =>{

let link = null;
if (props.type==="link"){
    link = <NavLink
    style={props.style}
    activeClassName={classes.active} 
    exact={props.exact}
    to={props.link}
    >{props.children}</NavLink>
}else{
    link = <span  onClick={props.clicked} style={props.style}>{props.children}</span>
}

return(
<li className={classes.NavigationItem}>
    {link}
</li>
);
}

export default NavigationItem