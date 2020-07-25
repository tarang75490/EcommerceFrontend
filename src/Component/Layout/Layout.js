import React,{Component} from 'react'
import classes from './Layout.module.css'
import Toolbar from  '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import {connect} from 'react-redux'
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