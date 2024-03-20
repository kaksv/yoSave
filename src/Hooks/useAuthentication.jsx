
import React, { useState } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import CUSDAbi from "../contracts/erc20.abi.json"
import CeloVestAbi from "../contracts/celovest.abi.json"
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import { CeloVestContractAddress,cUSDContractAddress } from '../components/Utils/Constants'


const useAuthentication = () => {
    const queryClient = useQueryClient();
    const ERC20_DECIMALS = 18
    const navigate = useNavigate()

   
    //connect to the wallet
    const connectCeloWallet = async function () {
        if (window.celo) {
            console.log("windows object :", window.celo)
            try {
                setButtonLoading(true)

                await window.celo.enable()
                const web3 = new Web3(window.celo)
                var kit = newKitFromWeb3(web3)

                const accounts = await kit.web3.eth.getAccounts()
                kit.defaultAccount = accounts[0]

                const celoVestContract = new kit.web3.eth.Contract(CeloVestAbi, CeloVestContractAddress)
                const cUSDContract = new kit.web3.eth.Contract(CUSDAbi, cUSDContractAddress)
                console.log("celovest contract :", celoVestContract)
                //get the total number of community projects
                const [balance, totalComm, mySafes] = await Promise.all([
                    await cUSDContract.methods.balanceOf(accounts[0]).call(),
                    await celoVestContract.methods.getTotalCommunityProjects()
                        .call(),
                    await celoVestContract.methods
                        .getMySafes()
                        .call()
                ])


                //for each of the total comm, get its details
                var details = []
                for (let i = 0; i < totalComm; i++) {
                    const results = await celoVestContract.methods.getCommDetails(i)
                        .call()
                        console.log("fres sh :",results)
                    details.push({
                        title: results[0],
                        description: results[1],
                        target: results[2],
                        currentAmount: results[3],
                        isActive: results[4],
                        members: results[5],
                        communityAdmin:results[6],
                        newRequests:results[7]
                    })
                }
                console.log("community details :", details)

                //get all the safes for the use
                queryClient.setQueryData(['allCommunityDetails'], details)

                queryClient.setQueryData(['celoVestContract'], celoVestContract)

                queryClient.setQueryData(['cUSDContract'], cUSDContract)
                queryClient.setQueryData(['accountAddress'], accounts[0])

                queryClient.setQueryData(['userBalance'], (Number(balance) / 1e18))
                queryClient.setQueryData(['accountAddress'], accounts[0])
                queryClient.setQueryData(['mySafes'], mySafes)
                setButtonLoading(false)
                navigate('dashboard')

            } catch (error) {
                console.log("error in ggg :", error)
            }
        } else {
            //   notification("⚠️ Please install the CeloExtensionWallet.")
        }
    }

    const { data: cUSDContract } = useQuery({
        queryKey: ['cUSDContract'],
    });

    const { data: celoVestContract } = useQuery({
        queryKey: ['celoVestContract'],
    });

    const { data: accountAddress } = useQuery({
        queryKey: ['accountAddress'],
    });


    const compBot = useQuery({
        queryKey: ['userBalance'],
        queryFn: () => loadUserBalance(),
    });

    const comm = useQuery({
        queryKey: ['allCommunityDetails'],
        queryFn: () => loadCommunityData(),
    });

    const safes = useQuery({
        queryKey: ['mySafes'],
        queryFn: () => loadMySafes(),
    });



    const loadMySafes = async () => {
        if (!celoVestContract || !accountAddress) return
        try {
            return await celoVestContract.methods
            .getMySafes()
            .call()


        } catch (error) {
            console.log("error in loading the user'sa safes :", error)
        }
    }


    const loadCommunityData = async () => {

        if (!celoVestContract) return
        try {
            const totalComm = await celoVestContract.methods.getTotalCommunityProjects()
                .call()

            var details = []
            for (let i = 0; i < totalComm; i++) {
                const results = await celoVestContract.methods.getCommDetails(i)
                    .call()
                details.push({
                    title: results[0],
                    description: results[1],
                    target: results[2],
                    currentAmount: results[3],
                    isActive: results[4],
                    members: results[5],
                    communityAdmin:results[6],
                    newRequests:results[7]
                })
            }
            return details

        } catch (error) {
            console.log("errorn loading community data :", error)
        }
    }



    const loadUserBalance = async () => {
        try {
            if (!cUSDContract || !accountAddress) return
            const dd= await cUSDContract.methods.balanceOf(accountAddress).call()
            return dd/1e18
        } catch (error) {
            console.log("erorr in fetching user balance")
        }
    }


    async function invalidateAccountBalance() {
        await queryClient.invalidateQueries(['userBalance']);
    }

    async function invalidateCommunityData() {
        await queryClient.invalidateQueries(['allCommunityDetails']);
    }


    async function invalidateMySafes() {
        await queryClient.invalidateQueries(['mySafes']);
    }

const [buttonLoading,setButtonLoading] = useState(false)
    
    const LoginButton = () => {
        return (
            <>
                {buttonLoading ? (
                    <ClipLoader color="lightblue" />
                ) : (
                    <button
                        className="border p-1 shadow-md shadow-black rounded-md "
                        onClick={connectCeloWallet}
                    >
                        Connect Wallet
                    </button>
                )}
            </>
        );
    };



    return { 
        connectCeloWallet, 
        invalidateAccountBalance,
         invalidateCommunityData,
        invalidateMySafes ,
        LoginButton
    }
}

export default useAuthentication