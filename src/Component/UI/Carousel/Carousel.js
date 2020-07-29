import React,{Component} from 'react'
import  './Carousel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class  Carouselcustom extends Component{


    render(){
        let productImages = []
        console.log()
        if(this.props.thumbnails){
            this.props.thumbnails.forEach((imageURL,index)=>{
                let image = "https://ecommerce12.s3.ap-south-1.amazonaws.com/"+this.props.thumbnails[index]
                productImages.push(
                    <div >
                    <img src={image}  />
                 
                </div>
                )
            })
        }


                return   <Carousel>
                {productImages}
            </Carousel>
        }
    }

 

export default Carouselcustom;

// { <p className="legend">{index}</p>}