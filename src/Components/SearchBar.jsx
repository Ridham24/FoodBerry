import { Paper, IconButton, Box } from '@mui/material'
const SearchBar = ({search,setSearch}) => {
  return (
    <Paper
      component="form"
      sx={{ borderRadius: 20, height: 35, width: 350, opacity: '0.7' }}
    >
      <input
        placeholder="Search..."
        style={{
          marginLeft: '10px',
          marginTop:'8px',
          width: '84%',
          border: 'none',
          outline: 'none',
        }}
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
    </Paper>
  )
}
export default SearchBar
