import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './slices/user.js'
import { todoReducer } from './slices/todo.js'
import { adminReducer } from './slices/admin.js'
import { transactionReducer } from './slices/transaction.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        todo: todoReducer,
        admin: adminReducer,
        transaction: transactionReducer
    }
})

export default store