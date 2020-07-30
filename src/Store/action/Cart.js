import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const startAddingCart = () => {
    return {
        type:actionTypes.START_ADD_CART
    }
};

export const successAddingCart = (message) =>{
    return{
        type:actionTypes.SUCCESS_ADD_CART,
        message:message
    }
}

export const failedAddingCart = (error) => {
    return{
        type:actionTypes.FAILED_ADD_CART,
        error:error
    }
}


export const addProductsToCart = (formData) =>{
    return dispatch => {
        dispatch(startAddingCart())
        console.log(formData,123)
        axios.cart.post("/addProductsToCart",formData).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedAddingCart(response.data.message)))
            }else if(response.data.status === 'success'){
                let data = response.data.message
                console.log(data)
                dispatch((successAddingCart(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedAddingCart(e))
        })
    }
}
export const startRemovingCart = () => {
    return {
        type:actionTypes.START_REMOVE_CART
    }
};

export const successRemovingCart = (data) =>{
    return{
        type:actionTypes.SUCCESS_REMOVE_CART,
        product:data
    }
}

export const failedRemovingCart = (error) => {
    return{
        type:actionTypes.FAILED_REMOVE_CART,
        error:error
    }
}


export const removeFromCart = (formData) =>{
    return dispatch => {
        dispatch(startRemovingCart())
        console.log(formData)
        axios.cart.post("/removeProductFromCart",formData).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedRemovingCart(response.data.message)))
            }else if(response.data.status === 'success'){
                let data = response.data.message
                console.log(data)
                dispatch((successRemovingCart(data)))
                setTimeout(()=>{
                    window.location.reload(false)
                },1000)
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedRemovingCart(e))
        })
    }
}



export const emptyCart = (formData) =>{
    return dispatch => {
        dispatch(startRemovingCart())
        axios.cart.post("/emptyProductsFromCart?customerId="+localStorage.getItem("customerId")).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedRemovingCart(response.data.message)))
            }else if(response.data.status === 'success'){
                let data = response.data.message
                console.log(data)
                dispatch((successRemovingCart(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedRemovingCart(e))
        })
    }
}
export const startGettingCart = () => {
    return {
        type:actionTypes.START_GET_CART
    }
};

export const successGettingCart = (products) =>{
    return{
        type:actionTypes.SUCCESS_GET_CART,
        products:products
    }
}

export const failedGettingCart = (error) => {
    return{
        type:actionTypes.FAILED_GET_CART,
        error:error
    }
}



export const getProductsOfCart = () =>{
    return dispatch => {
        dispatch(startGettingCart())
        axios.cart.get("/getProductsOfCart?customerId="+localStorage.getItem("customerId")).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedGettingCart(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successGettingCart(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedGettingCart(e))
        })
    }
}
export const startUpdatingCart = () => {
    return {
        type:actionTypes.START_UPDATE_CART
    }
};

export const successUpdatingCart = (products) =>{
    return{
        type:actionTypes.SUCCESS_UPDATE_CART,
        products:products
    }
}

export const failedUpdatingCart = (error) => {
    return{
        type:actionTypes.FAILED_UPDATE_CART,
        error:error
    }
}



export const updateQuantityToBuy = (formData) =>{
    return dispatch => {
        dispatch(startUpdatingCart())
        axios.cart.post("/addProductsToCart",formData).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedUpdatingCart(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successUpdatingCart(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedUpdatingCart(e))
        })
    }
}

