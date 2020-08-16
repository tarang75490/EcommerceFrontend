import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    response:null,
    loading:null,
    error:null,
}

const startGettingProducts = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const successGettingProducts = (state,action) =>{
    return UpdateObject(state,{
        error:null, 
        loading:false,
        response:action.response
    })
}
const failedGettingProducts = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.PAYMENT_START: return startGettingProducts(state,action)
        case actionType.PAYMENT_SUCCESS: return  successGettingProducts(state,action)
        case actionType.PAYMENT_FAILED: return failedGettingProducts(state,action)
        default:
            return state
    }
}


export default reducer
