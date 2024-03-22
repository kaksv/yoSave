import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import Login from './Pages/Login';
import Dashboard from './components/Pages/Dashboard';
import SharedDashboardLayout from './components/SharedDashboard';
import Safes from "./components/Pages/Safes"

import Community from "./components/Pages/Community"
import MyCommunities from "./components/Pages/Community/MyCommunities"
const InputComponent = () => {



  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Login />} />
          <Route path='dashboard' element={<SharedDashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='safes' element={<Safes />} />
            <Route path='communities' element={<MyCommunities />} />

            <Route path='community/:community_id' element={<Community />} />

            
          </Route>

        </Route>
      </Routes>
    </>
  );
};

export default InputComponent;