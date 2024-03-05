import Items from './Items'
import { Box, Button } from '@mui/material'
import ImageSliderAuto from './Carousel/ImageSliderAuto'
import SearchBar from './SearchBar'
import { useEffect } from 'react'
import api from '../api'
const Home = () => {
  useEffect(() => {
    const getFood = async () => {
      // console.log(api);
      await fetch('http://localhost:3000/home', { METHOD: 'GET' })
        .then(async (result) => {
          const temp = await result.json()
          console.log(temp)
        })
        .catch((error) => {
          console.log(error)
        })
      // console.log('hello')
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
      <Items />
    </>
  )
}
export default Home
