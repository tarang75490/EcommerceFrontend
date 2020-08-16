import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const startGettingProfile = () => {
    return {
        type:actionTypes.START_FETCHING_PROFILE
    }
};

export const successGettingProfile = (profile) =>{
    return{
        type:actionTypes.SUCCESS_FETCHING_PROFILE,
        profile:profile
    }
}

export const failedGettingProfile = (error) => {
    return{
        type:actionTypes.FAILED_FETCHING_PROFILE,
        error:error
    }
}

export const startGettingProfileHistory = () => {
    return {
        type:actionTypes.START_FETCHING_PROFILE_HISTORY
    }
};

export const successGettingProfileHistory = (profileHistory) =>{
    return{
        type:actionTypes.SUCCESS_FETCHING_PROFILE_HISTORY,
        profileHistory:profileHistory
    }
}

export const failedGettingProfileHistory = (error) => {
    return{
        type:actionTypes.FAILED_FETCHING_PROFILE_HISTORY,
        error:error
    }
}


export const getProfile = () =>{
    return dispatch => {
        dispatch(startGettingProfile())
        axios.customer.get("/getProfile?customerId="+localStorage.getItem("customerId")).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedGettingProfile(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successGettingProfile(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedGettingProfile(e))
        })
    }
}

export const getProfileHistory = () =>{
    return dispatch => {
        dispatch(startGettingProfileHistory())
        axios.customer.get("/getCustomerHistory?customerId="+localStorage.getItem("customerId")).then((response)=>{
            console.log(response.data)
            if(response.data.status === 'failure'){
                dispatch((failedGettingProfileHistory(response.data.data)))
            }else if(response.data.status === 'success'){
                let data = response.data.data
                console.log(data)
                dispatch((successGettingProfileHistory(data)))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(failedGettingProfileHistory(e))
        })
    }
}

