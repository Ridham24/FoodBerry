import { CardMedia,Card, CardContent, Typography} from "@mui/material"

const Items = () => {
  return (
    <Card>
      <CardMedia component="img" image="" alt="Image" />
      <CardContent>
        <Typography variant="h5">Card Title</Typography>
        <Typography variant="subtitle1">Card Content</Typography>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <select>
          <option value="half">Half</option>
          <option value="full">Full</option>
              </select>
              <Typography variant="subtitle1">Total Price</Typography>
      </CardContent>
    </Card>
  )
}
export default Items