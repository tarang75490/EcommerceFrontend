import React ,{Component} from 'react';
import Layout from '../../Component/Layout/Layout'
import { withRouter } from 'react-router-dom';
import classes from './products.module.css'
import {connect} from "react-redux";
import axios from '../../axios';
import * as actions from '../../Store/action/index'
import WithErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler'
import NavigationItem from '../../Component/Navigation/NavigationItems/NavigationItem/NavigationItem'
import Logo from '../../Component/UI/Logo/Logo';
import Button from '../../Component/UI/Button/button';
import utilityFunction from '../UtilityFunction/utilityFunction'
import CustomSpinner from '../../Component/UI/Spinner/Spinner';
import FlexibleFormBox from '../../Component/UI/FlexibleForm/FlexibleForm';
import ContentLoader from '../../Component/UI/ContentLoader/contentLoader'
import Modal from '../../Component/UI/Modal/Modal';
const queryString = require("query-string")


class Filter extends  Component{
    state={
        show : false,
        authorized:false,
        loadingFeatures:false,
        filterform:{},
        formisValid:false
    }
    shouldComponentUpdate(nextProps){
        if(this.props.match.params !== nextProps.match.params){
            window.location.reload(false)
        }
        return true
    }
    componentDidMount(){
        console.log(this.props.match.params)
        const querystring = queryString.stringify(this.props.match.params);
        this.setState({
            loadingFeatures:true
        })
        let features=null;
        axios.product.get('/getFeatures?'+querystring).then((response)=>{
            features = response.data.data
            console.log(features)
            let filterform = {}

            features.forEach((feature)=>{
                let options = [];
                options.push({
                    value:"",
                    displayValue:"Filter By "+feature.featureName.replace("_"," ")
                })
                feature.featureValues.forEach((value)=>{
                    options.push({
                        value:value,
                        displayValue:value
                    })
                })
                filterform[feature.featureName+"label"]={
                    elementType:"label",
                    label:feature.featureName.replace("_"," ")
                }

                filterform[feature.featureName]={
                    elementType:'dropdown',
                    config:{
                        type:'text',
                        placeholder:feature.featureName
                    },
                    options:options,
                    value:"",
                    validation:{
                        required:false
                    },
                    valid:false,
                    touched:false
                }
              
                
            })
            this.setState({
                loadingFeatures:false,
                filterform:filterform
            })  
            console.log(filterform)

        }).catch((e)=>{
            console.log(e)
            this.setState({
                loadingFeatures:false
            })    
        })
    }
    formSubmitHandler = () =>{
        let productFeatures = {}
        for(let feature in this.state.filterform){
            if(this.state.filterform[feature].elementType !== 'label'){
            if(this.state.filterform[feature].value !== ""){
                productFeatures[feature] = this.state.filterform[feature].value
            }
        }
        }
        console.log(productFeatures)
        let formData = {
            ...this.props.match.params,
            productFeatures:productFeatures
        }
        console.log(formData)
        this.props.getProducts(formData)
    }
    inputChangedHandler=(event,inputidentifier)=>{
        const change = utilityFunction.inputChangedHandler(event,inputidentifier,this.state.filterform)
        console.log(change)
        this.setState({
            filterform:change.form,
            formisvalid:change.formisvalid
        })
    }
    modalclosedHandler=()=>{
        this.setState({
            show:false
        })
    }
    modalOpenHandler = () => {
        this.setState({
            show:true
        })
    }
  render(){
    let filterContent =  null;
    let filterform = null;
    let button = null;
    if(this.state.loadingFeatures){
        filterContent=<ContentLoader content="filterform"/>
    }else{
        if(Object.keys(this.state.filterform).length >0){

            filterContent = <FlexibleFormBox    
                                form ={this.state.filterform}
                                inputChangedHandler={this.inputChangedHandler}
                                formSubmitHandler={this.formSubmitHandler}
                                breakpoint={1}
                                formisvalid={this.state.formisvalid}
                                loading={this.props.loadingFeatures}/>
            button = <Button clicked={this.formSubmitHandler} disabled={this.state.formisValid} width="50%" fontSize="1.2em" label={"Filter"}/>
        }else{
            filterContent =<span>Filter Not Found</span>
        }
    }
    if(window.innerWidth<=500){
        filterform= <div className={classes.filter}>
                    <span className={classes.headerButton} onClick={this.modalOpenHandler}><Logo logo="Filter"link={true} style={{width:"6%",marginRight:"8%"}}/>Apply Filter</span>
                     <Modal left={0} top={0} width="100%" show={this.state.show} modalclosed={this.modalclosedHandler}>
                    <span className={classes.header}>FILTERS</span><hr className={classes.line}/>
                    <div>
                {filterContent}
                    {button}
                    </div>
                    </Modal>
                    </div>
    }
    else{
        filterform = <div className={classes.filter}><span className={classes.header}>FILTERS</span><hr className={classes.line}/>
                        <div>
                    {filterContent}
                        {button}
                        </div>
                        </div>
    }
    console.log(window.innerWidth)

  return (
   filterform

  );
  }
}

const mapDispatchtoProps = dispatch => {
    return {
        getProducts:(req) => dispatch(actions.getProducts(req))
    }
}


export default  connect(null,mapDispatchtoProps)(withRouter(WithErrorHandler(Filter,axios.product)));