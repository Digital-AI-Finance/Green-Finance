import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  success: '#2CA02C',
  warning: '#FF7F0E'
};

const forecastData = [
  // Historical
  { year: 2015, actual: 300, base: null, optimistic: null, pessimistic: null },
  { year: 2016, actual: 420, base: null, optimistic: null, pessimistic: null },
  { year: 2017, actual: 580, base: null, optimistic: null, pessimistic: null },
  { year: 2018, actual: 750, base: null, optimistic: null, pessimistic: null },
  { year: 2019, actual: 920, base: null, optimistic: null, pessimistic: null },
  { year: 2020, actual: 1150, base: null, optimistic: null, pessimistic: null },
  { year: 2021, actual: 1450, base: null, optimistic: null, pessimistic: null },
  { year: 2022, actual: 1750, base: null, optimistic: null, pessimistic: null },
  { year: 2023, actual: 1950, base: null, optimistic: null, pessimistic: null },
  { year: 2024, actual: 2100, base: 2100, optimistic: 2100, pessimistic: 2100 },
  // Forecast
  { year: 2025, actual: null, base: 2600, optimistic: 2900, pessimistic: 2400 },
  { year: 2026, actual: null, base: 3200, optimistic: 3700, pessimistic: 2900 },
  { year: 2027, actual: null, base: 3900, optimistic: 4700, pessimistic: 3500 },
  { year: 2028, actual: null, base: 4700, optimistic: 5900, pessimistic: 4100 },
  { year: 2029, actual: null, base: 5300, optimistic: 7100, pessimistic: 4600 },
  { year: 2030, actual: null, base: 5900, optimistic: 8500, pessimistic: 5100 }
];

const MarketForecast = () => {
  const containerRef = useRef();
  const [scenarios, setScenarios] = useState({
    base: true,
    optimistic: true,
    pessimistic: true
  });

  const handleToggle = (scenario) => {
    setScenarios(prev => ({
      ...prev,
      [scenario]: !prev[scenario]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isHistorical = label <= 2024;
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12,
          minWidth: 180
        }}>
          <p style={{ margin: 0, color: COLORS.primary, fontWeight: 600, marginBottom: 8 }}>
            {label} {isHistorical ? '(Actual)' : '(Forecast)'}
          </p>
          {payload.map((entry, index) => (
            entry.value !== null && (
              <p key={index} style={{ margin: '4px 0', color: entry.color, fontSize: '0.875rem' }}>
                <span style={{ fontWeight: 600 }}>{entry.name}:</span> ${entry.value}B
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
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
        backgroundColor: '#ffffff',
        padding: '20px'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="market_forecast" />

      <Box sx={{ mb: 2, display: 'flex', gap: 3, justifyContent: 'center' }}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={scenarios.base}
                onChange={() => handleToggle('base')}
                sx={{ color: COLORS.primary }}
              />
            }
            label={<span style={{ fontSize: '0.875rem' }}>Base Case</span>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={scenarios.optimistic}
                onChange={() => handleToggle('optimistic')}
                sx={{ color: COLORS.success }}
              />
            }
            label={<span style={{ fontSize: '0.875rem' }}>Optimistic</span>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={scenarios.pessimistic}
                onChange={() => handleToggle('pessimistic')}
                sx={{ color: COLORS.warning }}
              />
            }
            label={<span style={{ fontSize: '0.875rem' }}>Pessimistic</span>}
          />
        </FormGroup>
      </Box>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={forecastData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="optimisticGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={COLORS.success} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="pessimisticGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.warning} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={COLORS.warning} stopOpacity={0}/>
            </linearGradient>
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
          <Legend
            wrapperStyle={{ fontSize: '0.875rem', paddingTop: 10 }}
          />

          {/* Historical actual */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke={COLORS.primary}
            strokeWidth={3}
            dot={{ fill: COLORS.primary, r: 4 }}
            name="Historical"
            connectNulls={false}
          />

          {/* Base case forecast */}
          {scenarios.base && (
            <Line
              type="monotone"
              dataKey="base"
              stroke={COLORS.primary}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: COLORS.primary, r: 3 }}
              name="Base Case"
              connectNulls={false}
            />
          )}

          {/* Optimistic forecast */}
          {scenarios.optimistic && (
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke={COLORS.success}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: COLORS.success, r: 3 }}
              name="Optimistic"
              connectNulls={false}
            />
          )}

          {/* Pessimistic forecast */}
          {scenarios.pessimistic && (
            <Line
              type="monotone"
              dataKey="pessimistic"
              stroke={COLORS.warning}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: COLORS.warning, r: 3 }}
              name="Pessimistic"
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <Box sx={{ mt: 2, textAlign: 'center', fontSize: '0.75rem', color: '#666' }}>
        Dashed lines indicate forecast scenarios. Solid line shows historical data.
      </Box>
    </motion.div>
  );
};

export default MarketForecast;
