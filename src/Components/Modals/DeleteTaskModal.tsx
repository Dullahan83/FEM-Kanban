import React, { ComponentPropsWithoutRef } from 'react'
import Button from '../Shared/Button';
import useStore from '../../Hooks/useStore';


interface DeleteTaskModalProps extends ComponentPropsWithoutRef<"div">{
  onClose: () => void;
  onOpen: () => void;
}
const DeleteTaskModal = ({onClose, onOpen}: DeleteTaskModalProps) => {
  const {currentTask, deleteTask} = useStore()
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Node
    if(bodyRef.current && !bodyRef.current.contains(target)){
      onClose()
    }
  }
  const handleDelete = () => {
    deleteTask()
    onClose()
  }
  const handleCancel = () => {
    onClose()
    onOpen()
  }
  
React.useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Escape"){
      onClose()
    }
  }
  document.addEventListener("keydown",(e) => handleKeyDown(e))
  return () => document.removeEventListener("keydown", (e) => handleKeyDown(e))

}, [])

  return (
  <div onClick={handleClick} className='bg-black/50 z-20 top-0 left-0  w-screen fixed h-screen flex items-center justify-center' >
      <div ref={bodyRef} className='w-85.5 md:w-480 p-6 md:p-8 md:pb-10 bg-bgLight dark:bg-bgDark rounded-md' >
          <h2 className='text-secondary text-lg leading-tight'>Delete this task?</h2>
          <p className='text-mediumGrey my-6 text-mds leading-5.8'>{`Are you sure you want to delete the ‘${currentTask.title}’ task and its subtasks? This action cannot be reversed.`}</p>
          <div className='w-full flex flex-col md:flex-row gap-4'>
            <Button onClick={handleDelete} variant='Delete'>Delete</Button>
            <Button onClick={handleCancel} variant='Cancel'>Cancel</Button>
          </div>
      </div>
  </div>
  )
}



export default DeleteTaskModal
