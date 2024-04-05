import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography, Box } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
const Navbar = () => {
  return (
    <Stack direction="row" sx={{ bgcolor: '#b3f763', fontSize: '20px' }}>
      <RestaurantMenuIcon sx={{ height: 'auto' }} />
      <Typography variant="h4">FoodBerry</Typography>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          paddingTop: '10px',
          marginLeft: '30px',
          color: 'black',
        }}
      >
        Home
      </Link>
      <Box sx={{ marginLeft: 'auto', padding: '10px' }}>
        <Link
          to="/login"
          style={{
            textDecoration: 'none',
            paddingTop: '10px',
            color: 'black',
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            textDecoration: 'none',
            paddingTop: '10px',
            color: 'black',
            marginLeft: '10px',
          }}
        >
          Register
        </Link>
      </Box>
    </Stack>
  )
}
export default Navbar
