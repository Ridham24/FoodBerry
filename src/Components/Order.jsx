import { Typography,Button } from "@mui/material"
import { useSelector } from "react-redux"
import Cart from './Cart'
const Order = () => {
    const orders = useSelector((state) => state.reducers.Orders)
    if (orders.length == 0)
        return <p>No previous orders...</p>
  return (
      <div style={{marginTop:'5px'}}>
          {
              orders.map((order) => {
                  return (
                    <div>
                      <div>
                        <Button variant="contained" disabled sx={{mb:'5px',left:'40%'}}>
                          <p style={{color:'#000'}}>{order.date}</p>
                        </Button>
                      </div>
                      <Cart cart={order.Order} flag={false} />
                    </div>
                  )
              })
          }
    </div>
  )
}
export default Order