import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    product:null,
    loading:null,
    error:null,
}

const startGettingProduct = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const successGettingProduct = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        product:action.product
    })
}
const failedGettingProduct = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.START_PRODUCT: return startGettingProduct(state,action)
        case actionType.SUCCESS_PRODUCT: return  successGettingProduct(state,action)
        case actionType.FAILED_PRODUCT: return failedGettingProduct(state,action)
        default:
            return state
    }
}


export default reducer
