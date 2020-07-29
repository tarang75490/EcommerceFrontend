import * as actionType from '../action/actionTypes'
import UpdateObject from '../Utilities'




const initailState={
    inventory:null,
    loading:null,
    error:null,
}

const startGettingInventory = (state,action) =>{
    return UpdateObject(state,{error:null,loading:true})
}
const successGettingInventory = (state,action) =>{
    return UpdateObject(state,{
        error:null,
        loading:false,
        inventory:action.inventory
    })
}
const failedGettingInventory = (state,action) =>{
    return UpdateObject(state,{error:action.error,loading:false})
}

const reducer =(state=initailState,action) => {
    switch (action.type){
        case actionType.START_INVENTORY: return startGettingInventory(state,action)
        case actionType.SUCCESS_INVENTORY: return  successGettingInventory(state,action)
        case actionType.FAILED_INVENTORY: return failedGettingInventory(state,action)
        default:
            return state
    }
}


export default reducer
