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
  Snackbar
} from '@mui/material'
import { deleteItem,curCart,curMode,addItem } from '../features/itemSlice'
import { AddCircle } from '@mui/icons-material'
import { RemoveCircle } from '@mui/icons-material'
import { useState } from 'react'
const Cart = () => {
  const cart = useSelector((state) => state.reducers.cart)
  const items = useSelector((state) => state.reducers.items)
  const user_id = useSelector((state) => state.reducers.user_id)
  const modal = useSelector((state) => state.reducers.curCartItem)
  const curModes=useSelector((state) => state.reducers.curModes)
  const [quantity,setQuantity]=useState(1)
  const [open, setOpen] = useState(false)
  const [Mode, setMode] = useState(0)
  const [toast, setToast] = useState(false)
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
    // console.log(res)
  }
  const handleEdit =async ({ quantity, Mode, modal,curModes }) => {
    console.log(quantity, Mode, modal, curModes) 
    if (Mode == 0) {
      setToast(true)
    } else {
    const id=modal._id
    dispatch(deleteItem({id,curModes}))
    const temp = await fetch('http://localhost:3000/cart/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user_id,
        id: id,
        modes:curModes
      }),
    })
    const res = await temp.json()
        const temp1 =
          cart?.find((items) => items.id == id && items.mode == Mode) ||
          false
        if (temp1) setToast(true)
        else {
          dispatch(
            addItem({
              id: id,
              quantity: quantity,
              mode: Mode,
            })
          )
          const temp = await fetch('http://localhost:3000/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user_id,
              cart: {
                id: id,
                quantity: quantity,
                mode: Mode,
              },
            }),
          })
        }
      } 
    }
    
  
  if (cart.length == 0) return <Typography>Cart is empty!!</Typography>
  return (
    <Stack>
      <Snackbar
        open={toast}
        autoHideDuration={5000}
        onClose={() => setToast(false)}
        message="Please select the type!"
      />
      {cart?.map((item) => {
        // console.log(item.id);
        const curItem = items.filter(
          (cur) =>
            // console.log(cur._id);
            cur._id == item.id
        )
        // console.log(curItem)
        const option = curItem[0]?.options[0][0]
        var mode = ''
        Object.keys(option).map((key) => {
          if (option[key] == item.mode) {
            mode = key
          }
        })
        // console.log(mode)
        // console.log(option)
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

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleRemove(curItem[0]._id, item.mode)
                      console.log(curItem)
                    }}
                    sx={{ ml: '8px' }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleOpen(true)
                      dispatch(curCart(curItem[0]))
                      dispatch(curMode(item.mode))
                      // console.log(curItem)
                    }}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Stack>
            </Card>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  width: 500,
                  boxShadow: 24,
                  p: 2,
                }}
              >
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    image={modal?.img}
                    alt="Image"
                    sx={{ objectFit: 'fill', width: '190px' }}
                  />
                  <CardContent sx={{ alignItems: 'center' }}>
                    <Typography variant="h5">{modal?.name}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1">Quantity: </Typography>
                      <IconButton
                        onClick={() => {
                          if (quantity > 1) setQuantity(quantity - 1)
                        }}
                      >
                        <RemoveCircle sx={{ fontSize: '18px' }} />
                      </IconButton>
                      <Typography variant="subtitle1">{quantity}</Typography>
                      <IconButton onClick={() => setQuantity(quantity + 1)}>
                        <AddCircle sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '4px' }}>
                      <Typography variant="subtitle1">Mode:</Typography>
                      <select
                        style={{ marginLeft: '5px' }}
                        onChange={(e) => {
                          setMode(e.target.value)
                        }}
                      >
                        <option value={0}>None</option>
                        {modal &&
                          modal.options &&
                          modal.options[0] &&
                          modal.options[0][0] &&
                          Object.keys(modal.options[0][0]).map((key) => (
                            <option key={key} value={modal.options[0][0][key]}>
                              {key}
                            </option>
                          ))}
                      </select>
                    </div>

                    <hr></hr>
                    <Button
                      variant="contained"
                      sx={{ mt: '5px' }}
                      onClick={() => {
                        handleEdit({ quantity, Mode, modal, curModes })
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Modal>
          </>
        )
      })}
    </Stack>
  )
}
export default Cart
