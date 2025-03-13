
const SubmitButton = ({ children, isDisabled, width}) => {
  return (
    <button
      className={`${width} self-center mt-3 px-6 py-3 rounded-2xl border-2 border-transparent bg-green-500 text-white font-semibold transition-all duration-300
    hover:bg-green-700 hover:cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed`}
      type='submit'
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default SubmitButton