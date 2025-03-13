import useAlertStore from "../store/alertStore"
import UserInput from "../components/UserInput"
import { useState } from "react"
import SubmitButton from "../components/SubmitButton"
import api from '../config/axios.js'
import { validateLoginFields } from "../utils/formValidation.js"
import { Link } from "react-router-dom"
import useLoadingStore from '../store/loadingStore.js'
import useUserStore from "../store/userStore.js"

const Login = () => {
  const { setAlert } = useAlertStore()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [isDisabled, setIsDisabled] = useState(false)

  const [errors, setErrors] = useState({
    email: null,
    password: null
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleBlur = (e) => {
    const error = validateLoginFields(e.target.value)
    setErrors({
      ...errors,
      [e.target.name]: error
    })
  }

  const {setUser} = useUserStore()
  const {setIsLoading} = useLoadingStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailError = validateLoginFields(formData.email)
    const passwordError = validateLoginFields(formData.password)

    if (emailError || passwordError) {
      return setErrors({
        email: emailError,
        password: passwordError
      })
    }

    try {
      setIsDisabled(true)
      setIsLoading(true)

      const response = await api.post('/auth/login', formData)

      const user = response.data.user
      setUser(user)
      setAlert('Login Successful', 'success')
      
    } catch (error) {
      if (error.response?.status === 401) return setAlert('Invalid Credentials', 'error')
      setAlert('Login Failed', 'error')
    }finally{
      setIsDisabled(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="self-center w-full max-w-sm text-slate-950 flex flex-col gap-5 items-center bg-slate-700 rounded-2xl border-2 border-slate-400 p-6 shadow-lg">
      <p className="text-3xl font-bold text-white">Login</p>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <UserInput
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <UserInput
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <SubmitButton isDisabled={isDisabled} width='w-full'>Login</SubmitButton>
      </form>
      <p className="text-sm">Don't have an account? <Link to='/signup' className="text-blue-400 hover:underline font-bold">SignUp</Link></p>
    </div>
  )
}

export default Login