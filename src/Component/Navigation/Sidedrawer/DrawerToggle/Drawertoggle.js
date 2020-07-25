import React from 'react'
import classes from './Drawtoggle.module.css'
const Drawtoggle=(props)=>{
    return(
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Drawtoggle