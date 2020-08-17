import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter, Redirect } from 'react-router-dom';
import classes from './About.module.css'


class About extends  Component{
  

  

  render(){

      
  return (
    <Layout>
    <div className={classes.about}>
    <span className={classes.aboutHeader}>About</span>
    <hr className={classes.line}/>
    <p className={classes.content}>
     This is Demo Project Made By Tarang Khetan (2018383@iiitdmj.ac.in).<br/>
     This domain of the project in ecommerce and then we have divided the domain into subdomains on the basis of which the microservices have been developed .
     </p><br/>
     <p className={classes.content}>The SubDoamins Or Microservices :</p>
     <ul>
     <li>The Product Management<br/>
     <a href="https://github.com/tarang75490/ecommerceProductmodule">GIthub Link</a></li>
     <li> The Customer Management<br/>
     <a href="https://github.com/tarang75490/ecommerceCustomerModule">GIthub Link</a></li>
     <li>The Order Management<br/>
     <a href="https://github.com/tarang75490/ecommerceCartModule">GIthub Link</a><br/>
     <a href="https://github.com/tarang75490/ecommerceCartModuleWithSql">GIthub Link</a><br/></li>
     <li>The Authentication And Authorization<br/> 
     <a href="https://github.com/tarang75490/ecommerceAuthorization_AuthenticationModule">GIthub Link</a></li>
     <li> The Payment<br/>
     <a href="https://github.com/tarang75490/ecommerceProductmodule">GIthub Link</a></li>
     <li>The Notification Management<br/>
     <a href="https://github.com/tarang75490/ecommerceNotifyServiceModule">GIthub Link</a></li>
    </ul>
    <p className={classes.content}>Frontend by ReactJs:</p>
    <ul>
    <li>Frontend<br/>
    <a href="https://github.com/tarang75490/EcommerceFrontend">GIthub Link</a></li>
   </ul>
    <p className={classes.content}>
     The APIs Of All these , one interested can see it in <b>Swagger</b> links available in  GIthub Page of corresponding Subdomains.<br/>
     </p>
     <p className={classes.content}>
     Techinal Stack Used in this Ecommerce Site is <b>MERN </b>Stack:
     </p>
     <ul>
     <li> Database Used <b> MongoDB</b> and <b> MySQL</b>.</li>
     <li> Framework Used for Backend <b>NodeJS</b> to Develop <b>RESTful APIs</b>.</li>
     <li> Framwork Used for Frontend <b>ReactJs</b> with the help of CSS.</li>
     <li> Architecture Used in this Project <b>Microservice Architecture</b>.</li>
     <li> Used <b>AWS S3</b> for Data Storage i.e images.</li>
     <li> Used <b>Express</b> and <b>Fastify</b> for making Routes in different Microservice. </li>
     </ul> 
     <p className={classes.content}>
     Project Structure Used For Backend :
     </p>
     <ul>
     <li> <b>Controller</b></li>
     <li> <b>Services</b></li>
     <li> <b>Routes</b></li>
     <li> <b>PreValidation</b></li>
     <li>  <b>Documentation</b></li>
     <li> <b>Config</b></li>
     </ul> 
     <p className={classes.content}>
     Feature In this Project :
     </p>
     <ul>
     <li> <b>One Time Veification On SignUp </b></li>
     <li> <b>Cart To Add Products</b></li>
     <li> <b>Email Sent After Successfull Payment and Welcome Email</b></li>
     <li> <b>Inventory Management</b></li>
     <li>  <b>Variant Property</b></li>
     <li> <b>Buy All Product Present in Cart</b></li>
     </ul> 
     <p className={classes.content}>
     Feature On process to be added :
     </p>
     <ul>
     <li> <b>Forgot Password </b></li>
     <li> <b>Dashboard</b></li>
     <li> <b>Update User Profile</b></li>
     <li> <b>Payement To Buy Directly a single product without goint into cart</b></li>
    
     </ul> 
     <p className={classes.content}>
     <span className={classes.disclaimer}>Disclaimer :</span> <br/>
     I have Not Copied the Code or Done Some Specific Course to Write the code. All the code is Written By Myself after Studing and analysing the structure of Ecommerce Site
     </p>
    </div>
    </Layout>
  );
  }
}




export default About
