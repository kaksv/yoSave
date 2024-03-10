import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Pages/Navbar'
import Sidebar from './Pages/Sidebar'
const SharedDashboardLayout = () => {
  return (
    <>
      <Suspense fallback={<div>loading ....</div>}>
       <Sidebar/>
       <Navbar/>
        <Outlet />
      </Suspense>
    </>
  )
}

export default SharedDashboardLayout