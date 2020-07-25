import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    message:null,
    loading:null,
    error:null,
}

const otpStart = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const otpSuccess = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        message:action.message
    })
}
const otpFail = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.OTP_START: return otpStart(state,action)
        case actionType.OTP_SUCCESS : return  otpSuccess(state,action)
        case actionType.OTP_FAILED: return otpFail(state,action)
        default:
            return state
    }
}


export default reducer
