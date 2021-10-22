import React, { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';
import Button from '@mui/material/Button'
import {Table, TableBody, TableHead, TableRow, TableCell, makeStyles} from '@material-ui/core';
import { width } from '@mui/system';
import Web3 from 'web3';
import {abi, contract} from '../utilies/constants'
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
let contractOf = new web3.eth.Contract(abi, contract);
export default function Connect() {
  let [address, setAddress]= useState([]);
  let [updateBalance, setUpadateBalance]= useState(0)
    
    console.log("contract",contractOf);
    console.log("address", address)
        const decrement=async()=>{
        let dec= await contractOf.methods.DecreaseCounter(10).send({from: address[0]});
        
    }
    const increment=()=>{
       let add="0x7fF07dF1B339E0C76EF6D36a65276A90f0402f56";
       alert(address[0])
    console.log("address in inrese function", address[0])
    // try{

    //     let dec= await contractOf.methods.IncreaseCounter(10).send({from: address[0]});
    // }catch(error){
    //     console.log("error while incresing value", error);
    // }

        
    }
    const viewBalance=async()=>{
        let balance= await contractOf.methods.ViewValue().call();
        console.log(balance);
        setUpadateBalance(balance)
    }
    setInterval(()=>{viewBalance()},12000)
    const useStyle=makeStyles({ 
            table:{
                width:"200px"
            }
     })
    const classes= useStyle();
 const getConnect= async()=>{  
const provider = await detectEthereumProvider()
 console.log("provider", provider)
if (provider) {
 
  console.log('Ethereum successfully detected!')
 
  // From now on, this should always be true:
  // provider === window.ethereum
 
  // Access the decentralized web!
 
  // Legacy providers may only have ethereum.sendAsync
  const chainId = await provider.request({
    method: 'eth_chainId'
  })
  const account = await provider.request({
    method: 'eth_requestAccounts'
  })
  setAddress(account);
  console.log("account",account[0]);
  console.log("chain ID", chainId)
} else {
 
  // if the provider is not detected, detectEthereumProvider resolves to null
  console.error('Please install MetaMask!')
}
}
const connection=async()=>{
   await getConnect()

}
connection();
// useEffect(()=>{
// },[])
    return (
        <div>
           <h1>{updateBalance}</h1>
           <button onClick={()=>increment()}>Increment</button>
           <button>Decrement</button>

        </div>
    )
}
