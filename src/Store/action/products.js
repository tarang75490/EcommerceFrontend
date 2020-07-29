import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const startGettingProducts = () => {
    return {
        type:actionTypes.START_PRODUCTS
    }
};

export const successGettingProducts = (products) =>{
    return{
        type:actionTypes.SUCCESS_PRODUCTS,
        products:products
    }
}

export const failedGettingProducts = (error) => {
    return{
        type:actionTypes.FAILED_PRODUCTS,
        error:error
    }
}


export const getProducts = (formData) =>{
    return dispatch => {
        dispatch(startGettingProducts())
        axios.product.post("/filterBrowse",formData).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedGettingProducts(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successGettingProducts(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedGettingProducts(e))
        })
    }
}

