import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard12 from '../partials/dashboard/Dashboard12';


import Banner from '../partials/Banner';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto bg-none">

            {/* Welcome banner */}
            <WelcomeBanner />
            <h1 className="text-3xl text-black font-semibold mb-1 bg-none title-font">BRRR Wallet</h1>
            <div className='bg-black'>
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 shadow-lg rounded-sm border border-gray-200">
            <div className="relative text-3xl text-white bg-black p-4 font-semibold sm:p-6 rounded-lg overflow-hidden mb-8" >
                Coming Soon:  {" "}
                <a target="_blank" rel="noreferrer"  href="https://ftmscan.com" > <button className="flex mt-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">View</button></a>

              </div>
            
              </div>
            </div>

            <h1 className="text-3xl  text-black font-semibold mb-1 bg-none mt-2"> Buyback Wallet</h1>
            <div className='bg-black'>
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 shadow-lg rounded-sm border border-gray-200">
            <div className="relative text-3xl text-white bg-black p-4 sm:p-6 font-semibold rounded-lg overflow-hidden mb-8" >
                Coming Soon:  {" "}
                <a target="_blank" rel="noreferrer"  href="https://ftmscan.com" > <button className="flex mt-5 mb-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">View</button></a>

              </div>
            
              </div>
            </div>

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">


            <div className='m-auto mt-10'>
            <iframe src="https://dexscreener.com/fantom/0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c" className="flex items-center justify-center m-auto" title="Dexscreener" style={{height:"80vh", width:"80vw"}}></iframe>
            </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              
              {/* <DashboardCard01 />
              Line chart (Acme Advanced)
              <DashboardCard02 />
              Line chart (Acme Professional)
              <DashboardCard03 />
              Bar chart (Direct vs Indirect)
              <DashboardCard04 />
              Line chart (Real Time Value) */}
              <DashboardCard05 className="inline-block" />

              <DashboardCard12/>

              {/* Line chart (Sales Over Time)
              <DashboardCard08 />
              Stacked bar chart (Sales VS Refunds)
              <DashboardCard09 />
              Card (Customers)
              <DashboardCard10 />
              Card (Reasons for Refunds)
              <DashboardCard11 /> */}
              

              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;