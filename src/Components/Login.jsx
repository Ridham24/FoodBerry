import * as React from 'react'
import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import { Avatar } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Typography } from '@mui/material'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import createTheme from '@mui/material/styles/createTheme'
import axios from 'axios'
const defaultTheme = createTheme()
import { useNavigate } from 'react-router-dom'
import api from './../api'
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const temp = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).catch((error) => {
        console.log(error)
      })
      const result = await temp.json()
      // console.log(result)
      setEmail('')
      setPassword('')
      if (!result.success) return alert('Enter Valid Credentials')
      localStorage.setItem('authToken', result.authToken)
      // console.log(localStorage.getItem('authToken'))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register">{"Don't have an account? Register"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default Login
