import React, {useState} from 'react'
import Header from './Header'
import SideBar from './SideBar'
import MainContainer from '../MainContainer/MainContainer'
import DeleteTaskModal from '../Modals/DeleteTaskModal'

const Layout = () => {
  const [openSide, setOpenSide] = useState(true)
  const [openConfirmation, setOpenConfirmation] = React.useState(false)
 
  const handleOpenConfirm = () => {
    setOpenConfirmation(true)
  }

  const handleOpen = () => {
    const modal = document.getElementById("taskModal")
    if(modal instanceof HTMLDialogElement){
      modal.showModal()
    }
  }
  
  const handleCloseConfirm = () => {
    setOpenConfirmation(false)
  }

  const handleSideBar = () => {
    setOpenSide(prev => !prev)
  }
 
  return (
    <>
        <Header open={openSide} handleSideBar={handleSideBar}/>
        <main className='w-full h-main-mobile md:h-main-tablet lg:h-main-desk z-0 relative  font-bold text-lightText dark:text-darkText flex'>
            <SideBar open={openSide}  setOpen={handleSideBar} />
            <MainContainer handleOpenConfirm={handleOpenConfirm}/>
        </main>
        {openConfirmation && <DeleteTaskModal onOpen={handleOpen} onClose={handleCloseConfirm}/>}

    </>
  )
}

export default Layout
