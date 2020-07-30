
import React from 'react'
import classes from './AlertBox.css'

class AlertBox extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.show!==this.props.show || nextProps.children!==this.props.children){
            return true
        }
        return false
    }
    render(){
        return (
        <React.Fragment>
        <div class="alert" style={{
            transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            width:this.props.width,
            backgroundColor:this.props.color
        }}>
            <span class="closebtn" onClick={this.props.modalclosed} >&times;</span> 
            <strong>{this.props.header}!</strong>{this.props.content}
            </div>
        </React.Fragment>
    );
        }

}

export default AlertBox