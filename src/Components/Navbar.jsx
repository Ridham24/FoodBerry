import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <Box
      sx={{
        bgcolor: '#b3f763',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        flexDirection:{md:'row',xs:'column'}
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <RestaurantMenuIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            FoodBerry
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {localStorage.getItem('authToken') ? (
          <>
            <Button
              color="inherit"
              onClick={() => navigate('/orders')}
              sx={{ mx: 1 }}
            >
              My Orders
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ mx: 1 }}
            >
              <ShoppingCartIcon />
            </Button>
            <Button color="inherit" onClick={handleLogout} sx={{ mx: 1 }}>
              LogOut
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ mx: 1 }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/register')}
              sx={{ mx: 1 }}
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Navbar
