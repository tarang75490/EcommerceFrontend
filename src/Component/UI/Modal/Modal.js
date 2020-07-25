import React from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.show!==this.props.show || nextProps.children!==this.props.children){
            return true
        }
        return false
    }
    render(){return (
        <React.Fragment>
            <Backdrop show={this.props.show} clicked={this.props.modalclosed}/>
            <div 
            className={classes.Modal}
            style={{
                transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0',
                width:this.props.width,
                left:this.props.left,
                zIndex:this.props.zindex,
                top:this.props.top
            }}>

            <span onClick={this.props.modalclosed} style={{marginLeft:"95%",color:"Red",cursor:"pointer"}}>&#10006;</span>
            <br/>
            {this.props.children}
        </div>
        </React.Fragment>
    );
        }

}

export default Modal