import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dummyCommunityData } from "../../Utils/functions"

const CommunityIndex = () => {
    const { community_id } = useParams()
    const [communityData, setCommunityData] = useState("")
    const myAddress = "sam"
    console.log("ddd ", communityData);
    useEffect(() => {
        //fetch the all the member contributions for that community
        const data = dummyCommunityData.filter((com, index) => index == community_id)
        console.log("community data :", data)
        setCommunityData(data)


    }, [community_id])
    
    return (

        <div
            style={{ minHeight: '90vh' }}
            className="flex relative flex-col w-full  gap-2 rounded-md items-center"
        >

            <div className="border p-4 justify-center h-3/4 flex flex-col items-center ">
                <div className="text-black">{communityData[0]?.title}</div>
                <div>                                    {communityData[0]?.currentAmount / 1e18} of {communityData[0]?.target / 1e18} cUSD


                </div>
                <div className="w-full bg-gray-300 rounded-lg h-8 mt-4">
                    <div
                        className="h-full bg-green-500 rounded-lg text-white text-right"
                        style={{ width: `${(communityData[0]?.currentAmount/communityData[0]?.target)*100}%` }}
                    >
                        <span className="p-2 font-bold">{`${communityData[0]?.currentAmount / 1e18} of {communityData[0]?.target / 1e18}%`}</span>
                    </div>
                </div>
                <span>{communityData[0].members.length} members</span>



                <p>{communityData[0]?.description}</p>
                {
                    !communityData[0]?.members?.includes(myAddress) ?
                        "ss"
                        :

                        <button className="rounded-md p-2 bg-green-400">Request to join</button>
                }
            </div>










        </div>
    )
}

export default CommunityIndex