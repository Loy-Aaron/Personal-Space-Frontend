import { useEffect, useState } from 'react'
import useUserStore from './store/userStore.js'
import Alert from './components/Alert.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Navbar from './components/Navbar.jsx'
import { Loader } from 'lucide-react'
import useLoadingStore from './store/loadingStore.js'
import Diary from './pages/Diary.jsx'
import Profile from './pages/Profile.jsx'
import useModeStore from './store/modeStore.js'
import Blogs from './pages/Blogs.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

const App = () => {

  const { user, getAuthUser } = useUserStore()

  const {isLoading} = useLoadingStore()
  
  const {textColor, bgColor} = useModeStore()

  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      await getAuthUser()
      setAuthChecked(true)
    }

    fetchUser()
  }, [])

  if (!authChecked) {return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <Loader className="text-amber-50 w-10 h-10 animate-spin" />
      </div>
  )}
  return (
    <div className={`min-h-screen w-full flex flex-col gap-5  ${bgColor} ${textColor}`}>
      <Alert />
      {user ? <Navbar/> : <p className='self-center text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-600 to-amber-900 bg-clip-text text-transparent mt-1'>PERSONAL SPACE</p>}
      {isLoading && <Loader className='absolute top-1/2 left-1/2 -translate-1/2 text-amber-50 w-10 h-10 animate-spin'/>}
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/diary' element={user ? <Diary /> : <Navigate to='/login' />} />
        <Route path='/blogs' element={user ? <Blogs /> : <Navigate to='/login' />} />
        <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App