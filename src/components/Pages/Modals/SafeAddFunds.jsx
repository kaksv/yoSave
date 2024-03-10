import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ClipLoader } from 'react-spinners'
import { IoMdClose } from 'react-icons/io'
import * as Yup from 'yup'
import { FaRobot } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { IoAddCircle } from "react-icons/io5";
import { dummySafeData } from '../../Utils/functions'

function SafeAddFunds({safeId}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fruits = ['Twitter']
  const validationSchema = Yup.object().shape({
    mediaType: Yup.string().required('select media'),
    mediaAccount: Yup.string().required('handle is missing'),
  })
  const { data: mySafes } = useQuery({
    queryKey: ['mySafes'],
  });
  const [safeName,setSafe] = useState("")

  useEffect(()=>{
    if(!mySafes) return

    const results = dummySafeData.filter((safe,index)=>index ===safeId)
    console.log("res :",results,mySafes)
    setSafe(results)

  },[safeId])


  async function handleSubmit(values) {
    try {
      setIsLoading(true)
      console.log(safeId)

      // if (!backendActor) return
      // const results = await backendActor.dummyPost({
      //   intType: values.mediaType,
      //   mediaAccount: values.mediaAccount,
      // })
      // console.log(results)
    } catch (error) {
      console.log('error in submit bot request :', error)
    }
    setIsLoading(false)
  }
  console.log(isLoading)
  return (
    <div className=" flex flex-col justify-center items-center w-full ">
      <div
        onClick={() => setIsOpen(true)}
        type="submit"
        className=""
      >
        <IoAddCircle />
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
              className="rounded-lg overflow-hidden relative shadow-xl flex flex-col justify-center items-center transform transition-all sm:max-w-md sm:w-full"
            >
              <div className="mt-2 flex w-full justify-end mr-6 text-white">
                <IoMdClose
                  size={25}
                  className="hover:cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="flex flex-col gap-4 w-full justify-center items-center py-4">
                <h2 className="text-white">Add Funds to Safe</h2>

                <Formik
                  initialValues={{
                    tokenAmount: '',
                    mediaAccount: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    handleSubmit(values)
                  }}
                >
                  {({ values, handleChange, errors, touched }) => (
                    <Form className="flex flex-col gap-1">
                     
                      <Field
                        id="tokenAmount"
                        name="tokenAmount"
                        type="text"
                        placeholder="enter account handle"
                        onChange={handleChange}
                        value={values.tokenAmount}
                        className="border rounded-md p-2"
                      />
                      <div>
                        <span>{safeName[0]?.user}</span>
                      </div>

                     

                      {isLoading ? (
                        <div className="w-full flex justify-center items-center text-white">
                          <ClipLoader color="white" />
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="bg-blue-500 text-white p-2 rounded-md"
                        >
                          Top-up
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SafeAddFunds