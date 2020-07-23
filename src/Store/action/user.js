import * as actionTypes from './actionTypes'
import axios from '../../axios'


export const fetch_user_start = () =>{
    return{
        type:actionTypes.FETCH_USERS_START,
        loading:true
    }
}



export const fetch_user_failed = (error) =>{
    return{
        type:actionTypes.FETCH_USERS_FAILED,
        error:error
    }
}




export const fetch_user_success = (data) =>{

    return{
        type:actionTypes.FETCH_USERS_SUCCESS,
        users:data
    }
}



export const fetching_users = (filter,page) => {
    return dispatch => {
        dispatch(fetch_user_start())
        axios.post('/getAllUser?requestId=random').then((response)=>{
            dispatch(fetch_user_success(response.data)) 
        })
        .catch((error)=>{
            console.log(error)
            dispatch(fetch_user_failed(error))
        })
    }
}
export const save_user_start = () =>{
    return{
        type:actionTypes.SAVE_USERS_START,
        loading:true
    }
}



export const save_user_failed = (mode,error) =>{
    return{
        type:actionTypes.SAVE_USERS_FAILED,
        error:error,
        message:`Unable to ${mode} User \nError : ${error}`
    }
}




export const save_user_success = (mode) =>{
    return{
        type:actionTypes.SAVE_USERS_SUCCESS,
        message:"User "+mode+"d Successfully"
    }
}


export const saving_users = (formdata,mode,userId) => {
    return dispatch => {
        dispatch(save_user_start())
        let url = '/addUserInCMI'
        console.log(mode)
        if(mode === 'Update'){
                url= '/updateUserInCMI'
            }
        console.log(formdata)
        axios.post(url,formdata).then((response)=>{
            console.log(response)
            if(response.data.success){
            dispatch(save_user_success(mode)) 
            }else{
                dispatch(save_user_failed(mode,response.data.message))
            }

        })
        .catch((error)=>{
            console.log(error)
            dispatch(save_user_failed(mode,error))
            
        })
    }
}

export const deleting_user = (userId) => {
    return dispatch => {
        dispatch(save_user_start())
        let url = '/deleteUserInSystem?userId='+userId
        let mode = "delete"
        axios.delete(url).then((response)=>{
            console.log(response)
            if(response){
            dispatch(save_user_success(mode)) 

            }else{
                dispatch(save_user_failed(mode,"Not Found"))
            }
            window.location.reload(false)
        })
        .catch((error)=>{
            dispatch(save_user_failed(mode,error))
            console.log(error)
            
        })
    }
}