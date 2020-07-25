import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    customerId:null,
    loading:null,
    error:null,
}

const signUpStart = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const signUpSuccess = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        customerId:action.customerId})
}
const signUpFail = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.SIGN_UP_START: return signUpStart(state,action)
        case actionType.SIGN_UP_SUCCESS : return  signUpSuccess(state,action)
        case actionType.SIGN_UP_FAILED: return signUpFail(state,action)
        default:
            return state
    }
}


export default reducer
