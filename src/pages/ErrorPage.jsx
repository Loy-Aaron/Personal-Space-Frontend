import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-4xl font-bold">You are heading  the wrong way</p>
      <Link to='/' className="hover:text-blue-500 hover:underline">Click this to go back</Link>
    </div>
  )
}

export default ErrorPage