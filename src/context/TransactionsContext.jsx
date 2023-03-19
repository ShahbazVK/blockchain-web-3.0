import React, { useState, useEffect } from 'react'
import { contractAddress, contractABI } from '../utils/constants'
import { ethers } from 'ethers'
import { Toaster, toast } from 'react-hot-toast'

export const TransactionsContext = () => {
    const [currentAccount, setcurrentAccount] = useState('')
    const [addressTo, setaddressTo] = useState('')
    const [amount, setamount] = useState('')
    const [message, setmessage] = useState('')
    const [keyword, setkeyword] = useState('')
    const [allTransaction, setallTransaction] = useState([])

    const { ethereum } = window

    useEffect(() => {
        checkIfWalletIsConnected()
        connectWallet()
        getTransactions()
    }, [])
    const createEthereumContract = () => {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer)
        return transactionsContract
    }
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Install Metamask first")
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
            localStorage.setItem('currentAccount', accounts[0])
            setcurrentAccount(accounts[0])
        }
        else alert("Make an account first")
        // console.log("currentAccount", currentAccount)
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            localStorage.setItem('currentAccount', accounts[0])
            setcurrentAccount(accounts[0])
            // window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    const sendTransaction = async () => {
        console.log("WORKING")
        if (ethereum) {
            if (addressTo === '' || amount === '') return toast.error("Input all fields.")
            const transactionsContract = createEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)//ETH to WEI

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }],
            });
            const transactionHashFunc = async () => {
                const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
                await transactionHash.wait();
                console.log("transactionHash", transactionHash)
            }
            toast.promise(
                transactionHashFunc(),
                {
                    loading: 'Waiting for confirmation...',
                    success: <b>Transaction successful!</b>,
                    error: <b>Transaction failed!</b>,
                }
            );

            setaddressTo('')
            setamount('')
            setmessage('')
            setkeyword('')
        }
    }

    const getTransactions = async () => {
        setallTransaction([])
        if (ethereum) {
            const transactionsContract = createEthereumContract()
            const availableTransactions = await transactionsContract.getAllTransactions()
            console.log(availableTransactions)
            availableTransactions.map((transaction, key) => {
                // console.log("sender", transaction.sender)

                if (localStorage.getItem('currentAccount').toLowerCase() === transaction.sender.toLowerCase()) {
                    // console.log(key, transaction.sender)

                    allTransaction.push(transaction)
                }
            })
            localStorage.setItem('transactions', JSON.stringify(allTransaction))
            // console.log("allTransaction", allTransaction)
        }

    }

    const handleChange = (event, name) => {
        if (name === 'currentAccount') {
            setcurrentAccount(event.target.value)
        }
        else if (name === 'addressTo') {
            setaddressTo(event.target.value)

        }
        else if (name === 'amount') {
            setamount(event.target.value)

        }
        else if (name === 'message') {
            setmessage(event.target.value)

        }
        else if (name === 'keyword') {
            setkeyword(event.target.value)

        }
    }
    return (
        <div className='main'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='main2'>
                <h1>EthTransfer</h1>
                <p>Sending ethereum to your loved ones is no more difficult.</p>
                <div className='form'>
                    <input value={addressTo} onChange={(event) => handleChange(event, 'addressTo')} placeholder='to' type="text" /><br />
                    <input value={amount} onChange={(event) => handleChange(event, 'amount')} placeholder='amount' type="text" /><br />
                    <input value={message} onChange={(event) => handleChange(event, 'message')} placeholder='message' type="text" /><br />
                    <input value={keyword} onChange={(event) => handleChange(event, 'keyword')} placeholder='keyword' type="text" /><br />
                    <br />
                    <button onClick={() => sendTransaction()}>Submit</button>
                </div>
            </div>
        </div>
    )
}
