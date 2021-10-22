import { useState, useEffect } from 'react';
import { abi, contract, abi1, contract1 } from '../utilies/constants'
import Web3 from 'web3';

// const web3 = new Web3(window.ethereum);
// let contract= new web3.eth.Contract(abi1, contract1);

export default function CrudFunction() {
    let [accountAd, setAccountAd] = useState()
    let [updateBalance, setUpadteBalance] = useState(0)
    //     let contractOf;

    // console.log(contractOf)

    const getAccount = async () => {
        const web3 = window.web3;
        try {
            let accounts;
            accounts = await web3.eth.getAccounts();
            return accounts;
            // console.log(accounts)

        } catch (error) {
            console.log("Error while get Account");
            // return null;
        }
    }
    const contractOf = () => {
     let   newContract = new window.web3.eth.Contract(abi, contract);
        return newContract;
    }

    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);

                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                // contractOf = new window.web3.eth.Contract(abi, contract);
                let accounts = await getAccount();
                let acc = accounts[0];
                setAccountAd(acc);
            }

        } catch (error) {
            console.log("Error while loding web3", error);

        }
    }
    console.log("account Address", accountAd);
    const viewBalance = async () => {
        //  contractOf = new window.web3.eth.Contract(abi, contract);
        let balance = await contractOf().methods.ViewValue().call()
        console.log(balance);
        setUpadteBalance(balance)
    }
    setInterval(() => {
        viewBalance()
    }, 1000)
    const increaseBalance = async () => {
        try {

            await contractOf().methods.IncreaseCounter(10).send({ from: accountAd });
        } catch (error) {
            console.log("error while increse balance", error);
        }


    }
    const decreaseBalance = async () => {
        try{
            await contractOf().methods.DecreaseCounter(10).send({from: accountAd});
        }catch(error){
            console.log("Error while decrease balance", error)
        }
    }
    useEffect(() => {
        loadWeb3()
    }, [])
    return (
        <div>
            Balance:{updateBalance}
            <div>
                <button onClick={() => increaseBalance()}>Increment</button>
                <button onClick={() => decreaseBalance()}>Decrement</button>
            </div>

        </div>
    )
}
