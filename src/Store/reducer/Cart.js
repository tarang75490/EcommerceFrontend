import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    product:null,
    loading:null,
    error:null,
    cartLoading:null,
    cartError:null,
    cartProducts:null,
}

const startAddingProduct = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const successAddingProduct = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        product:action.product
    })
}
const failedAddingProduct = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const startGettingProduct = (state,action) =>{
    return UpdateObject(state,{cartError:null,cartLoading:true})
}
const successGettingProduct = (state,action) =>{
    return UpdateObject(state,{
        cartError:null,
        cartLoading:false,
        cartProducts:action.product
    })
}
const failedGettingProduct = (state,action) =>{
    return UpdateObject(state,{cartError:action.error,cartLoading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.START_ADD_CART: return startAddingProduct(state,action)
        case actionType.SUCCESS_ADD_CART: return  successAddingProduct(state,action)
        case actionType.FAILED_ADD_CART: return failedAddingProduct(state,action)
        case actionType.START_GET_CART: return startGettingProduct(state,action)
        case actionType.SUCCESS_GET_CART: return  successGettingProduct(state,action)
        case actionType.FAILED_GET_CART: return failedGettingProduct(state,action)
        default:
            return state
    }
}


export default reducer
