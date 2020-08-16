import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const startDoingPayment = () => {
    return {
        type:actionTypes.PAYMENT_START
    }
};

export const successDoingPayment = (data) =>{
    return{
        type:actionTypes.PAYMENT_SUCCESS,
        response:data
    }
}

export const failedDoingPayment = (error) => {
    return{
        type:actionTypes.PAYMENT_FAILED ,
        error:error
    }
}


export const initializeAndMakePayment = () =>{
    return dispatch => {
        dispatch(startDoingPayment())
        axios.payment.get("/initialPayment?customerId="+localStorage.getItem("customerId")).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedDoingPayment(response.data.data)))
                
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                axios.payment.get("/makePayment?customerId="+localStorage.getItem("customerId")).then((response)=>{
                    console.log(response.data)
                    if(response.data.status === 'failure'){
                        dispatch((failedDoingPayment(response.data.data)))
                    }else if(response.data.status === 'success'){
                        let data = response.data.message
                        console.log(response)
                        dispatch((successDoingPayment(data)))
                    }
                }).catch((e)=>{
                    console.log(e)
                    dispatch(failedDoingPayment(e))
                })
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedDoingPayment(e))
        })
    }
}
