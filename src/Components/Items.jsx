import { CardMedia, Card, CardContent, Typography, IconButton,Button } from '@mui/material'
import { useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import {RemoveCircle} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { addItem} from '../features/itemSlice'

const Items = ({ item }) => {
  const dispatch=useDispatch()
  const [quantity, setQuantity] = useState(0)
  const [mode, setMode] = useState(0)
  const options = item.options[0][0]
  const cart = useSelector((state) => state.reducers.items)
  // console.log(cart?.length);
  console.log(cart);
  const handleClick = () => {
    dispatch(
      addItem({
        id: item._id,
        quantity: quantity,
        mode: mode,
      })
    )
  }
  // console.log(options)
  // console.log(item );
  return (
    <Card
      sx={{
        width: { md: '305px', xs: '100%' },
        borderRadius: '10px',
        borderColor: '#6c6363',
        borderWidth: '10px',
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
        <div style={{ display: 'flex',alignItems:'center' }}>
          <IconButton onClick={() => {
            if(quantity>0)
            setQuantity(quantity - 1)
          }}>
            <RemoveCircle sx={{fontSize:'18px'}} />
            </IconButton>
          <Typography variant="subtitle1">{quantity}</Typography>
          <IconButton onClick={()=>setQuantity(quantity+1)}>
            <AddCircle sx={{fontSize:'20px'}}/>
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
        <Button variant="contained" sx={{ marginTop: '7px' }} onClick={handleClick}>Add to Cart</Button>
      </CardContent>
    </Card>
  )
}
export default Items
