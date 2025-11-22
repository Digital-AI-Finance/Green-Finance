import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { scaleSequential } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0'
};

// Generate contour data: maturity (1-30 years) x greenium (0-10 bps) -> yield (%)
const generateYieldData = () => {
  const data = [];
  const maturities = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30];
  const greeniums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  maturities.forEach(maturity => {
    greeniums.forEach(greenium => {
      // Simplified yield curve: base yield + term premium - greenium effect
      const baseYield = 2.0; // Risk-free rate
      const termPremium = 0.15 * Math.sqrt(maturity); // Increases with maturity
      const greeniumEffect = greenium * 0.01; // Convert bps to percentage
      const yield_ = baseYield + termPremium - greeniumEffect;

      data.push({
        maturity,
        greenium,
        yield: parseFloat(yield_.toFixed(3)),
        size: 100
      });
    });
  });

  return data;
};

const YieldCurveSurface = () => {
  const containerRef = useRef();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const data = generateYieldData();

  // Color scale for yield values
  const yieldExtent = [
    Math.min(...data.map(d => d.yield)),
    Math.max(...data.map(d => d.yield))
  ];
  const colorScale = scaleSequential(interpolateBlues).domain(yieldExtent);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12
        }}>
          <p style={{ margin: 0, color: COLORS.primary, fontWeight: 600, marginBottom: 8 }}>
            Yield Surface Point
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600 }}>Maturity:</span> {point.maturity} years
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600 }}>Greenium:</span> {point.greenium} bps
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600, color: COLORS.primary }}>Yield:</span> {point.yield.toFixed(3)}%
          </p>
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
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '20px'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="yield_curve_surface" />

      <div style={{ fontSize: '1rem', fontWeight: 600, color: COLORS.primary, marginBottom: '10px' }}>
        Green Bond Yield Surface
      </div>
      <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '20px' }}>
        Hover over points to see exact yield values
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <ScatterChart
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            type="number"
            dataKey="maturity"
            name="Maturity"
            unit=" years"
            stroke="#666"
            style={{ fontSize: '0.875rem' }}
            label={{ value: 'Maturity (years)', position: 'insideBottom', offset: -10, style: { fill: '#666' } }}
            domain={[0, 32]}
          />
          <YAxis
            type="number"
            dataKey="greenium"
            name="Greenium"
            unit=" bps"
            stroke="#666"
            style={{ fontSize: '0.875rem' }}
            label={{ value: 'Greenium (bps)', angle: -90, position: 'insideLeft', style: { fill: '#666' } }}
            domain={[0, 11]}
          />
          <ZAxis
            type="number"
            dataKey="size"
            range={[100, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={data}
            shape="circle"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorScale(entry.yield)}
                stroke="#fff"
                strokeWidth={1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Color legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px'
      }}>
        <span style={{ fontSize: '0.75rem', color: '#666' }}>
          Low Yield ({yieldExtent[0].toFixed(2)}%)
        </span>
        <div style={{
          width: '200px',
          height: '20px',
          background: 'linear-gradient(to right, #f7fbff, #08519c)',
          borderRadius: '4px',
          border: '1px solid #E0E0E0'
        }} />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>
          High Yield ({yieldExtent[1].toFixed(2)}%)
        </span>
      </div>
    </motion.div>
  );
};

export default YieldCurveSurface;
