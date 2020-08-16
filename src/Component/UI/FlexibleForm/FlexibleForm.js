    import React,{Component} from 'react'
import classes from './FlexibleForm.module.css'
import Spinner from '../Spinner/Spinner';
import { Form ,Col,Row,Button } from 'react-bootstrap';
class FlexibleFormBox extends Component{


    render(){
        let input;
        let form = [];
        let row = [];
        let keys = Object.keys(this.props.form)
        if (keys){
        for(const formElement of keys){
                switch(this.props.form[formElement].elementType){
                    case "text":
                        input =
                        <input className={classes.input}{...this.props.form[formElement].config} onChange={(e)=>this.props.inputChangedHandler(e,formElement)} />
                    break;
                    case "dropdown":
                        input = 
                        <Row>
                        <Col sm={10}>
                        <Form.Control as="select"  disabled={this.props.form[formElement].disable} {...this.props.form[formElement].config} onChange={(e)=>this.props.inputChangedHandler(e,formElement)}>
                        {this.props.form[formElement].options.map((item,index)=>{
                                return <option key={index} value={item.value}>{item.displayValue}</option>
                            })}
                              </Form.Control>
                              </Col>
                              </Row>
                     
                    break;
                    case "number":

                        const valid= !this.props.form[formElement].valid && this.props.form[formElement].touched && this.props.form[formElement].value 
                        input = <span>
                        <input  className={classes.input} {...this.props.form[formElement].config} onChange={(e)=>this.props.inputChangedHandler(e,formElement)}/><br/>
                        {valid ? <span className={classes.message}>** <strong>Please check </strong>Invalid Input</span>:null}
                        </span>
                        break;
                    case "modal":
                        input = <span onClick={()=>this.props.modalHandler(this.props.form[formElement].config.value)}>
                                        <a style={{cursor:"pointer"}}>Open the Pop Up</a>
                                </span>
                        break;
                    case "label":
                        input = <span className={classes.label}>{this.props.form[formElement].label}</span>
                        break;
                    case "button" :
                        let cursor = this.props.formisvalid ? "pointer":"not-allowed";
                        console.log(this.props.loading)
                        input = <span>
                        {this.props.loading ? <Spinner/> : <button  className={classes.button}
                                                                    style={{cursor:cursor}}
                                                                    onClick={(e)=>this.props.formSubmitHandler(e)}
                                                                     disabled={!this.props.formisvalid} >
                                                                            {this.props.form[formElement].label ?this.props.form[formElement].label :"save" }
                                                                            </button>}   
                        </span>
                        break;

                }
                row.push(input);
                if(row.length == this.props.breakpoint){
                    form.push(<div>{row}</div>)
                    form.push(<br/>)
                    row = []
                }
            }
            // form.push(<Row>{row}</Row>)
        }

        return(
            // <Styleddiv>
               <form className={classes.form}>{form}</form>
              

            // </Styleddiv>
            
        )
            
        }
    }

 

export default FlexibleFormBox;