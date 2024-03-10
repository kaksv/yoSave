import React from 'react'
import { SafeChart } from '../Piechart'
import { dummySafeData, getFullDateFromSeconds } from '../../Utils/functions'
import { ImUnlocked } from "react-icons/im";
import { GiLockedDoor } from "react-icons/gi";
import SafeAddFunds from '../Modals/SafeAddFunds';

const index = () => {
    return (
        <div
            style={{ minHeight: '90vh' }}
            className="flex relative w-full flex-col  gap-2 rounded-md justify-center items-center"
        >

            <div>Safes</div>


            <div className='flex w-full gap-8 justify-evenly items-center border p-4'>
                <div className=" flex-col w-1/2 gap-2 justify-center items-center border border-red-200">
                    <button className='border  w-full '>New Safe</button>
                    <div className='flex w-96 h-96 justify-center items-center'>

                        <SafeChart className="w-56 h-56" data={dummySafeData} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-1/2 ">
                    {
                        dummySafeData && dummySafeData.length > 0 && dummySafeData.map((safe,index) => {
                            return (
                                <div key={index} className="p-4 rounded-lg shadow-md flex flex-col justify-center items-center border">
                                    <h2 className="text-lg font-bold">{safe.owner}</h2>
                                    {!safe.withdrawn ? (
                                        <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <span className='text-xs'>Locked until</span>
                                        <span>{safe.releaseTime && getFullDateFromSeconds(safe.releaseTime)}</span>
                                    </div>
                                        <div className="ml-2">
                                        <SafeAddFunds safeId={index}/>
                                            <GiLockedDoor className="w-6 h-6 text-red-500" />
                                        </div>
                                        </>
                                    ) : (
                                        <div className="ml- hover:cursor-pointer ">
                                            <SafeAddFunds safeId={index}/>
                                            <ImUnlocked className="w-6 h-6 text-green-500" />
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    }




                </div>
            </div>






        </div>
    )
}

export default index