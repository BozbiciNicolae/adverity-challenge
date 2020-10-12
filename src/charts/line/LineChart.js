import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({data}) {
  const [ chartData, setChartData ] = useState({});

  useEffect(() => {
    setChartData({})
    let chartElements = {
      labels: [],
      datasets: [
        {
          label: 'Clicks',
          data: [],
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderWidth: 4,
        },
        {
          label: 'Impressions',
          data: [],
          backgroundColor: ['rgba(25, 112, 192, 0.6)'],
          borderWidth: 4,
        }
      ]
    }
    if (data) {
      for(let i = 0; i< data.length; i++) {
        chartElements.labels.push(data[i].Date)
        chartElements.datasets[0].data.push(data[i].Clicks)
        chartElements.datasets[1].data.push(data[i].Impressions)
      }
    }

    setChartData(chartElements);
  }, [data]);

  return (
    <div>
      <Line data={chartData}></Line>
    </div>
  );
}

export default LineChart;
