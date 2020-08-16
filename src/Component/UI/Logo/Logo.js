import React from 'react'
import LoginLogo from '../../../Assets/Images/image2.png'
import SignUpImage from '../../../Assets/Images/image1.png'
import ToolbarLogo from '../../../Assets/Images/image3.png'
import Profile from '../../../Assets/Images/profile.png'
import Cart from '../../../Assets/Images/cart.png'
import Filter from '../../../Assets/Images/filter.jpeg'
import EmptyCart from '../../../Assets/Images/emptyCart.svg'
import Dustbin from '../../../Assets/Images/dustbin.png'
import NoProduct from '../../../Assets/Images/no-product-found.png'
import Instagram from '../../../Assets/Images/instagram.png'
import Linkedin from '../../../Assets/Images/linkedin.png'
import Github from '../../../Assets/Images/github2.png'
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
    }else if(props.logo === "Filter"){
        image = <img   src={Filter} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "Dustbin"){
        image = <img   src={Dustbin} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "NoProduct"){
        image = <img   src={NoProduct} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "Github"){
        image = <img   src={Github} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "Instagram"){
        image = <img   src={Instagram} style={props.style} alt="Colossal Logo" />
    }else if(props.logo === "Linkedin"){
        image = <img   src={Linkedin} style={props.style} alt="Colossal Logo" />
    }
    let imageLink = null;
    if(props.link){
        imageLink = <div className={classes.Logo} >
        <Link to={props.link}>{image}</Link> 
    </div>
    }else if(props.alink){
        image = <a href={props.alink} target="_blank">
                {image}
                </a>
    
    }else{
        imageLink = <div className={classes.Logo} >
    {image}
    </div>  
    }
    return(image)
}



export default Logo