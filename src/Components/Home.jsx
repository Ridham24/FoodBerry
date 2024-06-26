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
import { useSelector,useDispatch } from 'react-redux'
import { loadCurrent } from '../features/itemSlice'
const Home = () => {
  const dispatch=useDispatch()
  const allItems = useSelector((state) => state.reducers.items)
  const allCategory = useSelector((state) => state.reducers.categories)
  const items=useSelector((state)=>state.reducers.currentItems)
  const [category, setCategory] = useState('None')
  const [anchorEl, setAnchorEl] = useState(false)
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
  }
  useEffect(() => {
    if (search != '') {
      const temp = allItems?.filter((one) =>
        one.name.toLowerCase().includes(search.toLowerCase())
      )
      dispatch(loadCurrent(temp))
    } else dispatch(loadCurrent(allItems))
  }, [search])
  useEffect(() => {
    if (category != 'None') {
      const temp = allItems?.filter((item)=>item.CategoryName == category)
      dispatch(loadCurrent(temp))
    }
    if (category === 'None') {
      dispatch(loadCurrent(allItems))
    }
  }, [category])
  return (
    <Box sx={{ mt: '50px' }}>
      <Box sx={{ position: 'relative' }}>
        <ImageSliderAuto />
        <Box
          sx={{
            position: 'absolute',
            top: '80%',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', left: 0, right: 0, justifyContent: 'center' }}
      >
        <Typography variant="h2">Food Items</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FilterAlt sx={{ fontSize: '30px', color: 'black' }} />
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
      </Box>
      <Box sx={{
        ml: {
          lg: '50px',
          md:'30px',
          xs:'10px'
      } }}>
        <Grid container spacing={2} justifyContent="center">
          {items?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Items item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
export default Home
