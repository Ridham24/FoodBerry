import { CardMedia, Card, CardContent, Typography, IconButton,Button,Snackbar } from '@mui/material'
import { useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import {RemoveCircle} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../features/itemSlice'
import { useNavigate } from 'react-router-dom'
const Items = ({ item }) => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [mode, setMode] = useState(0)
  const [toast,setToast]=useState(false)
  const options = item.options[0][0]
  const cart = useSelector((state) => state.reducers.cart)
  const id = useSelector((state) => state.reducers.user_id)
  // console.log(cart?.length);
  // console.log(cart);
  const handleClick =async () => {
    if (mode == 0)
    {
      setToast(true)
    }
    else
    {
      if (localStorage.getItem('authToken')) {
        console.log(cart);
        const temp = cart?.find(
          (items) => items.id == item._id && items.mode == mode
        )||false
        // console.log(temp);
        if (temp) setToast(true)
        else {
          dispatch(
            addItem({
              id: item._id,
              quantity: quantity,
              mode: mode,
            }))
            const temp = await fetch('http://localhost:3000/cart', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: id,
                cart: {
                  id: item._id,
                  quantity: quantity,
                  mode: mode,
                },
              }),
            })
        }
      } else {
        setToast(true)
        navigate('/login')
      }
      }
    
  }
  return (
    <>
      <Snackbar
        open={toast}
        autoHideDuration={5000}
        onClose={()=>setToast(false)}
        message="Please select the type!"
      />
      <Card
        sx={{
          width: { md: '305px', xs: '100%' },
          borderRadius: '10px',
          borderColor: '#6c6363',
          borderWidth: '10px',
          padding:'30px'
        }}
      >
        <CardMedia
          component="img"
          image={item.img}
          alt="Image"
          sx={{ height: '130px', objectFit: 'fill' }}
        />
        <CardContent>
          <Typography variant="h5">{item.name}</Typography>
          <Typography variant="subtitle1">{item.description}</Typography>
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
            <select
              onChange={(e) => {
                setMode(e.target.value)
              }}
            >
              <option value={0}>None</option>
              {Object.keys(options).map((key) => (
                <option key={key} value={options[key]}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <Typography variant="subtitle1">
            Total Price :₹{mode * quantity}
          </Typography>
          <hr></hr>
          <Button
            variant="contained"
            sx={{ marginTop: '7px' }}
            onClick={handleClick}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
export default Items
