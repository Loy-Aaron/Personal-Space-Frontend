import { Mail, Lock, User, CircleAlert } from "lucide-react";

const icons = {
  username: <User />,
  email: <Mail />,
  password: <Lock />
}

const UserInput = ({ placeholder, type, name, value, onChange, onBlur, error }) => {
  return (
    <div className="w-full">
      <label className="font-bold mb-1 block">{placeholder}</label>
      <div className={`flex items-center gap-3 border-2 rounded-lg px-3 py-2 focus-within:border-blue-400 ${!error ? 'border-white' : 'border-red-400'}`}>
        {icons[name]}
        <input
          className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <CircleAlert className={`w-5 h-5 text-red-400 transition-opacity ${!error ? 'opacity-0' : 'opacity-100'}`} />
      </div>
      <div className="text-red-400 text-sm min-h-[20px]">{error}</div>
    </div>

  )
}

export default UserInput