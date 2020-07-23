const UpdateObject = (state,nextState) =>{
    return {
        ... state,
        ... nextState
    }
}

export default UpdateObject