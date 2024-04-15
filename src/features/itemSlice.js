import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: [],
    items: [],
    currentItems:[],
    categories: [],
    user_id:""
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
        },
        resetCart: (state, action) => {
            state.cart=[]
        },
        loadCart: (state, action) => {
            state.cart=action.payload
        },
        updateUser: (state, action) => {
            state.user_id=action.payload
        }
    },
})
export const {addItem,loadItems,loadCategory,loadCurrent,resetCart,loadCart,updateUser}=itemSlice.actions
export default itemSlice.reducer

