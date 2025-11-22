import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const greenAssets = [
  { risk: 3.2, return: 5.8, name: 'Green Bond A' },
  { risk: 3.5, return: 6.1, name: 'Green Bond B' },
  { risk: 3.8, return: 6.4, name: 'Green Bond C' },
  { risk: 4.0, return: 6.7, name: 'Green Bond D' },
  { risk: 4.2, return: 7.0, name: 'Green Bond E' },
  { risk: 3.3, return: 5.9, name: 'Green Bond F' },
  { risk: 3.7, return: 6.3, name: 'Green Bond G' },
  { risk: 4.1, return: 6.8, name: 'Green Bond H' }
];

const conventionalAssets = [
  { risk: 5.5, return: 6.2, name: 'Conventional Bond A' },
  { risk: 5.8, return: 6.5, name: 'Conventional Bond B' },
  { risk: 6.0, return: 6.8, name: 'Conventional Bond C' },
  { risk: 6.2, return: 7.1, name: 'Conventional Bond D' },
  { risk: 6.5, return: 7.4, name: 'Conventional Bond E' },
  { risk: 5.7, return: 6.4, name: 'Conventional Bond F' },
  { risk: 6.1, return: 6.9, name: 'Conventional Bond G' },
  { risk: 6.3, return: 7.2, name: 'Conventional Bond H' }
];

const RiskReturnScatter = () => {
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
            {payload[0].payload.name}
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#404040' }}>
            Risk: {payload[0].payload.risk}%
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#404040' }}>
            Return: {payload[0].payload.return}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis
          type="number"
          dataKey="risk"
          name="Risk"
          unit="%"
          domain={[2, 7]}
          stroke="#666"
          style={{ fontSize: '0.875rem' }}
          label={{ value: 'Risk (%)', position: 'insideBottom', offset: -10, style: { fill: '#666' } }}
        />
        <YAxis
          type="number"
          dataKey="return"
          name="Return"
          unit="%"
          domain={[5, 8]}
          stroke="#666"
          style={{ fontSize: '0.875rem' }}
          label={{ value: 'Return (%)', angle: -90, position: 'insideLeft', style: { fill: '#666' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '0.875rem', paddingTop: 20 }}
        />
        <Scatter
          name="Green Assets"
          data={greenAssets}
          fill="#2CA02C"
        >
          {greenAssets.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#2CA02C" />
          ))}
        </Scatter>
        <Scatter
          name="Conventional Assets"
          data={conventionalAssets}
          fill="#FF7F0E"
        >
          {conventionalAssets.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#FF7F0E" />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default RiskReturnScatter;
