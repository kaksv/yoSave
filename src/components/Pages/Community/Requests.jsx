import React, { useState } from "react"
import { Formik, Form, Field } from 'formik'
import { useMutation, useQuery } from "@tanstack/react-query"
import { ClipLoader } from "react-spinners"
import BigNumber from "bignumber.js"
import useAuthentication from "../../../Hooks/useAuthentication"
import { useParams } from "react-router-dom"
import { CeloVestContractAddress } from "../../Utils/Constants"
const RequestCenter = ({ data }) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDistributeOpen, setDIsDistributeOpen] = useState(false)
    const [isContributionOpen, setIscontributionOpen] = useState(false)
const {community_id} = useParams()
const {invalidateAccountBalance,invalidateCommunityData} = useAuthentication()
    const { data: celoVestContract } = useQuery({
        queryKey: ['celoVestContract'],
    });


    const { data: accountAddress } = useQuery({
        queryKey: ['accountAddress'],
    });

    const { data: cUSDContract } = useQuery({
        queryKey: ['cUSDContract'],
    });



    const approveAddress = (commID, address) => {
        console.log(commID, address)

    }


    const denyAddress = (commID, address) => {
        console.log(commID, address)

    }

    const isMember = () => {
        if (!data[0]?.newRequests || !accountAddress) {
            console.log("ddddddjdjdj");
            return false
        }
        for (let i = 0; i < data[0].members.length; i++) {
            if (data[0].members[i] == accountAddress) return true
        }
    }

    const { mutateAsync: HandleContributeToCommunity } = useMutation({
        mutationFn: (data) => contribute(data),
        onSuccess: async () => {
           await invalidateAccountBalance();
           await invalidateCommunityData();
            setIsLoading(false);
        },
    });


    const { mutateAsync: HandleApproveMember } = useMutation({
        mutationFn: (data) => approveMember(data),
        onSuccess: async () => {
           await invalidateCommunityData();
            setIsLoading(false);
        },
    });

    const { mutateAsync: HandleDenyMember } = useMutation({
        mutationFn: (data) => denyMember(data),
        onSuccess: async () => {
           await invalidateCommunityData();
            setIsLoading(false);
        },
    });



    const approveMember=async(user)=>{
        if(!data || !celoVestContract ||!community_id || !accountAddress ) return
        try {
            const results = await celoVestContract.methods.approveMemberToCommunity(community_id,user)
            .send({ from: accountAddress })
            return results
        } catch (error) {
            console.log("error in approving user :",error)
        }
    }

    const denyMember=async(user)=>{
        if(!data || !celoVestContract ||!community_id || !accountAddress ) return
        try {
            const results = await celoVestContract.methods.denyMemberToCommunity(community_id,user)
            .send({ from: accountAddress })
            return results
        } catch (error) {
            console.log("error in approving user :",error)
        }
    }

    const contribute = async (data) => {
        try {

            if (!celoVestContract || !cUSDContract || !accountAddress) return
            //format the amount and run the approve 
            setIsLoading(true)
            const _amount = new BigNumber(data.contributionAmount)
                .shiftedBy(18)
                .toString()

            //approve the smart contract to deduct the amount
            const result = await cUSDContract.methods
                .approve(CeloVestContractAddress, _amount)
                .send({ from: accountAddress })
           
                const results = await celoVestContract.methods.contributeToCommunityFund(community_id,_amount)
                .send({ from: accountAddress })
                return results
        } catch (error) {
            console.log("error in contributing to the community")

        }
    }


    return (
        <div className=" flex flex-col justify-center items-center w-full">
            <div
                className=" flex w-full justify-center items-center gap-6"
            >
                <span>{Number(data[0]?.members?.length)} members</span>
                {
                    data[0]?.communityAdmin == accountAddress && data[0]?.newRequests?.length > 0
                     &&
                    <div onClick={() => setIsOpen(true)} className="flex bg-blue-300 border p-1">{data?.newRequests?.length} Requests </div>
                }

                {
                    data[0]?.currentAmount < data[0]?.target && data[0]?.isActive && data[0]?.communityAdmin == accountAddress &&
                    <div onClick={() => setDIsDistributeOpen(true)} className="flex bg-blue-300 border p-1">Distribute </div>
                }

                {
                    isMember() &&
                    <div onClick={() => setIscontributionOpen(true)} className="flex bg-blue-300 border p-1">Contribute </div>
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
                                        data[0]?.newRequests?.length > 0 &&

                                        <table className="min-w-full divide-y divide-gray-200 rounded-md">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">ADDRESS</th>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500  tracking-wider">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 overflow-x-scroll overflow-y-scroll">
                                                {data[0]?.newRequests?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 text-left py-4 text-sm whitespace-nowrap">{data}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex justify-evenly items-center">
                                                                <button
                                                                    onClick={() => HandleApproveMember(data)}
                                                                    className="text-green-600 text-sm border border-blue-600">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                    </svg>

                                                                </button>

                                                                <button
                                                                    onClick={() => HandleDenyMember(data)}
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
            {isContributionOpen && (
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
                                <h2 className="text-white">Contribute</h2>

                                <Formik
                                    initialValues={{
                                        contributionAmount: 0,
                                    }}
                                    onSubmit={(values) => {
                                        HandleContributeToCommunity(values)
                                    }}
                                >
                                    {({ values, handleChange, errors, touched }) => (
                                        <Form className="flex flex-col gap-1">

                                            <Field
                                                id="contributionAmount"
                                                name="contributionAmount"
                                                type="number"
                                                placeholder="enter amount"
                                                onChange={handleChange}
                                                value={values.contributionAmount}
                                                className="border rounded-md p-2"
                                            />


                                            {isLoading ? (
                                                <div className="w-full flex justify-center items-center text-white">
                                                    <ClipLoader color="white" />
                                                </div>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 text-white p-2 rounded-md"
                                                >
                                                    Create
                                                </button>
                                            )}
                                        </Form>
                                    )}
                                </Formik>





                                <button onClick={() => setIscontributionOpen(false)} className="text-white">
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