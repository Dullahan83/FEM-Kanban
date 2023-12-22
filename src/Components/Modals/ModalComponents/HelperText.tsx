
const HelperText = ({content = "Can't be empty"} : {content?: string}) => {
  return (
    <p className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-secondary'>
      {content}
    </p>
  )
}

export default HelperText
