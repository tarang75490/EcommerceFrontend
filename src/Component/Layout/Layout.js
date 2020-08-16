import React,{Component} from 'react'
import classes from './Layout.module.css'
import Toolbar from  '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logo from '../UI/Logo/Logo'
class Layout extends Component{

state={
    Sidedrawer:false 
}
SidedrawerClosedHandler=()=>{
    this.setState({
        Sidedrawer:false
    })
}
SidedrawertoggleHandler=()=>{
    this.setState((prevState,props)=>{
        return({
        Sidedrawer:!prevState.Sidedrawer
        })
    })
}

    render(){
        return(
            <React.Fragment>
                 <Toolbar  isAuth={this.props.isAuthenticated}drawtoggleclicked={this.SidedrawertoggleHandler}/>
                <Sidedrawer open={this.state.Sidedrawer} isAuth={this.props.isAuthenticated} closed={this.SidedrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            
            <center className={classes.pageFooter}>
            <Link to={"/about"} style={{cursor:"Pointer",color:"white"}}>About me</Link>
            Made BY Tarang 
            <center>
            <Logo style={{width:"3%"}} alink={"https://github.com/tarang75490" } logo={'Instagram'}/>
            <Logo style={{width:"2%"}} alink={"https://github.com/tarang75490" }logo={'Github'} />
            <Logo style={{width:"2%"}} alink={"https://www.linkedin.com/in/tarang-khetan-05356b179/" } logo={'Linkedin'}/>
            </center>
            </center>
    </React.Fragment>
        );
}
}


// const mapStatetoProps = (state) => {
//     return{
//         isAuthenticated:state.auth.token !== null
//     }
// }

export default (Layout);