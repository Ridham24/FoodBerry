import Items from './Items'
import { Box, Button } from '@mui/material'
import ImageSliderAuto from './Carousel/ImageSliderAuto'
import SearchBar from './SearchBar'
const Home = () => {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ImageSliderAuto />
        <Box
          sx={{ position: 'absolute' }}
          left="35%"
          top="80%"
          right="40%"
        >
          <SearchBar />
        </Box>
      </Box>
      <Items />
    </>
  )
}
export default Home
