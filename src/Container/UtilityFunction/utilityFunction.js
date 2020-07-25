import validator from 'validator'
const checkvalidity=(value,rules,inputidentifier)=>{
    let isValid= false;
    console.log("dasdsa")
    if(rules.required){
        isValid = value.trim() !== ''     
    }
    if (rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength){
        isValid = value.length <= rules.maxLength  && isValid

    }
    if (rules.email){
        isValid =  validator.isEmail(value)  && isValid

    }
    if (rules.mobile){
        isValid =  validator.isMobilePhone(value)  && isValid
        if(validator.isMobilePhone(value)){
            isValid = value.length === 10 && isValid
        }

    }
    if (inputidentifier === 'user'){
        isValid = (validator.isEmail(value)|| validator.isMobilePhone(value))  && isValid
    }
    return isValid  

}
const inputChangedHandler=(event,inputidentifier,signUpform)=>{
    let UpdatedsignUpform = {...signUpform}
    let updatedelement = {...UpdatedsignUpform[inputidentifier]}
    updatedelement.value = event.target.value
    updatedelement.valid =checkvalidity(updatedelement.value,UpdatedsignUpform[inputidentifier].validation,inputidentifier)
    updatedelement.touched=true
    console.log(updatedelement.value)
    UpdatedsignUpform[inputidentifier] = updatedelement
    let  formisvalid = true
    for(let inputidentity in UpdatedsignUpform){
        if(inputidentity !== "button"){
                formisvalid = UpdatedsignUpform[inputidentity].valid && formisvalid
                console.log(formisvalid)
        }
    }
    return {
        form:UpdatedsignUpform,
        formisvalid:formisvalid
    }
}

export default {
    checkvalidity,
    inputChangedHandler
}