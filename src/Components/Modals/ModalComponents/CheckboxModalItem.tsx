import React from 'react'
import { cn } from '../../../Utils/func'
import useStore from '../../../Hooks/useStore'
import { ISubTasks } from '../../../Utils/Types'

type CheckboxModalItemProps = {
    subData: ISubTasks,
    index: number
    onClick: (val: number) => void
} & React.ComponentPropsWithoutRef<"input">

const CheckboxModalItem = ({subData, index}: CheckboxModalItemProps) => {
    const {manageSubtask} = useStore()

    const inputName = `checkbox${index}` 
    const [checked, setChecked] = React.useState<boolean>(subData.isCompleted)
    const handleChange = () => {
      setChecked(prev => !prev)
      manageSubtask(index)
    }
   
    
  return (
    <div className='flex p-3.5 items-center leading-tight group hover:cursor-pointer rounded bg-bgLight dark:bg-bgDark text-black dark:text-white text-sm hover:bg-primary/25 dark:hover:bg-primary/25'>
        <input className='mr-4 bg-white dark:bg-darkGrey'  checked={checked} onChange={handleChange} type="checkbox" name={inputName} id={inputName} />
        <label htmlFor={inputName} className={cn({"text-black/50 dark:text-white/50 line-through": subData.isCompleted})}>{subData.title}</label>
    </div>
  )
}

export default CheckboxModalItem
