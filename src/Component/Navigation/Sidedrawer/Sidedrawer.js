import React from 'react'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../Hoc/Auxiliary/Auxiliary'

const SideDrawer = (props) =>{
    let attachedClasses = [classes.Sidedrawer,classes.Close];
    if (props.open){
        attachedClasses=[classes.Sidedrawer,classes.Open]
    }
    return(
        <Aux>
         <Backdrop className={classes.Backdrop} show={props.open} clicked={props.closed}/>
        <div className ={attachedClasses.join(' ')}>
            <div className={classes.Logo}> <Logo logo="ToolbarLogo" style={{width:"150px"}}/>
            </div>
            <nav>
                <NavigationItems isAuth= {props.isAuth} navItems="essentials"/>
            </nav>
            <nav>
            <NavigationItems isAuth= {props.isAuth} navItems="items"/>
            </nav>
        </div>
        </Aux>
    );
}


export default SideDrawer