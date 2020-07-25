import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const signUpStart = () => {
    return {
        type:actionTypes.SIGN_UP_START
    }
};

export const signUpSuccess = (customerId) =>{
    return{
        type:actionTypes.SIGN_UP_SUCCESS,
        customerId:customerId
    }
}

export const signUpFail = (error) => {
    return{
        type:actionTypes.SIGN_UP_FAILED,
        error:error
    }
}


export const signingUp = (formData) =>{
    return dispatch => {
        dispatch(signUpStart())

        axios.customer.post("/signUp",formData).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((signUpFail(response.data.data)))
            }else if(response.data.status === 'success'){
                    let customerId = response.data.data.customerId
                    localStorage.setItem("customerId",customerId)
                    dispatch((signUpSuccess(customerId)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(signUpFail(e))
        })
    }
}

