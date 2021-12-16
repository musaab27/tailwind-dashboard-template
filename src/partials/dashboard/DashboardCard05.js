import React, { useState, useEffect } from 'react';
import Info from '../../utils/Info';
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard05() {
  const [volume, setVolume] = useState("");
  // const [price, setPrice] = useState("");
  // const [percentChange, setPercentChange] = useState("");
  // const [averageprice, setAverageprice] = useState("");

  async function getCoinPrice (){
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);
      const data = await response.json();
      console.log(data);
      setVolume(data.fantom.usd_24h_vol);
      // setPrice(data.fantom.usd);
      // setPercentChange(data.fantom.usd_24h_change);
    
    }



  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);
  
  // Dummy data to be looped
  const data = [
   1.32, 1.31, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.31, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.31, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.33, 1.33, 1.33, 1.32, 1.32, 1.32, 1.33, 1.33, 1.33, 1.33, 1.33, 1.33, 1.32, 1.33, 1.34, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.32, 1.33, 1.33, 1.33, 1.32, 1.32, 1.32, 1.33, 1.33, 1.33, 1.33, 1.33, 1.33, 1.32, 1.33, 1.34, 1.33, 1.34, 1.33, 1.34, 1.33, 1.34, 1.33 
  ];

  const [slicedData, setSlicedData] = useState(data.slice(0, range));

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date();
    const dates = [];
    data.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000));
    });
    return dates;
  };

  const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

  // Fake update every 2 seconds
  useEffect(() => {
    getCoinPrice();
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 100000);
    return () => clearInterval(interval)
  }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1);
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }
    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
    return () => setIncrement(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //

  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                     <h2 className="px-5 py-4 font-semibold text-gray-800">FTM Placeholder</h2>
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
      <div className="font-semibold text-gray-800">Volume: {parseFloat(volume).toLocaleString('en')}</div>



        <Info className="ml-2" containerClassName="min-w-44">
          <div className="text-sm text-center">Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></div>
        </Info>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}

      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;
