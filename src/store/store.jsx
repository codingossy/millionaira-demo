import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../store/userSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default store