import axios from 'axios'

const product = axios.create({
    baseURL:"http://localhost:3001"
})
const customer = axios.create({
    baseURL:"http://localhost:3001"
})
const cart = axios.create({
    baseURL:"http://localhost:3001"
})
const auth = axios.create({
    baseURL:"http://localhost:3001"
})
const notify = axios.create({
    baseURL:"http://localhost:3001"
})
const payment = axios.create({
    baseURL:"http://localhost:3001"
})


export default {
    product,
    customer,
    cart,
    payment,
    notify,
    auth
}