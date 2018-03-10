/**
 * Created by qinzhen on 2018/3/7.
 * 写在index下的state是根state
 */
import {combineReducers} from 'redux'
import cart, * as fromCart from  './cart'
import products, * as fromProducts from './products'

export default combineReducers({
    cart,
    products
})

//这里把根state 变成了子state(state.cart)传入
const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
    getAddedIds(state)
        .reduce((total, id) =>
            total + getProduct(state, id).price * getQuantity(state, id),
            0
        )
        .toFixed(2)


export const getCartProducts = state =>
    getAddedIds(state).map(id => ({
        ...getProduct(state, id),
        quantity: getQuantity(state, id)
    }))