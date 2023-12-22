import Button from '../../Shared/Button'



type MenuModalBoardProps = {
    handleOpen: () => void
    handleOpenConfirm: () => void;
}


const MenuModalBoard = ({ handleOpen, handleOpenConfirm}: MenuModalBoardProps) => {
  

  return ( 
    <div className='absolute p-4 bg-white dark:bg-bgDark text-mediumGrey right-0 top-full translate-y-5.5 rounded-lg z-20 flex flex-col gap-y-4'>
        <Button onClick={handleOpen} className=' w-40 text-mds text-start capitalize  leading-5.8'>edit board</Button>
        <Button onClick={handleOpenConfirm} className=' w-40 text-mds text-start capitalize leading-5.8 text-secondary'>delete board</Button>
    </div>
  )
}

export default MenuModalBoard
