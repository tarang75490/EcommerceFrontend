
import React from 'react'
import classes from './AlertBox.css'

class AlertBox extends React.Component{
  
    render(){
        return (
        <React.Fragment>
        <div class="alert">
            <span class="closebtn" >&times;</span> 
            <strong>Danger!</strong>{this.props.content}
            </div>
        </React.Fragment>
    );
        }

}

export default AlertBox