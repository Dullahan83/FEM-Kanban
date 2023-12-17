import React from "react";
import { cn } from "../../Utils/func";
import Logo from "../Icons/Logo";
import MenuIcon from "../Icons/MenuIcon";
import useStore from "../../Hooks/useStore";
import Button from "../Shared/Button";
import MenuModalBoard from "../Modals/ModalComponents/MenuModalBoard";
import EditBoardModal from "../Modals/EditBoardModal";
import NewTaskModal from "../Modals/NewTaskModal";
import DeleteBoardModal from "../Modals/DeleteBoardModal";
import LogoMobile from "../Icons/LogoMobile";
import AddTaskIcon from "../Icons/AddTaskIcon";
import ChevronIcon from "../Icons/ChevronIcon";

type IHeaderProps = {
  open: boolean;
  handleSideBar: () => void
};

const Header = ({ open, handleSideBar }: IHeaderProps) => {
  const { currentBoard } = useStore();
  const [openMenu, setOpenMenu] = React.useState(false)
  const [openConfirmation, setOpenConfirmation] = React.useState(false)

  const editBoardModalRef = React.useRef<HTMLDialogElement | null>(null)
  const createTaskRef = React.useRef<HTMLDialogElement | null>(null)

  const handleMenuState = () => {
    setOpenMenu(prev => !prev)
  }
  const handleOpen = () => {    
    editBoardModalRef.current?.showModal()
    setOpenMenu(false)
  }
  const handleClose = () => {
    if(editBoardModalRef.current){
      editBoardModalRef.current?.close()
    }
  }
  const handleOpenCreate = () => {    
    createTaskRef.current?.showModal()
  }
  const handleCloseCreate = () => {
    if(createTaskRef.current){
      createTaskRef.current?.close()
    }
  }
  const handleOpenConfirm = () => {
    setOpenConfirmation(true)
    setOpenMenu(false)

  }
  const handleCloseConfirm = () => {
    setOpenConfirmation(false)
  }
  
  return (
    <header className="flex relative z-10 w-full md:min-h-[80px]  bg-white dark:bg-darkGrey lg:min-h-[96px] h-header-mobile md:h-header-tablet lg:h-header-desk text-lightText dark:text-darkText">
      <div
        className={cn(
          `md:border-b relative md:border-r flex pl-4 pr-4 md:pl-6 lg:pl-8.5 items-center md:pr-6 lg:pr-8 transition-[padding] duration-[180ms]  h-full border-linelight dark:border-lineDark`,
          { "md:pr-82 lg:pr-28 delay-[120ms]": open }
        )}
      >
        <LogoMobile />
        <Logo />
        <span className={cn("hidden md:block absolute w-full h-2 -bottom-1 left-0 bg-white dark:bg-darkGrey transition-transform duration-300 -translate-x-full", {
          "translate-x-0": open
        })}></span>
      </div>
      <div className="flex flex-1 justify-between px-4 md:px-6 md:pr-8 md:border-b border-linelight dark:border-lineDark md:text-xlg lg:text-xl font-bold items-center">
        <h1 className="flex items-center">{currentBoard?.name }<ChevronIcon onClick={handleSideBar} className={cn("flex md:hidden ml-2",{ "rotate-180": !open })} /></h1>
        <div className="flex items-center gap-x-6 relative ">
          <Button
            variant="Base"
            disabled={currentBoard?.columns?.length === 0 || !currentBoard ? true : false}
            onClick={handleOpenCreate}
            className="hidden md:flex"
          >
            + add new task
          </Button>
          <Button
            variant="Mobile"
            disabled={currentBoard?.columns?.length === 0 || !currentBoard ? true : false}
            onClick={handleOpenCreate}
            className="flex md:hidden"
          >
            <AddTaskIcon />
          </Button>
          <MenuIcon className="h-fit" onClick={handleMenuState}/>
          {openMenu && <MenuModalBoard handleOpen={handleOpen} handleOpenConfirm={handleOpenConfirm}/>}
         <EditBoardModal key={currentBoard?.id ? currentBoard?.id : "gloubiboulga"} ref={editBoardModalRef} onClose={handleClose} /> 
          <NewTaskModal ref={createTaskRef} onClose={handleCloseCreate} />
        </div>
      </div>
      {openConfirmation && <DeleteBoardModal onClose={handleCloseConfirm}/>}

    </header>
  );
};

export default Header;
