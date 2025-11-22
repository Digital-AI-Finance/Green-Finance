import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Box, Typography, Modal } from '@mui/material';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  success: '#2CA02C',
  warning: '#FF7F0E'
};

const issuers = [
  { name: 'European Investment Bank', value: 85, type: 'Supranational', bonds: 45, established: 2007 },
  { name: 'World Bank', value: 72, type: 'Supranational', bonds: 38, established: 2008 },
  { name: 'Apple Inc.', value: 48, type: 'Corporate', bonds: 8, established: 2016 },
  { name: 'France (Sovereign)', value: 45, type: 'Sovereign', bonds: 12, established: 2017 },
  { name: 'Germany (Sovereign)', value: 42, type: 'Sovereign', bonds: 15, established: 2020 },
  { name: 'Fannie Mae', value: 38, type: 'Financial', bonds: 24, established: 2012 },
  { name: 'Netherlands (Sovereign)', value: 35, type: 'Sovereign', bonds: 9, established: 2019 },
  { name: 'Bank of America', value: 32, type: 'Financial', bonds: 18, established: 2013 },
  { name: 'Toyota Motor', value: 30, type: 'Corporate', bonds: 6, established: 2014 },
  { name: 'Sweden (Sovereign)', value: 28, type: 'Sovereign', bonds: 11, established: 2020 },
  { name: 'China Development Bank', value: 26, type: 'Financial', bonds: 22, established: 2015 },
  { name: 'ICBC', value: 24, type: 'Financial', bonds: 16, established: 2016 },
  { name: 'Iberdrola', value: 22, type: 'Corporate', bonds: 14, established: 2014 },
  { name: 'UK (Sovereign)', value: 21, type: 'Sovereign', bonds: 7, established: 2021 },
  { name: 'Orsted', value: 20, type: 'Corporate', bonds: 10, established: 2015 }
];

const typeColors = {
  'Supranational': COLORS.primary,
  'Sovereign': COLORS.secondary,
  'Corporate': COLORS.success,
  'Financial': COLORS.warning
};

const TopIssuersBar = () => {
  const containerRef = useRef();
  const [selectedIssuer, setSelectedIssuer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBarClick = (data) => {
    setSelectedIssuer(data);
    setModalOpen(true);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12
        }}>
          <p style={{ margin: 0, color: COLORS.primary, fontWeight: 600 }}>
            {payload[0].payload.name}
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#404040' }}>
            ${payload[0].value}B issued
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.875rem' }}>
            Type: {payload[0].payload.type}
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
      <ChartExportButton chartRef={containerRef} filename="top_issuers_bar" />

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={issuers}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            type="number"
            stroke="#666"
            style={{ fontSize: '0.875rem' }}
            label={{ value: 'Total Issuance ($B)', position: 'insideBottom', offset: -10, style: { fill: '#666' } }}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#666"
            style={{ fontSize: '0.75rem' }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            cursor="pointer"
            onClick={handleBarClick}
          >
            {issuers.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={typeColors[entry.type]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Modal for issuer details */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="issuer-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            border: `3px solid ${COLORS.primary}`,
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          {selectedIssuer && (
            <>
              <Typography variant="h5" sx={{ color: COLORS.primary, fontWeight: 700, mb: 2 }}>
                {selectedIssuer.name}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Issuer Type:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: typeColors[selectedIssuer.type],
                        borderRadius: 1
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedIssuer.type}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Total Issuance:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary }}>
                    ${selectedIssuer.value}B
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Number of Bonds:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedIssuer.bonds}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    First Green Issuance:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedIssuer.established}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Average Bond Size:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${(selectedIssuer.value / selectedIssuer.bonds).toFixed(1)}B
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, p: 2, backgroundColor: typeColors[selectedIssuer.type] + '20', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary, mb: 0.5 }}>
                  Market Position:
                </Typography>
                <Typography variant="body2" sx={{ color: '#404040', fontSize: '0.875rem' }}>
                  {selectedIssuer.type === 'Supranational' && 'Pioneer in green bond market, setting standards for transparency and impact reporting.'}
                  {selectedIssuer.type === 'Sovereign' && 'Government-backed issuance, providing benchmark pricing for national green bonds.'}
                  {selectedIssuer.type === 'Corporate' && 'Private sector leadership in sustainable finance and environmental commitment.'}
                  {selectedIssuer.type === 'Financial' && 'Intermediating green capital flows, financing green projects globally.'}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </motion.div>
  );
};

export default TopIssuersBar;
