import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import detectEthereumProvider from '@metamask/detect-provider';

export default function ButtonAppBar() {
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
          
          console.log("account",account);
          console.log("chain ID", chainId)
        } else {
         
          // if the provider is not detected, detectEthereumProvider resolves to null
          console.error('Please install MetaMask!')
        }
        }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Button color="inherit" onClick={()=>getConnect()}>Connect Wallet</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
