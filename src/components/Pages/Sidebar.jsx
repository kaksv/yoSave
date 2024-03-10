import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { RiNftFill } from 'react-icons/ri';
import { MdMenu } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
const Sidebar = () => {

    const [isMainMenuOpen, setIsMainMenuOpen] = useState(true)
    // const [isBotMenuOpen, setIsBotMenuOpen] = useState(false)
    const toggleMainMenu = () => {
      setIsMainMenuOpen(!isMainMenuOpen)
    }
  
    // const toggleBotMenu = () => {
    //   setIsBotMenuOpen(!isBotMenuOpen)
    // }
  
  return (

          <div className='relative px-6'>
            {
              !isMainMenuOpen &&
              <button className="fixed top-4 left-4 z-10 blue" onClick={toggleMainMenu}>
                <MdMenu />
              </button>

            }

            <nav
              className={`fixed mt-10 top-0 left-0 p-4 w-36 bg-blue-600 text-white md:flex md:flex-col transition-transform duration-300 ${isMainMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} >
              <div className='w-full justify-center items-center flex'>
                <IoMdCloseCircle onClick={toggleMainMenu} />
              </div>


              <div className="flex flex-col gap-4  mt-2">
                <div>
                  <div>CeloVest</div>
                </div>
                {/* the tabs */}
                <div className="justify-center align-center">
                  <div className="flex items-center p-2 gap-4 hover:bg-yellow-500">
                    <MdDashboard className="mt-1" />

                    <Link to="/dashboard">Home</Link>
                  </div>

                  <div className="flex items-center p-2 gap-4 hover:bg-yellow-500 hover:cursor-pointer">
                    <IoArrowForwardOutline />
                    <Link to="./safes">Safes</Link>
                  </div>
                  <div className="flex items-center p-2 gap-4 hover:bg-yellow-500">
                    <IoArrowBackOutline />
                    <Link to="./tunnels">Savings</Link>
                  </div>
                  <div className="flex items-center p-2 gap-4 hover:bg-yellow-500">
                    <RiNftFill />
                    <Link to="./subscriptions">Invest</Link>
                  </div>
                  
                </div>
              </div>
            </nav>
          </div>
        
  )
}

export default Sidebar