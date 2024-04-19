import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Cart from './Components/Cart'
import Order from './Components/Order'
import { useSelector } from 'react-redux'
const AppRouter = () => {
  const cart = useSelector((state) => state.reducers.cart)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/cart" element={<Cart cart={cart} flag={true} />} />
        <Route path="/orders" element={<Order/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default AppRouter
