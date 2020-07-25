import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const otpStart = () => {
    return {
        type:actionTypes.OTP_START
    }
};

export const otpSuccess = (message) =>{
    return{
        type:actionTypes.OTP_SUCCESS,
        message:message
    }
}

export const otpFail = (error) => {
    return{
        type:actionTypes.OTP_FAILED,
        error:error
    }
}


export const sendingOTP = () =>{
    return dispatch => {
        dispatch(otpStart())
        let customerId = localStorage.getItem("customerId")
        axios.notify.post("/sentOTPbyEmail",{customerId:customerId}).then((response)=>{
            console.log(response)  
            if(response.data.status === 'failure'){
                dispatch((otpFail(response.data.data)))
            }else if(response.data.status === 'success'){
                    dispatch((otpSuccess(response.data.data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(otpFail(e))
        })
    }
}

export const verifyOTP = (otp) => {
    return dispatch => {
        dispatch(otpStart())
        let customerId = localStorage.getItem("customerId")
        let formData = {
            customerId:customerId,
            otp:otp
        }   
        axios.auth.post("/verifyOTP",formData).then((response)=>{
            console.log(response)  
            if(response.data.status === 'failure'){
                dispatch((otpFail(response.data.message)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                const expirationTime = new Date(new Date().getTime()+ 3600*1000)
                localStorage.setItem("token",data.token)
                localStorage.setItem("userName",data.userName)
                localStorage.setItem('expirationTime',expirationTime)
                localStorage.setItem('customerId',data.customerId)
                dispatch((otpSuccess(response.data.data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(otpFail(e))
        })
    }
}