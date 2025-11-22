import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SliderControl from '../components/SliderControl';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  success: '#2CA02C',
  light: '#C1C1E8'
};

const PriceSensitivityCalculator = () => {
  const containerRef = useRef();
  const [discountRate, setDiscountRate] = useState(2.5); // %
  const [greenium, setGreenium] = useState(3); // bps
  const [maturity, setMaturity] = useState(10); // years
  const [couponRate, setCouponRate] = useState(3); // %

  // Calculate bond prices
  const calculateBondPrice = (rate) => {
    const r = rate / 100;
    const c = couponRate;
    const T = maturity;
    const F = 100; // Face value

    if (r === 0) return c * T + F;

    const pv_coupons = c * (1 - Math.pow(1 + r, -T)) / r;
    const pv_principal = F * Math.pow(1 + r, -T);

    return pv_coupons + pv_principal;
  };

  const conventionalPrice = calculateBondPrice(discountRate);
  const greenRate = discountRate - (greenium / 100); // Convert bps to %
  const greenPrice = calculateBondPrice(greenRate);
  const priceDifference = greenPrice - conventionalPrice;

  // Calculate duration (Macaulay)
  const calculateDuration = (rate) => {
    const r = rate / 100;
    const c = couponRate;
    const T = maturity;
    const F = 100;

    let weightedSum = 0;
    let price = 0;

    for (let t = 1; t <= T; t++) {
      const cf = t === T ? c + F : c;
      const pv = cf / Math.pow(1 + r, t);
      weightedSum += t * pv;
      price += pv;
    }

    return weightedSum / price;
  };

  const conventionalDuration = calculateDuration(discountRate);
  const greenDuration = calculateDuration(greenRate);

  // Calculate modified duration
  const conventionalModDuration = conventionalDuration / (1 + discountRate / 100);
  const greenModDuration = greenDuration / (1 + greenRate / 100);

  // Calculate convexity (simplified)
  const calculateConvexity = (rate) => {
    const r = rate / 100;
    const c = couponRate;
    const T = maturity;
    const F = 100;

    let convexitySum = 0;
    let price = 0;

    for (let t = 1; t <= T; t++) {
      const cf = t === T ? c + F : c;
      const pv = cf / Math.pow(1 + r, t);
      convexitySum += t * (t + 1) * pv;
      price += pv;
    }

    return convexitySum / (price * Math.pow(1 + r, 2));
  };

  const conventionalConvexity = calculateConvexity(discountRate);
  const greenConvexity = calculateConvexity(greenRate);

  // Data for comparison chart
  const chartData = [
    { name: 'Conventional', price: conventionalPrice, fill: COLORS.secondary },
    { name: 'Green', price: greenPrice, fill: COLORS.primary }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12
        }}>
          <p style={{ margin: 0, fontWeight: 600 }}>
            {payload[0].payload.name} Bond
          </p>
          <p style={{ margin: '4px 0 0 0', color: COLORS.primary }}>
            Price: ${payload[0].value.toFixed(2)}
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
        backgroundColor: '#ffffff',
        padding: '30px',
        overflowY: 'auto'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="price_sensitivity_calculator" />

      <Typography variant="h6" sx={{ color: COLORS.primary, fontWeight: 700, mb: 3, textAlign: 'center' }}>
        Green Bond Price Sensitivity Calculator
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Left side: Controls */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: COLORS.primary }}>
              Bond Parameters
            </Typography>

            <SliderControl
              label="Discount Rate"
              value={discountRate}
              onChange={setDiscountRate}
              min={0}
              max={10}
              step={0.1}
              unit="%"
              valueLabelFormat={(v) => v.toFixed(1)}
            />

            <SliderControl
              label="Greenium"
              value={greenium}
              onChange={setGreenium}
              min={0}
              max={10}
              step={0.5}
              unit=" bps"
              valueLabelFormat={(v) => v.toFixed(1)}
            />

            <SliderControl
              label="Maturity"
              value={maturity}
              onChange={setMaturity}
              min={1}
              max={30}
              step={1}
              unit=" years"
              valueLabelFormat={(v) => v}
            />

            <SliderControl
              label="Coupon Rate"
              value={couponRate}
              onChange={setCouponRate}
              min={0}
              max={8}
              step={0.25}
              unit="%"
              valueLabelFormat={(v) => v.toFixed(2)}
            />
          </Paper>

          {/* Formula Display */}
          <Paper elevation={2} sx={{ p: 3, backgroundColor: COLORS.light + '40' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: COLORS.primary }}>
              Pricing Formula:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#404040' }}>
              P = C × [1 - (1+r)^(-T)] / r + F × (1+r)^(-T)
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#666' }}>
              Where: C = {couponRate}%, r = {discountRate}% (conv) or {greenRate.toFixed(2)}% (green), T = {maturity} years, F = $100
            </Typography>
          </Paper>
        </Box>

        {/* Right side: Results */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          {/* Price Comparison Chart */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: COLORS.primary }}>
              Price Comparison
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#666" style={{ fontSize: '0.875rem' }} />
                <YAxis stroke="#666" style={{ fontSize: '0.875rem' }} domain={[95, 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <Box sx={{ mt: 2, p: 2, backgroundColor: priceDifference > 0 ? '#E8F5E9' : '#FFEBEE', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: priceDifference > 0 ? COLORS.success : '#D32F2F' }}>
                Price Difference: ${priceDifference.toFixed(2)} ({((priceDifference / conventionalPrice) * 100).toFixed(2)}%)
              </Typography>
            </Box>
          </Paper>

          {/* Metrics Table */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: COLORS.primary }}>
              Bond Metrics
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: 1, fontSize: '0.875rem' }}>
              <Box sx={{ fontWeight: 600, p: 1, borderBottom: '2px solid #E0E0E0' }}>Metric</Box>
              <Box sx={{ fontWeight: 600, p: 1, borderBottom: '2px solid #E0E0E0', textAlign: 'right' }}>Conventional</Box>
              <Box sx={{ fontWeight: 600, p: 1, borderBottom: '2px solid #E0E0E0', textAlign: 'right', color: COLORS.primary }}>Green</Box>

              <Box sx={{ p: 1, backgroundColor: '#F5F5F5' }}>Price</Box>
              <Box sx={{ p: 1, textAlign: 'right', backgroundColor: '#F5F5F5' }}>${conventionalPrice.toFixed(2)}</Box>
              <Box sx={{ p: 1, textAlign: 'right', backgroundColor: '#F5F5F5', color: COLORS.primary, fontWeight: 600 }}>${greenPrice.toFixed(2)}</Box>

              <Box sx={{ p: 1 }}>Yield</Box>
              <Box sx={{ p: 1, textAlign: 'right' }}>{discountRate.toFixed(2)}%</Box>
              <Box sx={{ p: 1, textAlign: 'right', color: COLORS.primary, fontWeight: 600 }}>{greenRate.toFixed(2)}%</Box>

              <Box sx={{ p: 1, backgroundColor: '#F5F5F5' }}>Duration</Box>
              <Box sx={{ p: 1, textAlign: 'right', backgroundColor: '#F5F5F5' }}>{conventionalDuration.toFixed(2)} years</Box>
              <Box sx={{ p: 1, textAlign: 'right', backgroundColor: '#F5F5F5', color: COLORS.primary, fontWeight: 600 }}>{greenDuration.toFixed(2)} years</Box>

              <Box sx={{ p: 1 }}>Modified Duration</Box>
              <Box sx={{ p: 1, textAlign: 'right' }}>{conventionalModDuration.toFixed(2)}</Box>
              <Box sx={{ p: 1, textAlign: 'right', color: COLORS.primary, fontWeight: 600 }}>{greenModDuration.toFixed(2)}</Box>

              <Box sx={{ p: 1, backgroundColor: '#F5F5F5' }}>Convexity</Box>
              <Box sx={{ p: 1, textAlign: 'right', backgroundColor: '#F5F5F5' }}>{conventionalConvexity.toFixed(2)}</Box>
              <Box sx={{ p: 1, textAlign: 'right', backgroundColor: '#F5F5F5', color: COLORS.primary, fontWeight: 600 }}>{greenConvexity.toFixed(2)}</Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PriceSensitivityCalculator;
