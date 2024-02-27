import { Paper, IconButton, Box } from '@mui/material'
import { Search } from '@mui/icons-material'
const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{ borderRadius: 20, height: 35, width: 350, opacity: '0.7' }}
    >
      <input
        placeholder="Search..."
        style={{
          marginLeft: '10px',
          width: '84%',
          border: 'none',
          outline: 'none',
        }}
      />
      <IconButton>
        <Search />
      </IconButton>
    </Paper>
  )
}
export default SearchBar
