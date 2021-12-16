import React, {useState, useEffect} from 'react';
// import { GiCoins } from 'react-icons/gi';
import USDC from '../../images/usdc.png';
import FTM from '../../images/Fantom.png';
// import {FcMoneyTransfer} from 'react-icons/fc';
import Logo from '../../images/Logo.png';
//style={{background:"#33d1b6"}}//


function WelcomeBanner() {
  
  const [currentAccount2, setCurrentAccount2] = useState("");
  const [accounts, setAccounts] = useState("");
  const [balance, setBalance] = useState("");
  const [mimBalance, setMimBalance] = useState("");
 


const Web3 = require("web3");

const provider =
  "http://rpc.fantom.network/"

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
const tokenAddress = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
const mimToken = "0x82f0B8B456c1A451378467398982d4834b6829c1";

const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
const mimContract = new Web3Client.eth.Contract(minABI, mimToken);

async function getBalance() {

  const { ethereum } = window;
  const accountsTwo = await ethereum.request({ method: 'eth_accounts' });
 const walletAddress = accountsTwo[0];
 setAccounts(walletAddress);

  const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  
  const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659
  setBalance(format);

  const mimResult = await mimContract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  const format2 = Web3Client.utils.fromWei(mimResult);
  setMimBalance(format2);

  const response = await fetch(`https://api.ftmscan.com/api?module=account&action=tokentx&contractaddress=0x04068da6c83afcfa0e13ba15a6696662335d5b75&startblock=25052210&address=${walletAddress}&page=1&offset=100&sort=asc&apikey=HKZ6TUY2KFAJQ43XPJN7E1N8X1HTBV3XX4`);
  //will need CA of the Token, and the address of the wallet
    const data = await response.json();
    console.log(data);

    let sum = 0;
    for (let i = 0; i < data.result.length; i++) {
      sum += parseInt(data.result[i].value)/1000000;
    }
    setAccounts(sum);

}


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
        
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      

      if (accounts.length !== 0) {
        const account = accounts[0];
        // console.log("Found an authorized account:", account);
        setCurrentAccount2(account);
        getBalance();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();

  }, [])

  
  
  return (

<section className="text-gray-600 body-font">
  <div className="container py-24 mx-auto">
    <div className="text-black text-3xl font-semibold mb-2">DASHBOARD</div>
    <div className="flex flex-wrap flex-col -m-4">
      <div className="sm:w-full p-4">
        <div className="border border-gray-200 bg-black p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          <img src={Logo} alt="logo" className="mr-1 w-18"/>
          </div>
          <h2 className="text-3xl text-white font-medium title-font mb-2">BRRR BALANCE</h2>
          <p className="leading-relaxed text-white text-2xl">{Math.round(mimBalance * 10000)/10000} BRRR</p>
        </div>
      </div>
      <div className="sm:w-full p-4 ">
        <div className="border border-gray-200 p-6 rounded-lg bg-black">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full  text-indigo-500 mb-4">
          <img src={USDC} alt="USDC" className="mr-1 w-10"/>
          </div>
          <h2 className="text-3xl text-white font-medium title-font mb-2">USDC REWARDS</h2>
          <p className="leading-relaxed text-white text-2xl">{accounts} {"USDC"}</p>
        </div>
      </div>
      <div className="sm:w-full p-4">
        <div className="border border-gray-200 p-6 rounded-lg bg-black">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4">
          <img src={FTM} alt="FTM" className="mr-1 w-10"/>
          </div>
          <h2 className="text-3xl text-white font-medium title-font mb-2">TOTAL FTM <span className='text-black'>{"....."}</span>
          </h2>
          <p className="leading-relaxed text-white text-2xl">{Math.round(balance * 10000)/10000} FTM</p>
        </div>
      </div>
    </div>
  </div>
</section>
    
  );
}

export default WelcomeBanner;


