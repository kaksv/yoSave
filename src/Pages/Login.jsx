
import React from 'react'
import useAuthentication from '../Hooks/useAuthentication'
import { useQuery } from '@tanstack/react-query';

const Login = () => {

const {connectCeloWallet,identiconTemplate} = useAuthentication()

const { data: accountAddress } = useQuery({
    queryKey: ['accountAddress'],
  });
  console.log("account address :",accountAddress)
    return (
        <div
            style={{ minHeight: '90vh' }}
            className="flex flex-col w-full border gap-2  rounded-md justify-center items-center"
        >

            <div>
                <h1 className='text-6xl '>

                    CeloVest
                </h1>
                <span>Saving your way to the future</span>

            </div>
            <button
            className='border p-2 shadow-sm shadow-black rounded-md mt-8'
             onClick={connectCeloWallet}>Connect Wallet</button>
             

        </div>
    )
}

export default Login