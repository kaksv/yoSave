import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const MyCommunities = () => {

    const [myCommunities, setMyComminuties] = useState(null)
const navigate = useNavigate()
    const { data: allCommunityDetails } = useQuery({
        queryKey: ['allCommunityDetails'],
    });

    const { data: accountAddress } = useQuery({
        queryKey: ['accountAddress'],
    });

    useEffect(() => {
        filterCommunities()
    }, [allCommunityDetails])



    const isAssociatedWithCommunity = (community) => {
        for (let i = 0; i < community.members.length; i++) {
            if (community.members[i] == accountAddress) return true
        }
    }

    const filterCommunities = () => {
        if (!allCommunityDetails || !accountAddress) return
        const filteredCommun = allCommunityDetails?.filter((community) => community.communityAdmin == accountAddress || isAssociatedWithCommunity(community))
        setMyComminuties(filteredCommun)
    }


console.log("my comunit :",myCommunities)
    return (
        <div
            style={{ minHeight: '90vh' }}
            className="flex relative flex-col w-full  gap-2 rounded-md items-center"
        >
            <div>
                <h1>My Communities</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full p-4">
                {
                    myCommunities && myCommunities.length > 0 && myCommunities.map((community, index) => {
                        return (
                            <div key={index} className="h-36  p-1 gap-1 rounded-lg shadow-md flex flex-col justify-center items-center border">
                                <h2 className="text-xl hover:cursor-pointer" onClick={() => navigate(`../community/${index}`)}>{community.title}</h2>
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


export default MyCommunities