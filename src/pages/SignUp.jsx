import useAlertStore from "../store/alertStore"
import UserInput from "../components/UserInput"
import { useState } from "react"
import SubmitButton from "../components/SubmitButton"
import api from '../config/axios.js'
import { validateSignUpFields } from "../utils/formValidation.js"
import { Link } from "react-router-dom"
import useLoadingStore from "../store/loadingStore.js"
import useUserStore from "../store/userStore.js"

const SignUp = () => {
  const { setAlert } = useAlertStore()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isDisabled, setIsDisabled] = useState(false)

  const [errors, setErrors] = useState({
    username: null,
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
    const error = validateSignUpFields(e.target.name, e.target.value)
    setErrors({
      ...errors,
      [e.target.name]: error
    })
  }

  const {setIsLoading} = useLoadingStore()
  const {setUser} = useUserStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const usernameError = validateSignUpFields('username', formData.username)
    const emailError = validateSignUpFields('email', formData.email)
    const passwordError = validateSignUpFields('password', formData.password)

    if (emailError || passwordError || usernameError) {
      return setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError
      })
    }

    try {
      setIsDisabled(true)
      setIsLoading(true)

      const response = await api.post('/auth/signup', formData)

      const user = response.data.newUser
      setUser(user)
      setAlert('SignUp Successful', 'success')

    } catch (error) {
      setAlert('SignUp Failed', 'error')
    }finally{
      setIsDisabled(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="self-center w-full max-w-sm text-slate-950 flex flex-col gap-5 items-center bg-slate-700 rounded-2xl border-2 border-slate-400 p-6 shadow-lg">
      <p className="text-3xl font-bold text-white">Sign Up</p>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <UserInput
          placeholder="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
        />
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
        <SubmitButton isDisabled={isDisabled} width='w-full'>SignUp</SubmitButton>
      </form>
      <p className="text-sm">Already have an account? <Link to='/login' className="text-blue-400 hover:underline font-bold">Login</Link></p>
    </div>
  )
}

export default SignUp