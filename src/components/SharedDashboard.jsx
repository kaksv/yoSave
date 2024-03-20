import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Pages/Navbar'
import Sidebar from './Pages/Sidebar'
const SharedDashboardLayout = () => {
  return (
    <>



      <Suspense fallback={<div>loading ....</div>}>
      <div className="flex w-full">
      <div className="flex w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <Navbar/>
        <Outlet />
      </div>
    </div>
      </Suspense>
    </>
  )
}

export default SharedDashboardLayout