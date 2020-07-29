import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const startGettingInventory = () => {
    return {
        type:actionTypes.START_INVENTORY
    }
};

export const successGettingInventory = (inventory) =>{
    return{
        type:actionTypes.SUCCESS_INVENTORY,
        inventory:inventory
    }
}

export const failedGettingInventory = (error) => {
    return{
        type:actionTypes.FAILED_INVENTORY,
        error:error
    }
}


export const getInventory = (variantIdArray) =>{
    return dispatch => {
        dispatch(startGettingInventory())
        console.log(variantIdArray)
        axios.product.post("/getInventory",{variantIds:variantIdArray}).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedGettingInventory(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successGettingInventory(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedGettingInventory(e))
        })
    }
}
