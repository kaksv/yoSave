import React, { useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import { dummyRequestData } from "../../Utils/functions"
import { Formik, Form, Field } from 'formik'
import { useQuery } from "@tanstack/react-query"

const RequestCenter = ({ data }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDistributeOpen, setDIsDistributeOpen] = useState(false)

    const { data: accountAddress } = useQuery({
        queryKey: ['accountAddress'],
    });



    const approveAddress = (commID, address) => {
        console.log(commID, address)

    }


    const denyAddress = (commID, address) => {
        console.log(commID, address)

    }
  

    return (
        <div className=" flex flex-col justify-center items-center w-full">
            <div
                className=" flex w-full justify-center items-center gap-6"
            >
                <span>{Number(data[0]?.members?.length)} members</span>
                {
                    data[0]?.communityAdmin == accountAddress && data?.newRequests?.length > 0 &&
                    <div onClick={() => setIsOpen(true)} className="flex bg-blue-300 border p-1">{data?.newRequests?.length} Requests </div>
                }

                {
                    data[0]?.currentAmount < data[0]?.target && data[0]?.isActive && data[0]?.communityAdmin == accountAddress &&
                    <div onClick={() => setDIsDistributeOpen(true)} className="flex bg-blue-300 border p-1">Distribute </div>
                }


            </div>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <div
                            style={{ backgroundColor: '#11131f' }}
                            className="rounded-lg overflow-hidden relative shadow-xl flex flex-col justify-center items-center transform transition-all sm:max-w-2xl sm:w-full"
                        >
                            <div className="mt-2 flex w-full justify-end mr-6 text-white">

                            </div>
                            <div className="flex flex-col gap-4 w-full justify-center items-center py-4">
                                <h2 className="text-white">Requests</h2>

                                <div className="flex w-full overflow-y-scroll h-72">

                                    {
                                        data?.newRequests?.length > 0 &&

                                        <table className="min-w-full divide-y divide-gray-200 rounded-md">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">ADDRESS</th>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500  tracking-wider">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 overflow-x-scroll overflow-y-scroll">
                                                {data?.newRequests?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 text-left py-4 text-sm whitespace-nowrap">{data}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex justify-evenly items-center">
                                                                <button
                                                                    onClick={() => approveAddress(index, data)}
                                                                    className="text-green-600 text-sm border border-blue-600">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                    </svg>

                                                                </button>

                                                                <button
                                                                    onClick={() => denyAddress(index, data)}
                                                                    className="text-red-600 text-sm border border-blue-300">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                    </svg>

                                                                </button>

                                                            </div>


                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    }
                                </div>





                                <button onClick={() => setIsOpen(false)} className="text-white">
                                    Close

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isDistributeOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <div
                            style={{ backgroundColor: '#11131f' }}
                            className="rounded-lg overflow-hidden relative shadow-xl flex flex-col justify-center items-center transform transition-all sm:max-w-2xl sm:w-full"
                        >
                            <div className="mt-2 flex w-full justify-end mr-6 text-white">

                            </div>
                            <div className="flex flex-col gap-4 w-full justify-center items-center py-4">
                                <h2 className="text-white">Distribute</h2>

                                <div className="flex w-full text-white justify-center flex-col ">
                                    <span>Distribute tokens to your members</span>

                                    <button>Confirm</button>

                                </div>





                                <button onClick={() => setDIsDistributeOpen(false)} className="text-white">
                                    Close

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}
export default RequestCenter