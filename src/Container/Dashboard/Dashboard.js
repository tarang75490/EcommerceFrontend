import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
import classes from './dashboard.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import image1 from '../../Assets/Images/dashboard1.jpeg';
import image2 from '../../Assets/Images/clothes.jpeg';
import image4 from '../../Assets/Images/clothes2.jpeg';
import image5 from '../../Assets/Images/iphone.jpeg';
import image6 from '../../Assets/Images/laptop.jpg';
import image7 from '../../Assets/Images/clothes3.jpeg';
import image8 from '../../Assets/Images/clothes4.jpg';
import image9 from '../../Assets/Images/camera.jpg';
import image10 from '../../Assets/Images/shoes.jpg';
import {Carousel,Container} from 'react-bootstrap'
import image3 from '../../Assets/Images/dashboard11.jpg';
class DashBoard extends  Component{
    state={
      index:0
    }

    handleSelect=(selected,e)=>{
      this.setState({
        index:selected
      })
    }


  render(){

  return (
    <Layout>
    <div className={classes.container}>
        <img src={image3} alt="New york" className={classes.mainImage}/>
        <h1>Welcome !!<br/><b>Enjoy Shopping</b></h1>
      </div>
      <div className={classes.images}>
      <img src={image6} alt="New york" className={classes.mainImage}/>
      <img src={image9} alt="New york" className={classes.mainImage}/>
      <img src={image10} alt="New york" className={classes.mainImage}/>
      <img src={image7} alt="New york" className={classes.mainImage}/>
      <img src={image1} alt="New york" className={classes.mainImage}/> 
      <img src={image2} alt="New york" className={classes.mainImage}/>
      </div>
      <div className={classes.container2}>
      <span  className={classes.text}>Login</span>
      <span  className={classes.text}>---></span>
       <span className={classes.text}> Verify</span>
       <span  className={classes.text}>---></span> 
       <span className={classes.text}>Add TO Cart</span>
       <span  className={classes.text}>---></span>
       <span className={classes.text}> Buy</span>
      </div>
      <div className={classes.images}>
      <img src={image8} alt="New york" className={classes.mainImage}/>
      <img src={image4} alt="New york" className={classes.mainImage}/>
      <img src={image5} alt="New york" className={classes.mainImage}/>
    
     
      </div>
  
    </Layout>
  );
  }
}

export default withRouter(DashBoard);
