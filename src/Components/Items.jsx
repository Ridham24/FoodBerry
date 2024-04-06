import { CardMedia, Card, CardContent, Typography } from '@mui/material'
import { useState } from 'react'

const Items = ({ item }) => {
  const [quantity, setQuantity] = useState(1)
  const [mode, setMode] = useState(0)
  const options = item.options[0][0]
  // console.log(options)
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
        <select onChange={(e) => setQuantity(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
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
        <Typography variant="subtitle1">
          Total Price :₹{mode * quantity}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default Items
