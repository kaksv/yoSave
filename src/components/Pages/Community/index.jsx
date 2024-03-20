import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RequestCenter from "./Requests"
import { useQuery } from "@tanstack/react-query"
import { createObjectFromArray } from "../../Utils/functions"

const CommunityIndex = () => {
    const { community_id } = useParams()
    const [communityData, setCommunityData] = useState("")
    // const [membersData, setMembersData] = useState(null)
    const { data: allCommunityDetails } = useQuery({
        queryKey: ['allCommunityDetails'],
      });
      const { data: accountAddress } = useQuery({
        queryKey: ['accountAddress'],
      });

      const { data: celoVestContract } = useQuery({
        queryKey: ['celoVestContract'],
    });

  
    useEffect(async() => {
        if(!allCommunityDetails || !celoVestContract) return
        //fetch the all the member contributions for that community
        const communityData = allCommunityDetails?.filter((com, index) => index == community_id)
        console.log("community data :", communityData)
        //get the individual token holdings of a specific community
        const results = await celoVestContract.methods.getIndivTokenHoldings(community_id)
        .call()

        const dd = createObjectFromArray(results[0],results[1])
        console.log("holdings :",dd)


        
        setCommunityData(communityData)
    },[community_id])
   


    console.log("add :",accountAddress)

const membersData={
    ss:"ss",
    dd:"swe"
}

const isMember = () => {
    if (!communityData[0]?.newRequests || !accountAddress) {
        console.log("ddddddjdjdj");
        return false}
    for (let i = 0; i < communityData[0].members.length; i++) {
        if (communityData[0].members[i] == accountAddress) return true
    }
}

console.log("is member :",isMember())
    return (

        <div
            style={{ minHeight: '90vh' }}
            className="flex relative flex-col w-full  gap-2 rounded-md items-center"
        >

            <div className="border p-4 justify-center h-3/4 flex flex-col items-center gap-4 ">
                <div className="text-black text-3xl p-4">{communityData[0]?.title}</div>
                <div className="w-full flex flex-col items-center">   
                {communityData[0]?.currentAmount / 1e18} of {communityData[0]?.target / 1e18} cUSD
                <div className=" bg-gray-300 rounded-lg h-6 w-1/2 flex items-center">
                    <div
                        className="h-full bg-green-500 rounded-lg text-white text-right"
                        style={{ width: `${(communityData[0]?.currentAmount / communityData[0]?.target) * 100}%` }}
                        >
                        <span className="p-2 font-bold">{`${(communityData[0]?.currentAmount / communityData[0]?.target) * 100}%`}</span>
                    </div>
                </div>
                        </div>


                <div className="flex items-center justify-center w-full gap-2 ">
                        <RequestCenter data={communityData}/>
                </div>



                <p className="p-2 border flex">{communityData[0]?.description}</p>
                {
                   isMember() ?

                        <table className="min-w-full divide-y divide-gray-200 rounded-md">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500  tracking-wider">ADDRESS</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500  tracking-wider">AMOUNT(cUSD)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(membersData)?.map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="px-6 py-4 whitespace-nowrap">{key}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :

                        <button className="rounded-md p-2 bg-green-400">Request to join</button>
                }
            </div>










        </div>
    )
}

export default CommunityIndex