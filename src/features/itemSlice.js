import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: [],
    items: [],
    currentItems:[],
    categories: [],
    user_id: "",
    curCartItem:{},
    curModes: "",
    flag:0
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
            state.cart.map((item) => {
                if (item.id == action.payload.id && item.mode == action.payload.mode)
                {
                    item.quantity = item.quantity + action.payload.quantity
                    state.flag=1
                    }
            })
            if(state.flag==0)
                state.cart.push(action.payload)
            state.flag=0
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
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id || item.mode!==action.payload.modes)
        },
        curCart: (state, action) => {
            state.curCartItem=action.payload
        },
        curMode: (state, action) => {
            state.curModes=action.payload
        }
    },
})
export const {addItem,loadItems,loadCategory,loadCurrent,resetCart,loadCart,updateUser,deleteItem,curCart,curMode}=itemSlice.actions
export default itemSlice.reducer

