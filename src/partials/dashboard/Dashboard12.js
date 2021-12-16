import React, {  } from 'react';
import Spookyswap from '../../images/spookyswap.png'


function DashboardCard12() {

    
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-black shadow-lg rounded-sm border justify-content text-center justify-center items-center border-gray-200">

    <h2 className="px-5 font-semibold text-gray-800 text-center "></h2>
    <a target="_blank" rel="noreferrer" href="https://spookyswap.finance/swap"><button className="bg-indigo-400 rounded text-lg hover:bg-indigo-500 text-white font-semibold py-2 px-4">Buy BRRR on SpookySwap!
    <img src={Spookyswap} alt="Buy BRRR" className="w-12 self-center justify-content align-middle m-auto" /></button></a>
    </div>

//center items horizontally and vertically




  );
}

export default DashboardCard12;
