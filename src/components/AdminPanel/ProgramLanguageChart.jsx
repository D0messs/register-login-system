import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import '../LoginWindow/LoginWindow.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    'Python',
    'C',
    'Java',
    'C++',
    'C#',
    'Visual Basic',
    'JavaScript',
    'Assembly language',
    'SQL',
    'PHP',
    'Swift',
  ],
  datasets: [
    {
      label: '%',
      data: [
        15.42, 14.59, 12.4, 10.17, 5.59, 4.99, 2.33, 2.17, 1.7, 1.39, 1.27,
      ],
      backgroundColor: [
        'rgba(180, 99, 132, 0.2)',
        'rgba(90, 140, 260, 0.2)',
        'rgba(90, 40, 100, 0.2)',
        'rgba(240, 30, 80, 0.2)',
        'rgba(60, 240, 20, 0.2)',
        'rgba(20, 80, 210, 0.2)',
        'rgba(140, 180, 99, 0.2)',
        'rgba(220, 68, 95, 0.2)',
        'rgba(185, 92, 59, 0.2)',
        'rgba(110, 114, 45, 0.2)',
        'rgba(45, 154, 110, 0.2)',
      ],
      borderColor: [
        'rgba(180, 99, 132, 1)',
        'rgba(90, 140, 260, 1)',
        'rgba(90, 40, 100, 1)',
        'rgba(240, 30, 80, 1)',
        'rgba(60, 240, 20, 1)',
        'rgba(20, 80, 210, 1)',
        'rgba(140, 180, 99, 1)',
        'rgba(220, 68, 95, 1)',
        'rgba(185, 92, 59, 1)',
        'rgba(110, 114, 45, 1)',
        'rgba(45, 154, 110, 1)',
      ],
      borderWidth: 2,
      dataLabels: ['ahoj'],
    },
  ],
};

const Graph = () => {
  return (
    <div className="chart">
      <Pie data={data} />
    </div>
  );
};

export default Graph;
