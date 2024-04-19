import AppRouter from './AppRouter'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadCategory, loadItems, loadCurrent, updateUser,loadCart,setOrders } from './features/itemSlice'
function App() {
  const dispatch = useDispatch()
  const userId=useSelector((state)=>state.reducers.user_id)
  useEffect(() => {
    const getFood = async () => {
      await fetch('http://localhost:3000/home', { method: 'GET' })
        .then(async (result) => {
          const temp = await result.json()
          dispatch(loadItems(temp))
          dispatch(loadCurrent(temp))
        })
        .catch((error) => console.log(error))
      await fetch('http://localhost:3000/category', { METHOD: 'GET' }).then(
        async (result) => {
          const temp = await result.json()
          dispatch(loadCategory(temp))
        }
      )
      const token = localStorage.getItem('authToken') || null
      if (token)
      {
        const decoded = await fetch('http://localhost:3000/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token,
          }),
        })
        const result = await decoded.json()
        dispatch(updateUser(result.user.id))
        // console.log(result.user.id);
        const newCart = await fetch('http://localhost:3000/cart/load', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: result.user.id,
          }),
        })
        
        const res = await newCart.json()
        // console.log(res);
        if(res)
        {
          // console.log(res)
          dispatch(loadCart(res))
        }
        const Orders = await fetch('http://localhost:3000/orders/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: result.user.id,
          }),
        })
        const order = await Orders.json()
        dispatch(setOrders(order))
        // console.log(order);
      }
      // dispatch(setFlag())
    }
    getFood()
  }, [])
  useEffect(() => {
    const setCart = async() => {
      if (userId !== '') {
        const newCart = await fetch('http://localhost:3000/cart/load', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: userId,
          }),
        })
        
        const res = await newCart.json()
        // console.log(res);
        if(res)
        {
          // console.log(res)
          dispatch(loadCart(res))
        }
        const Orders = await fetch('http://localhost:3000/orders/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
          }),
        })
        const order = await Orders.json()
        dispatch(setOrders(order))
      }
    }
    setCart()
  },[userId])
  // const cart = useSelector((state) => state.reducers.cart)
  // useEffect(() => {
  //   const update = async () => {
  //     try {
  //       const token = localStorage.getItem('authToken') || null
  //       if(token)
  //       {
  //         const decoded = await fetch('http://localhost:3000/verify', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             token: token,
  //           }),
  //         })
  //         const result = await decoded.json()
          // console.log(result);
  //         const updated = await fetch('http://localhost:3000/cart', {
  //           method: 'PUT',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             id: result.user.id,
  //             cart: cart,
  //           }),
  //         })
  //       }
  //     }
  //     catch (error)
  //     {
  //       console.log(error);
  //     }
  //   }
  //   update()
  // }, [cart])
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
