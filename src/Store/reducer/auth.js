import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    customerId:null,
    loading:null,
    token:null,
    error:null,
    authRedirectPath:null
}
const setAuthRedirectPath = (state,action) => {
    return UpdateObject(state,{authRedirectPath:action.path})
}
const authStart = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const authSuccess = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        token:action.token,
        customerId:action.customerId})
}
const authFail = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false,customerId:action.customerId})
}
const authlogout = (state,action) => {
    return UpdateObject(state,{userId:null,token:null})
}
const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.LOGIN_START: return authStart(state,action)
        case actionType.LOGIN_SUCCESS : return  authSuccess(state,action)
        case actionType.LOGIN_FAILED: return authFail(state,action)
        // case actionType.LOGIN_LOGOUT: return authlogout(state,action)
        case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action)
        default:
            return state
    }
}


export default reducer
