import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    products:null,
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
        products:action.products
    })
}
const failedGettingProducts = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.START_PRODUCTS: return startGettingProducts(state,action)
        case actionType.SUCCESS_PRODUCTS: return  successGettingProducts(state,action)
        case actionType.FAILED_PRODUCTS: return failedGettingProducts(state,action)
        default:
            return state
    }
}


export default reducer
