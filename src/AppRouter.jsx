import { BrowserRouter, Routes, Route ,Link} from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
const AppRouter = () => {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
  )
}
export default AppRouter