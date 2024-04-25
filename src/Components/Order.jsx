import { Typography,Button, Box } from "@mui/material"
import { useSelector } from "react-redux"
import Cart from './Cart'
const Order = () => {
    const orders = useSelector((state) => state.reducers.Orders)
    if (orders.length == 0)
        return <p>No previous orders...</p>
  return (
    <Box sx={{
      mt: {
        md:'65px',xs:'103px'
      }}}>
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
    </Box>
  )
}
export default Order