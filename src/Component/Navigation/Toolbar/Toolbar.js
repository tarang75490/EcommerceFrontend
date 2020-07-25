import React from 'react'
import classes  from'./Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import {Link} from 'react-router-dom'
import NavigationItems from '../NavigationItems/NavigationItems'
import Drawertoggle from '../Sidedrawer/DrawerToggle/Drawertoggle'
const Toolbar = (props) => {
return(
    <header className={classes.Toolbar}>
        <Drawertoggle clicked={props.drawtoggleclicked}/>   
        <div className={classes.Logo}><Link to="/dashboard"><Logo logo="ToolbarLogo" style={{width:"155px"}}/></Link></div>
        <nav className={classes.nav1}>
            <NavigationItems navItems="essentials" isAuth={props.isAuth}/>
        </nav>
        <nav className={classes.nav2}>
            <NavigationItems navItems="items" isAuth={props.isAuth}/>
        </nav>
    </header>
);
}


export default Toolbar;