/**
 * Created by qinzhen on 2018/3/8.
 * Mocking client-server processing
 */
import _products from './products.json'

const TIMEOUT = 100

export default {
    getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}