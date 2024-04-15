import { useSelector } from "react-redux"

const Cart = () => {
  const cart = useSelector((state) => state.reducers.cart)
  return (
    <>
      {
        cart.map((item) => <Items cartItem={item}/>)
      }
    </>
  )
}
export default Cart