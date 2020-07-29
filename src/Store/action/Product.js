import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const startGettingProduct = () => {
    return {
        type:actionTypes.START_PRODUCT
    }
};

export const successGettingProduct = (product) =>{
    return{
        type:actionTypes.SUCCESS_PRODUCT,
        product:product
    }
}

export const failedGettingProduct = (error) => {
    return{
        type:actionTypes.FAILED_PRODUCT,
        error:error
    }
}


export const getProductWithVariants = (productId) =>{
    return dispatch => {
        dispatch(startGettingProduct())
        console.log(productId)
        axios.product.get("/getVariants?productId="+productId).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedGettingProduct(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successGettingProduct(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedGettingProduct(e))
        })
    }
}
