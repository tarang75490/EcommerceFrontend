import React,{Component} from 'react'
import  './productRating.css'
class  ProductRating extends Component{


    render(){
        let stars = []
        if(this.props.rating){
            for(let i=1 ;i<=5 ;i++){
                if(i<=this.props.rating){
                    stars.push(<span class="fa fa-star checked"></span>)
                }else{
                    stars.push(<span class="fa fa-star"></span>)
                }
            }
        }


                return   <div >{stars}</div>
        }
    }

 

export default ProductRating;