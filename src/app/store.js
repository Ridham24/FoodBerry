import { configureStore } from '@reduxjs/toolkit'
import reducers from '../features/itemSlice' 
export const store = configureStore({
    reducer:{reducers}
})