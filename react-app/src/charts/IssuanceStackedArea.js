import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF',
  success: '#2CA02C',
  warning: '#FF7F0E'
};

const data = [
  { year: 2015, greenBonds: 250, slBonds: 20, greenLoans: 20, greenEquity: 10, carbon: 0 },
  { year: 2016, greenBonds: 340, slBonds: 30, greenLoans: 30, greenEquity: 15, carbon: 5 },
  { year: 2017, greenBonds: 450, slBonds: 45, greenLoans: 50, greenEquity: 25, carbon: 10 },
  { year: 2018, greenBonds: 560, slBonds: 65, greenLoans: 70, greenEquity: 35, carbon: 20 },
  { year: 2019, greenBonds: 690, slBonds: 90, greenLoans: 85, greenEquity: 40, carbon: 15 },
  { year: 2020, greenBonds: 850, slBonds: 125, greenLoans: 105, greenEquity: 50, carbon: 20 },
  { year: 2021, greenBonds: 1050, slBonds: 180, greenLoans: 140, greenEquity: 60, carbon: 20 },
  { year: 2022, greenBonds: 1250, slBonds: 240, greenLoans: 160, greenEquity: 70, carbon: 30 },
  { year: 2023, greenBonds: 1420, slBonds: 320, greenLoans: 220, greenEquity: 180, carbon: 110 },
  { year: 2024, greenBonds: 1600, slBonds: 500, greenLoans: 300, greenEquity: 400, carbon: 200 }
];

const IssuanceStackedArea = () => {
  const containerRef = useRef();
  const [hiddenSeries, setHiddenSeries] = useState(new Set());

  const toggleSeries = (dataKey) => {
    setHiddenSeries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dataKey)) {
        newSet.delete(dataKey);
      } else {
        newSet.add(dataKey);
      }
      return newSet;
    });
  };

  const series = [
    { key: 'greenBonds', name: 'Green Bonds', color: COLORS.primary },
    { key: 'slBonds', name: 'Sustainability-Linked Bonds', color: COLORS.secondary },
    { key: 'greenLoans', name: 'Green Loans', color: COLORS.success },
    { key: 'greenEquity', name: 'Green Equity', color: COLORS.warning },
    { key: 'carbon', name: 'Carbon Markets', color: COLORS.light }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12,
          minWidth: 200
        }}>
          <p style={{ margin: 0, color: COLORS.primary, fontWeight: 600, marginBottom: 8 }}>
            {label}
          </p>
          {payload.reverse().map((entry, index) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color, fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600 }}>{entry.name}:</span> ${entry.value}B
            </p>
          ))}
          <p style={{ margin: '8px 0 0 0', color: '#404040', fontWeight: 700, borderTop: '1px solid #E0E0E0', paddingTop: 8 }}>
            Total: ${total}B
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        marginTop: '20px'
      }}>
        {series.map(({ key, name, color }) => (
          <motion.div
            key={key}
            onClick={() => toggleSeries(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              opacity: hiddenSeries.has(key) ? 0.4 : 1,
              textDecoration: hiddenSeries.has(key) ? 'line-through' : 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{
              width: 16,
              height: 16,
              backgroundColor: color,
              borderRadius: 2
            }} />
            <span style={{ fontSize: '0.875rem', color: '#404040' }}>{name}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '20px'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="issuance_stacked_area" />

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            {series.map(({ key, color }) => (
              <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.3}/>
              </linearGradient>
            ))}
          </defs>
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

          {series.map(({ key, color }) => !hiddenSeries.has(key) && (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={`url(#color${key})`}
              animationDuration={1500}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      <CustomLegend />
    </motion.div>
  );
};

export default IssuanceStackedArea;
