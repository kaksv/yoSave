import React from 'react'
import { dummySafeData, getFullDateFromSeconds, dummyCommunityData } from '../Utils/functions'
import { CampaignChart, SafeChart } from './Piechart'
import { useNavigate } from 'react-router-dom'
import { ImUnlocked } from "react-icons/im";
import { GiLockedDoor } from "react-icons/gi";
import SafeAddFunds from './Modals/SafeAddFunds'
import NewCommunity from './Community/NewCommunity';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
    const navigate = useNavigate()

    const { data: allCommunityDetails } = useQuery({
        queryKey: ['allCommunityDetails'],
      });
console.log("dashboard :",allCommunityDetails)

    
    return (
        <div
            style={{ minHeight: '90vh' }}
            className="flex relative flex-col w-full  gap-2 rounded-md justify-center items-center"
        >

            <div className='flex gap-2 w-full border p-4 justify-center'>

                <div className='flex flex-col gap-2 justify-center items-center border p-8 rounded-md bg-yellow-300 shadow-black shadow-md '>
                    <button
                        onClick={() => navigate('./safes')}

                        className='border p-4 '>Total Aount in Safes</button>
                    <div className="flex justify-center items-center">
                        2000
                    </div>


                </div>

                <div className='flex flex-col gap-2 justify-center items-center border p-8 rounded-md bg-green-300 shadow-black shadow-md   '>
                    <button
                        onClick={() => navigate('./savings')}
                        className='border p-4 '>Total Aount in Savings</button>
                    <div className="flex justify-center items-center">
                        5000000
                    </div>


                </div>

            </div>

            <div className='flex w-full justify-between items-center p-4 shadow-black shadow-sm rounded-sm'>

                <div className='text-4xl'>
                    Communities

                </div>
                <div className='flex justify-center items-center gap-2 border rounded-md p-2 w-1/2'>
                    <input type="text" placeholder='search community' className='w-3/4 flex rounded-md bg-transparent' />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>


                    </button>
                </div>
<NewCommunity/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full p-4 ">
                {
                    allCommunityDetails && allCommunityDetails.length > 0 && allCommunityDetails.map((community, index) => {
                        return (
                            <div key={index} className="h-36 w-48 p-1 gap-1 rounded-lg shadow-md flex flex-col justify-center items-center border">
                                <h2 className="text-xl hover:cursor-pointer" onClick={()=>navigate(`community/${index}`)}>{community.title}</h2>
                                <div className='text-white bg-blue-200 p-4 rounded w-full'>
                                    {community.currentAmount / 1e18} of {community.target / 1e18} cUSD
                                </div>
                                <div className=" w-full p-1 flex justify-end items-center">

                                    {community?.members?.length}
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>


                            </div>
                        )
                    })
                }




            </div>







        </div>

    )
}

export default Dashboard