import React from 'react'
import Modal from '../../Component/UI/Modal/Modal'
const withErrorHandler = (WrapperComponent,axios) =>{
    return class extends React.Component{
        state={
            error:null
        }
        
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({
                    error:null
                })
                return req; 
            })
            this.resInterceptors = axios.interceptors.response.use(res=> res,error=>{
                this.setState({ 
                    error:error
                })
            })
        }
        componentWillUnmount(){
            // console.log('Component Did UNmount',this.reqInterceptors,this.resInterceptors)
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorconfirmHandler=()=>{  
            this.setState({error:null}) 
        }
        render(){
        return (
            <React.Fragment>
                <Modal zindex={1000} show={this.state.error}  modalclosed={this.errorconfirmHandler}>
                <br/>Something Went wrong<br/>
                {this.state.error? this.state.error.message:null} 
            </Modal>
            <WrapperComponent {...this.props}/>  
            </React.Fragment>
        );
    }
}
}


export default withErrorHandler

