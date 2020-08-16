import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter}from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,compose,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import signUpreducer from './Store/reducer/signupReducer'
import auth from './Store/reducer/auth'
import otp from './Store/reducer/otp'
import products from './Store/reducer/products'
import Product from './Store/reducer/Product'
import Inventory from './Store/reducer/inventory'
import Cart from './Store/reducer/Cart'
import payment from './Store/reducer/payment'
import profile from './Store/reducer/profile'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer= combineReducers({
  signUp:signUpreducer,
  login:auth,
  otp:otp,
  products:products,
  product:Product,
  inventory:Inventory,
  cart:Cart,
  payment:payment,
  profile:profile
})


const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
  <Provider store ={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
