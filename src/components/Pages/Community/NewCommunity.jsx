import React, { useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import { dummyRequestData } from "../../Utils/functions"
import { ClipLoader } from "react-spinners"
import { Formik, Form, Field } from 'formik'
import { useMutation, useQuery } from "@tanstack/react-query"
import useAuthentication from "../../../Hooks/useAuthentication"
import BigNumber from "bignumber.js"

const NewCommunity = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
const {invalidateCommunityData} = useAuthentication()

    const { mutateAsync: HandleSubmitNewCommunity } = useMutation({
        mutationFn: (data) => handleSubmit(data),
        onSuccess: async () => {
          await invalidateCommunityData();
          setIsLoading(false);
        },
      });
    
      const { data: celoVestContract } = useQuery({
        queryKey: ['celoVestContract'],
    });


    const { data: accountAddress } = useQuery({
        queryKey: ['accountAddress'],
    });



    const handleSubmit = async(data) => {
    try {
        setIsLoading(true)
        if(!celoVestContract || !accountAddress) {
            console.log("igsnyr")
            return}
        //format the amount values
        const _amount = new BigNumber(data.campaignTarget)
                    .shiftedBy(18)
                    .toString()

                    const results = await celoVestContract.methods.createNewCommunitySavingCampaign(
                        data.campaignTitle,
                        data.campaignDescription,
                        _amount
                    )
                    .send({ from: accountAddress })
console.log("new comm results :",results)
                    return results
        
    } catch (error) {
        console.log("error in ddd :",error)
        
    }
        
    }
    //my strategy is that either the coin goes to zero or i make some profits from it. I usually don't sell at a loss because i have already decided to lose that money.

    return (
        <div className=" flex flex-col justify-center items-center">
            <div
                onClick={() => setIsOpen(true)}
                className=" flex w-full justify-center items-center gap-6 hover:cursor-pointer border p-6"
            >

                New
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
                                <h2 className="text-white">New Community Campaign</h2>
                                <Formik
                                    initialValues={{
                                        campaignTitle: '',
                                        campaignDescription: "",
                                        campaignTarget: 0,
                                    }}
                                    onSubmit={(values) => {
                                        HandleSubmitNewCommunity(values)
                                    }}
                                >
                                    {({ values, handleChange, errors, touched }) => (
                                        <Form className="flex flex-col gap-1">

                                            <Field
                                                id="campaignTitle"
                                                name="campaignTitle"
                                                type="text"
                                                placeholder="enter campaign title"
                                                onChange={handleChange}
                                                value={values.campaignTitle}
                                                className="border rounded-md p-2"
                                            />
                                            <Field
                                                id="campaignDescription"
                                                name="campaignDescription"
                                                type="text"
                                                placeholder="enter campaign description"
                                                onChange={handleChange}
                                                value={values.campaignDescription}
                                                className="border rounded-md p-2"
                                            />

                                            <Field
                                                id="campaignTarget"
                                                name="campaignTarget"
                                                type="number"
                                                placeholder="enter campaign target amount"
                                                onChange={handleChange}
                                                value={values.campaignTarget}
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




                                <button onClick={() => setIsOpen(false)} className="text-white">
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
export default NewCommunity