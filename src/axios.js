import axios from 'axios'

const product = axios.create({
    baseURL:"https://colossalproduct.herokuapp.com"
    // baseURL:"http://localhost:3010"
})
const customer = axios.create({
    // baseURL:"http://localhost:3011"
    baseURL:"https://colossalcustomer.herokuapp.com"
    })
    const cart = axios.create({
    // baseURL:"http://localhost:3001"
    baseURL:"https://colossalcart.herokuapp.com"
})
const auth = axios.create({
    baseURL:"https://colossalauth.herokuapp.com"
    // baseURL:"http://localhost:3005"
})
const notify = axios.create({
    // baseURL:"http://localhost:3007"
    baseURL:"https://colossalnotify-service.herokuapp.com"
})
const payment = axios.create({
    // baseURL:"http://localhost:3002"
    baseURL:"https://colossalpayment.herokuapp.com"
})




export default {
    product,
    customer,
    cart,
    payment,
    notify,
    auth
}