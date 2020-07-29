import React,{Component} from 'react'
import  classes from './Variants.module.css'


class  Variants extends Component{
    state={
        variantId:null,
        price:null,
        active:0
    }
    componentDidMount(){
        this.setState({
            variantId:this.props.variants[0].variantId,
            price:this.props.variants[0].price,
            active:0
        })
        this.props.changed(0)
    }
    onclickHandler =(variantId,price,index)=>{
        this.setState({
            variantId:variantId,
            price:price,
            active:index
        })
        this.props.changed(index)
    }
    render(){
    console.log(this.props.variants)
    let colors =[], sizes=[];
    this.props.variants.forEach((variant,index)=>{
        let colorClasses = [classes.color]
        let sizeClasses = [classes.size]
        if(index === this.state.active){
            colorClasses.push(classes.active)
            sizeClasses.push(classes.active)
        }
        if(variant.color){
            let color = variant.color.toLowerCase()
            colors.push(<div className={classes.colorSpan}  onClick={()=>this.onclickHandler(variant.variantId,variant.price,index)}> <span className={colorClasses.join(" ")} style={{backgroundColor:color}}></span><span className={classes.colortitle}>{variant.color}</span></div>)
        }
        if(variant.size){
            sizes.push(<div className={classes.colorSpan} onClick={()=>this.onclickHandler(variant.variantId,variant.price,index)}> <span className={sizeClasses.join(" ")}>M</span></div>)
        }
    })

    return(<div className={classes.variant}>
        Deal Price:<div className={classes.price}> Rs. {this.state.price}</div>
        <div className={classes.colors}>{colors}</div>
        <div className={classes.colors}>{sizes}</div>
        </div>)
    
    }

}

 

export default Variants;

// { <p className="legend">{index}</p>}