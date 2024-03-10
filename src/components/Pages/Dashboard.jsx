import React from 'react'
import { dummySafeData } from '../Utils/functions'
import { CampaignChart, SafeChart } from './Piechart'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div
            style={{ minHeight: '90vh' }}
            className="flex relative w-full  gap-2 rounded-md justify-center items-center"
        >

            <div className='flex flex-col gap-2 justify-center items-center border p-8 rounded-md bg-yellow-300 shadow-black shadow-md '>
                <button
                onClick={()=>navigate('./safes')}
                
                className='border p-4 '>Total Aount in Safes</button>
                <div className="flex justify-center items-center">
                    2000
                </div>


            </div>

            <div className='flex flex-col gap-2 justify-center items-center border p-8 rounded-md bg-green-300 shadow-black shadow-md   '>
                <button
                onClick={()=>navigate('./savings')}
                 className='border p-4 '>Total Aount in Savings</button>
                <div className="flex justify-center items-center">
                    5000000                
                    </div>


            </div>

            {/* <div className='flex flex-col gap-2 justify-center items-center border p-4'>
                <button className='border p-4 '>New Safe</button>
                <div className="flex justify-center items-center border border-red-200">

                    <SafeChart data={dummySafeData} />
                </div>

            </div> */}






        </div>

    )
}

export default Dashboard