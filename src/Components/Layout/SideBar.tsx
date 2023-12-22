import React, { useRef } from "react";
import { cn } from "../../Utils/func";
import TabItem from "./TabItem";
import ThemeSwitcher from "./ThemeSwitcher";

import HideSidebarIcon from "../Icons/HideSidebarIcon";
import ShowSidebarIcon from "../Icons/ShowSidebarIcon";
import useStore from "../../Hooks/useStore";
import NewBoardModal from "../Modals/NewBoardModal";
import Button from "../Shared/Button";
type IProps = {
  open: boolean;
  setOpen: () => void;
};

const SideBar = ({ open, setOpen }: IProps) => {
  const { selectActiveBoard, currentBoard, data } = useStore();
  const createBoardModalRef = React.useRef<HTMLDialogElement | null>(null);
  const sidebarBody = useRef<HTMLDivElement>(null)
  const handleOpen = () => {
    createBoardModalRef.current?.showModal();
  };
  const handleClose = () => {
    if (createBoardModalRef.current) {
      createBoardModalRef.current?.close();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as Node
    const isMobile = window.innerWidth < 768
    if(sidebarBody.current && isMobile && !sidebarBody.current.contains(target)){
      setOpen()
    }
  }


  return (
    <div
      className={cn(
        ` w-screen  transition-[margin] h-full  duration-300 absolute md:relative z-10 after:z-50  pt-4 pb-8 float-left flex flex-col md:w-[260px] lg:w-[300px] md:border-r md:border-r-linelight md:dark:border-r-lineDark bg-black/50 md:bg-white  md:dark:bg-darkGrey  `,
        {
          "hidden  md:flex  md:-ml-[260px] lg:-ml-[300px]": !open,
        }
      )}
        onClick={handleClick}
    >
      <div ref={sidebarBody} className=" w-66 self-center md:h-full  py-4 md:py-0 rounded-lg md:self-auto md:w-full md:rounded-none bg-white dark:bg-darkGrey md:bg-transparent flex flex-col md:justify-between">
        <div className="  md:w-full flex flex-col gap-x-5 bg-white dark:bg-darkGrey">
          <h2 className="uppercase ml-6 md:ml-8 mb-5 font-bold text-sm leading-tight text-mediumGrey tracking-ginormous">{`all boards (${data?.length})`}</h2>
          <ul className="pr-6 text-mediumGrey">
            {data?.map((dataItem, index) => {
              return (
                <TabItem
                  selected={dataItem.id === currentBoard?.id}
                  className={cn(
                    "flex items-center text-md rounded-r-full group px-6 md:px-8 py-4 hover:cursor-pointer leading-none",
                    {
                      "bg-primary text-white": dataItem.id === currentBoard?.id,
                      "hover:text-primary dark:hover:bg-white hover:bg-primary hover:bg-opacity-10":
                        dataItem.id !== currentBoard?.id,
                    }
                  )}
                  key={index}
                  onClick={() => selectActiveBoard(index)}
                >
                  {dataItem.name}
                </TabItem>
              );
            })}
            <TabItem
              className={
                "flex items-center leading-none text-md px-6 md:pl-8 py-4 capitalize text-primary  dark:hover:bg-white hover:bg-primary hover:bg-opacity-10 hover:cursor-pointer group rounded-r-full hover:text-mediumGrey"
              }
              create
              onClick={handleOpen}
            >
              + create new board
            </TabItem>
          </ul>
        </div>
        <div className="w-full flex flex-col mt-4 md:pr-6 gap-y-2">
          <ThemeSwitcher />
          <Button
            onClick={setOpen}
            className="hidden md:flex items-center group rounded-r-full group px-8 py-3 capitalize text-mediumGrey hover:text-primary hover:bg-primary hover:bg-opacity-10 dark:hover:bg-white"
          >
            <HideSidebarIcon className="mr-4 fill-mediumGrey group-hover:fill-primary" />
            hide sidebar
          </Button>
        </div>
        <Button
          onClick={setOpen}
          disabled={open ? true : false}
          className={cn(
            "hidden md:flex invisible absolute bottom-8 left-full  items-center group rounded-r-full group px-5 py-4.5 transition-all  duration-75  bg-primary hover:bg-primary-hover opacity-0",
            {
              "visible opacity-100 duration-300 delay-[180ms]": !open,
            }
          )}
        >
          <ShowSidebarIcon className=" fill-white" />
        </Button>
        <NewBoardModal ref={createBoardModalRef} onClose={handleClose} />
      </div>
    </div>
  );
};

export default SideBar;
