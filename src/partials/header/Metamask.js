import React, {useEffect, useState} from 'react'

export default function Metamask() {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
          const { ethereum } = window;
          if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
          } else {
            // console.log("We have the ethereum object", ethereum);
          }
    
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          
    
          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
          } else {
            console.log("No authorized account found")
          }
        } catch (error) {
          console.log(error);
        }
      }

      const connectWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("Get MetaMask!");
            return;
          }
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          const permissions = await ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{
              eth_accounts: {},
            }]
          });

          console.log("Connected", accounts[0]);
          setCurrentAccount(accounts[0]); 
        } catch (error) {
          console.log(error)
        }
      }
      

      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])


      
    return (
        <div className="mainContainer">
        <div className="dataContainer">
          
          {/* {currentAccount && (<div>This is your address: {currentAccount}</div>)}
          {currentAccount && <div>Your balance: You BROKE</div>} */}
       <div className="bg-indigo-200"></div>

           {!currentAccount && (
       <button
        className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
             onClick={connectWallet}>
              Connect Wallet
            </button>)}
            <div className='text-black font-semibold'>
            {currentAccount && (<>{currentAccount.slice(0, 5)}{"..."}{currentAccount.slice(25,30)}</>)}
          </div>
        </div>
      </div>
    )
}
