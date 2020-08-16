import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    profile:null,
    loading:null,
    error:null,
    profileHistory:null,
    loadingH:null,
    errorH:null

}

const startGettingProfile = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const successGettingProfile = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        profile:action.profile
    })
}
const failedGettingProfile = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}


const startGettingProfileHistory = (state,action) =>{
    return UpdateObject(state,{errorH:null,loadingH:true})
}
const successGettingProfileHistory = (state,action) =>{
    return UpdateObject(state,{
        errorH:null,
        loadingH:false,
        profileHistory:action.profileHistory
    })
}
const failedGettingProfileHistory = (state,action) =>{
    return UpdateObject(state,{errorH:action.error,loadingH:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.START_FETCHING_PROFILE: return startGettingProfile(state,action)
        case actionType.SUCCESS_FETCHING_PROFILE: return  successGettingProfile(state,action)
        case actionType.FAILED_FETCHING_PROFILE: return failedGettingProfile(state,action)
        case actionType.START_FETCHING_PROFILE_HISTORY: return startGettingProfileHistory(state,action)
        case actionType.SUCCESS_FETCHING_PROFILE_HISTORY: return  successGettingProfileHistory(state,action)
        case actionType.FAILED_FETCHING_PROFILE_HISTORY: return failedGettingProfileHistory(state,action)
        default:
            return state
    }
}


export default reducer
