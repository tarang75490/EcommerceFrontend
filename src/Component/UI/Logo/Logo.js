import React from 'react'
import LoginLogo from '../../../Assets/Images/image2.png'
import SignUpImage from '../../../Assets/Images/image1.png'
import ToolbarLogo from '../../../Assets/Images/image3.png'
import Profile from '../../../Assets/Images/profile.png'
import Cart from '../../../Assets/Images/cart.png'
import EmptyCart from '../../../Assets/Images/emptyCart.svg'
import classes from './Logo.module.css'
import {Link} from 'react-router-dom'

// returns the path of logo needed for webpack to know

const Logo = (props) =>{

    let image= null;
    if (props.logo === "LightLogo"){
        image = <img   src={LoginLogo} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "DarkLogo"){
        image = <img   src={SignUpImage} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "ToolbarLogo"){
        image = <img   src={ToolbarLogo} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "Cart"){
        image = <img   src={Cart} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "Profile"){
        image = <img   src={Profile} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "EmptyCart"){
        image = <img   src={EmptyCart} style={props.style} alt="Colossal Logo" />
    }

    return(<div className={classes.Logo} >
        <Link to="/dashboard">{image}</Link> 
    </div>
    )
}



export default Logo