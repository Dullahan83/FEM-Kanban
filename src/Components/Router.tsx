import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page from '../Pages/Page'

const Router = () => {
  return (
   <BrowserRouter basename='/'>
    <Routes>
        <Route path='/' element={<Page />}/>
        {/* <Route path='/:tabname' element={<Page />}/> */}
    </Routes>
   </BrowserRouter>
  )
}

export default Router
