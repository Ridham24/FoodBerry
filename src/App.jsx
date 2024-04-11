import AppRouter from './AppRouter'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadCategory, loadItems,loadCurrent } from './features/itemSlice'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getFood = async () => {
      await fetch('http://localhost:3000/home', { method: 'GET' })
        .then(async (result) => {
          const temp = await result.json()
          dispatch(loadItems(temp))
          dispatch(loadCurrent(temp))
        })
        .catch((error) => console.log(error))
      await fetch('http://localhost:3000/category', { METHOD: 'GET' }).then(
        async (result) => {
          const temp = await result.json()
          dispatch(loadCategory(temp))
        }
      )
    }
    getFood()
  }, [])
  return (
    <>
        <AppRouter />
    </>
  )
}

export default App
