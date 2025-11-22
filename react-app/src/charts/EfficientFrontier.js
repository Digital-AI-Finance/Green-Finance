import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Box, Typography, Modal, Paper } from '@mui/material';
import SliderControl from '../components/SliderControl';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  success: '#2CA02C',
  warning: '#FF7F0E',
  light: '#C1C1E8'
};

// Efficient frontier portfolios
const portfolios = [
  { risk: 5.0, return: 4.5, greenAlloc: 0, sharpe: 0.90 },
  { risk: 5.5, return: 4.9, greenAlloc: 10, sharpe: 0.89 },
  { risk: 6.0, return: 5.2, greenAlloc: 20, sharpe: 0.87 },
  { risk: 6.5, return: 5.5, greenAlloc: 30, sharpe: 0.85 },
  { risk: 7.0, return: 5.8, greenAlloc: 40, sharpe: 0.83 },
  { risk: 7.5, return: 6.1, greenAlloc: 50, sharpe: 0.81 },
  { risk: 8.0, return: 6.3, greenAlloc: 60, sharpe: 0.79 },
  { risk: 8.5, return: 6.5, greenAlloc: 70, sharpe: 0.76 },
  { risk: 9.0, return: 6.7, greenAlloc: 80, sharpe: 0.74 },
  { risk: 9.5, return: 6.9, greenAlloc: 90, sharpe: 0.72 },
  { risk: 10.0, return: 7.0, greenAlloc: 100, sharpe: 0.70 }
];

const EfficientFrontier = () => {
  const containerRef = useRef();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [greenAllocation, setGreenAllocation] = useState(40);

  // Find closest portfolio to slider value
  const currentPortfolio = portfolios.reduce((prev, curr) => {
    return Math.abs(curr.greenAlloc - greenAllocation) < Math.abs(prev.greenAlloc - greenAllocation) ? curr : prev;
  });

  // Portfolio composition for pie chart
  const getPortfolioComposition = (greenAlloc) => [
    { name: 'Green Bonds', value: greenAlloc * 0.6, fill: COLORS.primary },
    { name: 'Green Equity', value: greenAlloc * 0.3, fill: COLORS.success },
    { name: 'Green Loans', value: greenAlloc * 0.1, fill: COLORS.light },
    { name: 'Conventional Bonds', value: (100 - greenAlloc) * 0.7, fill: COLORS.secondary },
    { name: 'Conventional Equity', value: (100 - greenAlloc) * 0.3, fill: COLORS.warning }
  ].filter(item => item.value > 0);

  const handlePointClick = (data) => {
    setSelectedPortfolio(data);
    setModalOpen(true);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12
        }}>
          <p style={{ margin: 0, color: COLORS.primary, fontWeight: 600, marginBottom: 8 }}>
            Portfolio: {data.greenAlloc}% Green
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600 }}>Risk:</span> {data.risk.toFixed(1)}%
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600 }}>Return:</span> {data.return.toFixed(1)}%
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600 }}>Sharpe Ratio:</span> {data.sharpe.toFixed(2)}
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
      <ChartExportButton chartRef={containerRef} filename="efficient_frontier" />

      <Typography variant="h6" sx={{ color: COLORS.primary, fontWeight: 700, mb: 1, textAlign: 'center' }}>
        Efficient Frontier with Green Allocation
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 3, textAlign: 'center' }}>
        Click points to see portfolio details
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Left side: Chart */}
        <Box sx={{ flex: 1.5, minWidth: 400 }}>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis
                type="number"
                dataKey="risk"
                name="Risk"
                unit="%"
                domain={[4, 11]}
                stroke="#666"
                style={{ fontSize: '0.875rem' }}
                label={{ value: 'Risk (Volatility %)', position: 'insideBottom', offset: -10, style: { fill: '#666' } }}
              />
              <YAxis
                type="number"
                dataKey="return"
                name="Return"
                unit="%"
                domain={[4, 8]}
                stroke="#666"
                style={{ fontSize: '0.875rem' }}
                label={{ value: 'Expected Return (%)', angle: -90, position: 'insideLeft', style: { fill: '#666' } }}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Efficient frontier line */}
              <Scatter
                data={portfolios}
                line={{ stroke: COLORS.primary, strokeWidth: 2 }}
                lineType="joint"
              >
                {portfolios.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.greenAlloc === currentPortfolio.greenAlloc ? COLORS.success : COLORS.primary}
                    r={entry.greenAlloc === currentPortfolio.greenAlloc ? 10 : 6}
                    cursor="pointer"
                    onClick={() => handlePointClick(entry)}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          {/* Annotations */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around', fontSize: '0.75rem', color: '#666' }}>
            <Box sx={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 600, color: COLORS.primary }}>0% Green</div>
              <div>Lower left</div>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 600, color: COLORS.primary }}>100% Green</div>
              <div>Upper right</div>
            </Box>
          </Box>
        </Box>

        {/* Right side: Interactive controls and current portfolio */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: COLORS.primary }}>
              Adjust Green Allocation
            </Typography>

            <SliderControl
              label="Green Allocation"
              value={greenAllocation}
              onChange={setGreenAllocation}
              min={0}
              max={100}
              step={10}
              unit="%"
              valueLabelFormat={(v) => v}
            />

            <Box sx={{ mt: 3, p: 2, backgroundColor: COLORS.light + '40', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary, mb: 1 }}>
                Portfolio Metrics:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Expected Return:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{currentPortfolio.return.toFixed(1)}%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Risk (Volatility):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{currentPortfolio.risk.toFixed(1)}%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Sharpe Ratio:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{currentPortfolio.sharpe.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Current portfolio composition */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: COLORS.primary }}>
              Portfolio Composition
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getPortfolioComposition(greenAllocation)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getPortfolioComposition(greenAllocation).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>

      {/* Modal for portfolio details */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="portfolio-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: `3px solid ${COLORS.primary}`,
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          {selectedPortfolio && (
            <>
              <Typography variant="h5" sx={{ color: COLORS.primary, fontWeight: 700, mb: 2 }}>
                Portfolio: {selectedPortfolio.greenAlloc}% Green Allocation
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Expected Return:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary }}>
                    {selectedPortfolio.return.toFixed(2)}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Risk (Volatility):</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedPortfolio.risk.toFixed(2)}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Sharpe Ratio:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedPortfolio.sharpe.toFixed(3)}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: COLORS.primary }}>
                Allocation Breakdown:
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={getPortfolioComposition(selectedPortfolio.greenAlloc)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getPortfolioComposition(selectedPortfolio.greenAlloc).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <Box sx={{ mt: 3, p: 2, backgroundColor: COLORS.light + '40', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#404040' }}>
                  This portfolio balances risk and return with {selectedPortfolio.greenAlloc}% allocated to green assets.
                  {selectedPortfolio.sharpe > 0.85 && ' High Sharpe ratio indicates strong risk-adjusted returns.'}
                  {selectedPortfolio.sharpe <= 0.85 && selectedPortfolio.sharpe > 0.75 && ' Moderate Sharpe ratio shows reasonable risk-adjusted returns.'}
                  {selectedPortfolio.sharpe <= 0.75 && ' Lower Sharpe ratio suggests higher risk relative to returns.'}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </motion.div>
  );
};

export default EfficientFrontier;
