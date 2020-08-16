import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import classes from './dashboard.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import laptop from '../../Assets/Images/laptop1.jpg'
class DashBoard extends  Component{
    


  render(){
    let productImages=[
      <div className={classes.container} ><img  src={laptop}></img>  <button className={classes.btn}>Laptop</button></div>
    ]
  return (
    <Layout>
    {productImages}
    </Layout>
  );
  }
}

export default withRouter(DashBoard);
