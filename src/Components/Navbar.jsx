import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography, Box, Button } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'
import { resetCart } from '../features/itemSlice'
import { useDispatch } from 'react-redux'
const Navbar = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate()
  return (
    <Stack direction="row" sx={{ bgcolor: '#b3f763', fontSize: '20px' }}>
      <RestaurantMenuIcon sx={{ height: 'auto' }} />
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          paddingTop: '14px',
          color: 'black',
        }}
      >
        <Typography variant="h5">FoodBerry</Typography>
      </Link>
      {localStorage.getItem('authToken') && (
        <Box sx={{ padding: '10px', boxShadow: '50px' }}>
          <Button
            onClick={() => navigate('/orders')}
            style={{
              textDecoration: 'none',
              borderRadius: '8px',
              paddingTop: '10px',
              color: '#b3f763',
              backgroundColor: 'white',
            }}
          >
            My Orders
          </Button>
        </Box>
      )}
      {!localStorage.getItem('authToken') && (
        <Box sx={{ marginLeft: 'auto', padding: '10px' }}>
          <Button
            onClick={() => navigate('/login')}
            style={{
              textDecoration: 'none',
              paddingTop: '10px',
              borderRadius: '8px',
              color: '#b3f763',
              backgroundColor: 'white',
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => navigate('/register')}
            style={{
              textDecoration: 'none',
              paddingTop: '10px',
              borderRadius: '8px',
              color: '#b3f763',
              marginLeft: '10px',
              backgroundColor: 'white',
            }}
          >
            Register
          </Button>
        </Box>
      )}
      {localStorage.getItem('authToken') && (
        <Box sx={{ marginLeft: 'auto', padding: '10px' }}>
          <Button
            onClick={() => navigate('/cart')}
            style={{
              textDecoration: 'none',
              paddingTop: '10px',
              borderRadius: '8px',
              color: '#b3f763',
              marginLeft: '10px',
              backgroundColor: 'white',
            }}
          >
            <ShoppingCart />
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('authToken')
              navigate('/login')
            }}
            style={{
              textDecoration: 'none',
              paddingTop: '10px',
              borderRadius: '8px',
              color: '#b3f763',
              marginLeft: '10px',
              backgroundColor: 'white',
            }}
          >
            LogOut
          </Button>
        </Box>
      )}
    </Stack>
  )
}
export default Navbar
