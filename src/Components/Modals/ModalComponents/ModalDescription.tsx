import React from 'react'

type ModalDescriptionProps = {
    children: React.ReactNode
} & React.ComponentPropsWithoutRef<"p">

const ModalDescription = ({children}: ModalDescriptionProps) => {
  return (
    <p className={` text-mds leading-5.8 text-mediumGrey`}>
      {children}
    </p>
  )
}

export default ModalDescription
