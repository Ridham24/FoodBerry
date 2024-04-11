import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: [],
    items: [],
    currentItems:[],
    categories:[]
}

const itemSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {
        loadItems: (state, action) => {
          state.items =action.payload 
        },
        loadCurrent: (state, action)=>{
            state.currentItems=action.payload
        },
        addItem: (state, action) => {
            state.cart.push(action.payload)
        },
        loadCategory: (state, action) => {
            state.categories=action.payload
        }
    },
})
export const {addItem,loadItems,loadCategory,loadCurrent}=itemSlice.actions
export default itemSlice.reducer

