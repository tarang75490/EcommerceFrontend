import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    product:null,
    loading:null,
    error:null,
    cartLoading:null,
    cartError:null,
    cartProducts:null,
    removeLoading:null,
    removeError:null,
    removeData:null

}

const startAddingProduct = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const successAddingProduct = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        product:action.message
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
        cartProducts:action.products
    })
}
const failedGettingProduct = (state,action) =>{
    return UpdateObject(state,{cartError:action.error,cartLoading:false})
}

const startRemovingProduct = (state,action) =>{
    return UpdateObject(state,{removeError:null,removeLoading:true})
}
const successRemovingProduct = (state,action) =>{
    return UpdateObject(state,{
        removeError:null,
        removeLoading:false,
        removeData:action.product
    })
}
const failedRemovingProduct = (state,action) =>{
    return UpdateObject(state,{removeError:action.error,removeLoading:false})
}
    
const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.START_ADD_CART: return startAddingProduct(state,action)
        case actionType.SUCCESS_ADD_CART: return  successAddingProduct(state,action)
        case actionType.FAILED_ADD_CART: return failedAddingProduct(state,action)
        case actionType.START_GET_CART: return startGettingProduct(state,action)
        case actionType.SUCCESS_GET_CART: return  successGettingProduct(state,action)
        case actionType.FAILED_GET_CART: return failedGettingProduct(state,action)
        case actionType.START_REMOVE_CART: return startRemovingProduct(state,action)
        case actionType.SUCCESS_REMOVE_CART: return  successRemovingProduct(state,action)
        case actionType.FAILED_REMOVE_CART: return failedRemovingProduct(state,action)
        
        default:
            return state
    }
}


export default reducer
