import Items from './Items'
import { Box, Stack, Typography } from '@mui/material'
import ImageSliderAuto from './Carousel/ImageSliderAuto'
import SearchBar from './SearchBar'
import { useEffect, useState } from 'react'
import api from '../api'
const Home = () => {
  const [items, setItems] = useState()
  const [load, setLoad] = useState(true)
  useEffect(() => {
    const getFood = async () => {
      // console.log(api);
      setLoad(false)
      await fetch('http://localhost:3000/home', { METHOD: 'GET' })
        .then(async (result) => {
          const temp = await result.json()
          setItems(temp)
          setLoad(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getFood()
  }, [])
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ImageSliderAuto />
        <Box sx={{ position: 'absolute' }} left="35%" top="80%" right="40%">
          <SearchBar />
        </Box>
      </Box>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Food Items
      </Typography>
      <Stack
        sx={{
          display: 'grid',
          flexDirection: 'row',
          gridTemplateColumns: 'auto auto auto auto',
          gridRowGap: '8px',
          ml: '30px',
        }}
      >
        {items?.map((item) => (
          <Items item={item} />
        ))}
      </Stack>
    </>
  )
}
export default Home
