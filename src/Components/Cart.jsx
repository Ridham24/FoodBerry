import { useSelector, useDispatch } from 'react-redux'
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Modal,
  Paper,
  Input,
} from '@mui/material'
import { deleteItem } from '../features/itemSlice'
import { AddCircle } from '@mui/icons-material'
import { RemoveCircle } from '@mui/icons-material'
import { useState } from 'react'
const Cart = () => {
  const cart = useSelector((state) => state.reducers.cart)
  const items = useSelector((state) => state.reducers.items)
  const user_id = useSelector((state) => state.reducers.user_id)
  const [quantity,setQuantity]=useState(0)
  const [open, setOpen] = useState(false)
  const [Mode,setMode]=useState("")
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setQuantity(0)
    setMode("")
  }
  const dispatch = useDispatch()
  // console.log(items);
  const handleRemove = async (id,modes) => {
    dispatch(deleteItem({id,modes}))
    const temp = await fetch('http://localhost:3000/cart/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user_id,
        id: id,
        modes:modes
      }),
    })
    const res = await temp.json()
    console.log(res)
  }
  if (cart.length == 0) return <Typography>Cart is empty!!</Typography>
  return (
    <Stack>
      {cart?.map((item) => {
        // console.log(item.id);
        const curItem = items.filter(
          (cur) =>
            // console.log(cur._id);
            cur._id == item.id
        )
        console.log(curItem)
        const option = curItem[0]?.options[0][0]
        var mode = ''
        Object.keys(option).map((key) => {
          if (option[key] == item.mode) {
            mode = key
          }
        })
        console.log(mode)
        console.log(option)
        return (
          <>
            <Card sx={{ mb: '15px', ml: '90px', mr: '90px' }}>
              <Stack direction={'row'}>
                <CardMedia
                  component="img"
                  image={curItem[0].img}
                  alt="Image"
                  sx={{ width: '250px', objectFit: 'fill' }}
                />
                <CardContent>
                  <Typography variant="h5">{curItem[0].name}</Typography>
                  <Typography variant="subtitle1">
                    {curItem[0].description}
                  </Typography>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                    {/* <IconButton
                      onClick={() => {
                        {
                        }
                      }}
                    >
                      <RemoveCircle sx={{ fontSize: '18px' }} />
                    </IconButton> */}
                    <Typography variant="subtitle1">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ ml: '10px' }}>
                      Mode: {mode.toUpperCase()}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ ml: '10px' }}>
                      Total Price: ₹{item.quantity * item.mode}
                    </Typography>
                    {/* <IconButton onClick={() => {}}>
                      <AddCircle sx={{ fontSize: '20px' }} />
                    </IconButton> */}
                  </Stack>
                  <Button variant="contained" onClick={handleOpen}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemove(curItem[0]._id,item.mode)}
                    sx={{ ml: '8px' }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Stack>
            </Card>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {curItem[0].name}
                </Typography>
                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                  <Paper component="form">
                    <Typography variant="h6">Quantity</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        onClick={() => {
                          if (quantity > 0) setQuantity(quantity - 1)
                        }}
                      >
                        <RemoveCircle sx={{ fontSize: '18px' }} />
                      </IconButton>
                      <Typography variant="subtitle1">{quantity}</Typography>
                      <IconButton onClick={() => setQuantity(quantity + 1)}>
                        <AddCircle sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </div>
                    <Typography variant="h6">Mode</Typography>
                    <div>
                      <select>
                        <option value={0}>None</option>
                        {Object.keys(option).map((key) => (
                          <option key={key} value={option[key]}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Paper>
                </Box>
              </Box>
            </Modal>
          </>
        )
      })}
    </Stack>
  )
}
export default Cart
