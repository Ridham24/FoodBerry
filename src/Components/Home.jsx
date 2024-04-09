import Items from './Items'
import {
  Box,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material'
import ImageSliderAuto from './Carousel/ImageSliderAuto'
import SearchBar from './SearchBar'
import { useEffect, useState } from 'react'
import FilterAlt from '@mui/icons-material/FilterAlt'
import api from '../api'
const Home = () => {
  const [items, setItems] = useState()
  const [allCategory, setAllCategory] = useState([])
  const [load, setLoad] = useState(true)
  const [load2, setLoad2] = useState(true)
  const [category, setCategory] = useState('None')
  const [anchorEl, setAnchorEl] = useState(false)
  const [allItems, setAllItems] = useState()
  const [search, setSearch] = useState('')
  const open = Boolean(anchorEl)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChange = (categoryName) => {
    setCategory(categoryName)
    setAnchorEl(null)
    // console.log(category)
  }
  useEffect(() => {
    if (search != '') {
      const temp = allItems?.filter((one) =>
        one.name.toLowerCase().includes(search.toLowerCase())
      )
      console.log(temp)
      setItems(temp)
    } else setItems(allItems)
  }, [search])
  useEffect(() => {
    if (category != 'None') {
      const temp = []
      allItems?.map((cat) => {
        if (cat.CategoryName == category) temp.push(cat)
      })
      setItems(temp)
    }
    if (category === 'None') {
      setItems(allItems)
    }
  }, [category])
  useEffect(() => {
    const getFood = async () => {
      setLoad(false)
      await fetch('http://localhost:3000/home', { method: 'GET' })
        .then(async (result) => {
          const temp = await result.json()
          setItems(temp)
          setAllItems(temp)
        })
        .catch((error) => console.log(error))
      await fetch('http://localhost:3000/category', { METHOD: 'GET' }).then(
        async (result) => {
          const temp = await result.json()
          setAllCategory(temp)
          setTimeout(() => {}, 1000)
          setLoad2(true)
          // console.log(temp)
        }
      )
      setLoad(true)
    }
    getFood()
  }, [])
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ImageSliderAuto />
        <Box sx={{ position: 'absolute' }} left="35%" top="80%" right="40%">
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
      </Box>
      <div style={{ display: 'flex' }}>
        <Typography variant="h2" sx={{ textAlign: 'center', ml: '550px' }}>
          Food Items
        </Typography>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FilterAlt sx={{ fontSize: '50px' }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleChange('None')}>None</MenuItem>
          {allCategory?.map((cat) => (
            <MenuItem onClick={() => handleChange(cat.CategoryName)}>
              {cat.CategoryName}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <Grid container spacing="10" sx={{ ml: '50px' }}>
        {items?.map((item) => (
          <Grid item xs={6} md={6} lg={3}>
            <Items item={item} />
          </Grid>
        ))}
      </Grid>
      {/* </Stack> */}
    </>
  )
}
export default Home
