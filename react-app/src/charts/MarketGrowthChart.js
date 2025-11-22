import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { year: 2015, value: 300 },
  { year: 2016, value: 420 },
  { year: 2017, value: 580 },
  { year: 2018, value: 750 },
  { year: 2019, value: 920 },
  { year: 2020, value: 1150 },
  { year: 2021, value: 1450 },
  { year: 2022, value: 1750 },
  { year: 2023, value: 1950 },
  { year: 2024, value: 2100 }
];

const MarketGrowthChart = () => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #3333B2',
          borderRadius: 8,
          padding: 12
        }}>
          <p style={{ margin: 0, color: '#3333B2', fontWeight: 600 }}>
            {payload[0].payload.year}
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#404040' }}>
            ${payload[0].value}B
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis
          dataKey="year"
          stroke="#666"
          style={{ fontSize: '0.875rem' }}
        />
        <YAxis
          stroke="#666"
          style={{ fontSize: '0.875rem' }}
          label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft', style: { fill: '#666' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '0.875rem', paddingTop: 20 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3333B2"
          strokeWidth={3}
          dot={{ fill: '#3333B2', r: 5 }}
          activeDot={{ r: 8 }}
          name="Global Green Finance Market"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketGrowthChart;
