import { useSelector,useDispatch } from "react-redux"
import { Stack, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'
import {deleteItem} from '../features/itemSlice'
const Cart = () => {
  const cart = useSelector((state) => state.reducers.cart)
  const items = useSelector((state) => state.reducers.items)
  const user_id = useSelector((state) => state.reducers.user_id)
  const dispatch=useDispatch()
  // console.log(items);
  const handleRemove = async(id) => {
    dispatch(deleteItem(id))
    const temp = await fetch('http://localhost:3000/cart/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
                user_id:user_id,
                id: id
              }),
    })
    const res =await  temp.json()
    console.log(res)
  }
  return (
    <Stack>
      {
        cart?.map((item) => {
          // console.log(item.id);
          const curItem = items.filter((cur) => (
            // console.log(cur._id);
            cur._id == item.id
          ))
          console.log(curItem);
          return (
            <Card sx={{ mb: '15px', ml: '90px', mr: '90px' }}>
              <Stack direction={'row'}>
                <CardMedia
                  component="img"
                  image={curItem[0].img}
                  alt="Image"
                  sx={{ height: '130px', width: '250px', objectFit: 'fill' }}
                />
                <CardContent>
                  <Typography variant="h5">{curItem[0].name}</Typography>
                  <Typography variant="subtitle1">
                    {curItem[0].description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={()=>handleRemove(curItem[0]._id)}
                    sx={{ marginTop: '7px' }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Stack>
            </Card>
          )
        })
      }
      </Stack>
  )
}
export default Cart