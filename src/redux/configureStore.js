import { createStore } from 'redux'
import cardActionManagerReducer from './reducers/CartManagerReducer'

// export const Store = createStore(cardActionManagerReducer)

export default createStore(cardActionManagerReducer)