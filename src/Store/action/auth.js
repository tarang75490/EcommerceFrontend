import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const authStart = () => {
    return {
        type:actionTypes.LOGIN_START
    }
};

export const authSuccess = (authData) =>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
        token:authData.token,
        customerId:authData.customerId
    }
}

export const authFail = (error,customerId) => {
    return{
        type:actionTypes.LOGIN_FAILED,
        error:error,
        customerId:customerId
    }
}

export const checkAuthTimeout = (expirationTime) =>{
        return dispatch =>{
            setTimeout(()=>{
                dispatch(logout())
                window.location.reload(false)
            },expirationTime*1000)
        }
}

export const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('customerId')
    localStorage.removeItem('userName')
    return{
        type:actionTypes.LOG_OUT
    }
}

export const startLoginProcess = (authData) =>{
    return dispatch => {
        dispatch(authStart());
        let url = "/loginWithPassword"
        console.log(authData)
        axios.auth.post(url,authData).then((response)=>{
            console.log(response)   
            if(response.data.status === 'failure'){
                dispatch(authFail(response.data.message))
                if (response.data.data.customerId){
                    localStorage.setItem("customerId",response.data.data.customerId)
                    dispatch(setAuthRedirectPath("/verify"))
                }
                
            }else if(response.data.status === 'success'){
            const expirationTime = new Date(new Date().getTime()+ 3600*1000)
            localStorage.setItem('token',response.data.data.token)
            localStorage.setItem('expirationTime',expirationTime)
            localStorage.setItem('customerId',response.data.data.customerId)
            localStorage.setItem("userName",response.data.data.userName)    
            dispatch(authSuccess(response.data.data))
            dispatch(setAuthRedirectPath("/dashboard"))
            dispatch(checkAuthTimeout(3600)) //response.data.expiresIn
            }else{
                dispatch(authFail("Network Error"))
            }
        })
        .catch((error)=>{
            console.log(error)
            dispatch(authFail("Network Error"))
        })
    }
}


export const setAuthRedirectPath = (path) =>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'))
            if (new Date() >expirationTime){
                dispatch(logout())
            }else{
            const    customerId = localStorage.getItem('customerId')
            dispatch(authSuccess({
                customerId:customerId,
                token:token
            }))
            dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000))
        }
    }
}
}

