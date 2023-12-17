import React, { useState } from 'react'
import { cn } from '../../Utils/func'
type DropAreaProps = {
    onDrop: () => void;
    first?: boolean
}
const DropArea = ({onDrop, first = false}: DropAreaProps) => {
    const [isVisible, setIsVisible] = useState(false)

    const showDropzone = () => {
      setIsVisible(true)
    }
    const hideDropzone = () => {
      setIsVisible(false)
    }
    

  return (
    <div className={cn(" h-5 transition-[padding, opacity]", {
        "py-16": isVisible,
        "": !isVisible,
        "mt-1": first && isVisible
    })} onDragEnter={showDropzone} onDragLeave={hideDropzone} onDragEnd={onDrop}>
      
    </div>
  )
}

export default DropArea
