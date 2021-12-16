import React, {useEffect, useState} from 'react';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");
  const [percentChange, setPercentChange] = useState("");
  const [averageprice, setAverageprice] = useState("");
  const [date, setDate] = useState("");
  
  // async function getAveragePrice (){
  //   const response = await fetch(`https://api.coingecko.com/api/v3/coins/fantom/market_chart/range?vs_currency=usd&from=1639364827&to=1639451227`);
  //     const data = await response.json();

  //     const priceMap = data.prices.map(price => price[1]);
  //     setAverageprice(priceMap);
  //   console.log(priceMap);
  //   const DateMap = data.prices.map(item => new Date(item[0]).toLocaleDateString("en-US"));
  //   setDate(DateMap);
  //   console.log(DateMap);

    
  //   }


  const chartData = {
    labels: [  
    "1-22-2020", "1-23-2020", "1-24-2020"
    ],
    datasets: [
      // Indigo line
      {
        data: 
          [],
         averageprice
        ,
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
      // Gray line
      {
        data: [

        ],
        borderColor: tailwindConfig().theme.colors.gray[300],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.gray[300],
        clip: 20,
      },
    ],
  };

  async function getCoinPrice (){
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);
    const data = await response.json();
    console.log(data);
    setVolume(data.fantom.usd_24h_vol);
    setPrice(data.fantom.usd);
    setPercentChange(data.fantom.usd_24h_change);


  
  }


  useEffect(() => {
    getCoinPrice();

  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
        </header>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">BRRR </h2>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{parseFloat(volume).toLocaleString('en')}</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">${price}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-gray-400 rounded-full">{Math.round(percentChange).toFixed(4)} %</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="flex-grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
