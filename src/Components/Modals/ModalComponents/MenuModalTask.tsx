import React from 'react'
import Button from '../../Shared/Button'


type MenuModalTaskProps = {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
    handleOpen: () => void
    handleClose: () => void;
    openConfirmation: () => void
}


const MenuModalTask = ({setOpenMenu, handleOpen, openConfirmation, handleClose}: MenuModalTaskProps) => {

  
  const handleDeleteBoard = () => {
    openConfirmation()
    setOpenMenu(false)
    handleClose()
  }
  
  return ( 
    <div className='absolute p-4 bg-white dark:bg-bgDark text-mediumGrey right-0 top-full translate-y-5.5 translate-x-1/2 rounded-lg z-20 flex flex-col gap-y-4'>
        <Button onClick={handleOpen} className=' w-40 text-mds text-start capitalize  leading-5.8'>edit task</Button>
        <Button onClick={handleDeleteBoard} className=' w-40 text-mds text-start capitalize leading-5.8 text-secondary'>delete task</Button>
    </div>
  )
}

export default MenuModalTask
